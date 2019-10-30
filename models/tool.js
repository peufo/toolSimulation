var mongoose = require('mongoose')

unites = ['mm', 'bool', 'eval', 'N', 'un', 'sec'] //evaluation jugement de 1 à 10

var tool = new mongoose.Schema({
    label: { type: String, required: true, trim: true },
    root: { type: mongoose.Types.ObjectId, ref: 'tool' },
    params: [{
        label: String,
        value: Number,
        unite: { type: String, enum: unites, default: 'mm' }
    }],
    measures: [{
        label: String,
        unite: { type: String, enum: unites, default: 'mm' }
    }]
})

tool.set('timestamps', true)

module.exports = mongoose.model('tool', tool)