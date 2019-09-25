var mongoose = require('mongoose')

var article = new mongoose.Schema({
    label: { type: String, trim: true, default: 'Nouvel article' }
})

article.set('timestamp', true)

module.exports = mongoose.model('article', article)