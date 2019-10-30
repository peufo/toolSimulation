var mongoose = require('mongoose')

var action = new mongoose.Schema({
    label: { type: String, required: true, trim: true, default: 'Mon action' },
    article: {type: mongoose.Types.ObjectId, ref: 'action'},
    position: {type: Number, required: true, default: 10},
    features: [{
        label: { type: String, trim: true },
        origine: String,
        mesure: String,
        nominal: String,
        tolerance: Number,
        representation: {type: String, enum: ['SPC', 'without'], default: 'SPC'},
        params: [{type: mongoose.Schema.Types.ObjectId, ref: 'tool.params'}],
        measures: [{type: mongoose.Schema.Types.ObjectId, ref: 'tool.measures'}],
    }]
})

action.set('timestamp', true)

module.exports = mongoose.model('action', action)