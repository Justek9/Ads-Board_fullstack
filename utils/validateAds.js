const validateAds = (title, text, date, location, author, fileType, src) => {
	if (
		title &&
		text &&
		date &&
		location &&
		author &&
		src &&
		['image/png', 'image/jpeg', 'image/gif'].includes(fileType) &&
		typeof title === 'string' &&
		typeof text === 'string' &&
		typeof date === 'date' &&
		typeof location === 'string' &&
		typeof author === 'string' &&
		typeof src === 'string' &&
		title.length < 50 &&
		title.length > 10 &&
		text.length > 20 &&
		text.length < 1000
	) {
		return true
	}
}

module.exports = validateAds
