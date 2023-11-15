const Ads = require('../models/Ads.model')
const getImageFileType = require('../utils/getImageFileType')
const validateAds = require('../utils/validateAds')
const escape = require('../utils/escapeFunc')
const fs = require('fs')

// load all ads
exports.getAll = async (req, res) => {
	try {
		const ads = await Ads.find().populate('user')
		res.json(ads)
	} catch (err) {
		res.status(500).json({ message: err.message })
	}
}

// find ad by id
exports.getById = async (req, res) => {
	try {
		const ad = await Ads.findById(req.params.id).populate('user')
		if (!ad) {
			res.status(404).json({ message: 'Not found..' })
		} else res.json(ad)
	} catch (err) {
		res.status(500).json(err + '')
	}
}

// find ad by search phrase
exports.getBySearchPhrase = async (req, res) => {
	try {
		const searchParams = req.params.searchPhrase
		const ads = await Ads.find({
			$or: [
				{ title: { $regex: searchParams, $options: 'i' } },
				{ content: { $regex: searchParams, $options: 'i' } },
				{ location: { $regex: searchParams, $options: 'i' } },
			],
		}).populate('user')

		res.send(ads)
	} catch (err) {
		res.status(500).json(err + '')
	}
}

// add new ad
exports.add = async (req, res) => {
	try {
		let { title, text, date, location, user, price } = req.body
		title = escape(title)
		text = escape(text)
		location = escape(location)
		const src = req.file.filename
		const fileType = req.file ? await getImageFileType(req.file) : 'unknokwn'
		price = Number(price)

		if (validateAds(title, text, date, location, user, price, fileType)) {
			{
				const newAd = new Ads({ title, text, date, src, location, user, price })
				await newAd.save()
				res.json(newAd)
			}
		}
	} catch (err) {
		res.status(500).json(err + '')
	}
}

// delete one ad by its id
exports.delete = async (req, res) => {
	try {
		const id = req.params.id
		const ad = await Ads.findById(id)
		if (ad) {
			await Ads.deleteOne({ _id: id })
			res.json({ message: 'OK' })
		}
	} catch (err) {
		res.status(500).json(err + '')
	}
}

// edit one ad by its id
exports.edit = async (req, res) => {
	try {
		let { title, text, date, location, user, price } = req.body
		title = escape(title)
		text = escape(text)
		location = escape(location)
		const src = req.file.filename
		const fileType = req.file ? await getImageFileType(req.file) : 'unknokwn'
		const id = req.params.id

		const ad = await Ads.findById(id).populate('user')

		// Delete the old image
		if (req.file) {
			const path = `public/uploads/${ad.src}`
			fs.unlinkSync(path)
		}
		// change ad if data validated
		if (ad && validateAds(title, text, date, location, user, price, fileType)) {
			await ad.updateOne({ $set: { title, text, date, src, location, user, price } })
			res.send({ message: 'Ad changed' })
		}
	} catch (err) {
		res.status(500).json(err + '')
	}
}
