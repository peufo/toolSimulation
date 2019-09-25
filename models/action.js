var mongoose = require('mongoose')

var action = new mongoose.Schema({
    label: { type: String, required: true, trim: true },
    article: {type: mongoose.Types.ObjectId, ref: 'action'},
    position: {type: Number, required: true},
    features: [{
        label: { type: String, required: true, trim: true },
        origine: String,
        mesure: String,
        nominal: String,
        tolerance: Number,
        representation: {type: String, enum: ['SPC'], default: 'SPC'},
        param: {type: mongoose.Types.ObjectId, ref: 'tool.params'},
        measure: {type: mongoose.Types.ObjectId, ref: 'tool.measures'},
    }]
})

action.set('timestamp', true)

module.exports = mongoose.model('action', action)