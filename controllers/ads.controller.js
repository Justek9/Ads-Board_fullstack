const Ads = require('../models/Ads.model')

// load all ads
exports.getAll = async (req, res) => {
	try {
		const ad = await Ads.find().populate('user')
		res.json(ad)
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
		// console.log(searchParams)
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
		const { title, text, date, src, location, author } = req.body
		const newAd = new Ads({ title, text, date, src, location, author })
		await newAd.save()
		res.json(newAd)
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
		const { title, text, date, src, location, author } = req.body
		const id = req.params.id
		const ad = await Ads.findById(id).populate('user')
	
		if (ad) {
			await Ads.updateOne({ _id: id }, { $set: { title, text, date, src, location, author } })
		}
		res.send({ message: 'ok' })
	} catch (err) {
		res.status(500).json(err + '')
	}
}
