var express = require('express')
var router = express.Router()
var Tool = require('../models/tool')

router
	.get('/', (req, res, next) => {
        Tool.find(req.query).lean().exec((err, tools) => {
            if (err) return next(err)
            tools.forEach(tool => {
                tool.params.forEach(param => {
                    param.tool = tool.label
                })
                tool.measures.forEach(measure => {
                    measure.tool = tool.label
                })
            })
            res.json(tools)
        })
    })
    .post('/', (req, res, next) => {
        let tool = new Tool(req.body)
        tool.save(err => {
            if (err) return next(err)
            res.json(tool)
        })
    })
    .patch('/', (req, res, next) => {
        Tool.findOne({_id: req.body._id}, (err, tool) => {
            if (req.body.__v) delete req.body.__v
            for(p in req.body) tool[p] = req.body[p]
            tool.save(err => {
                if (err) return next(err)
                res.json(tool)
            })
        })
    })
    .post('/remove', (req, res, next) => {
        Tool.findOne({_id: req.body._id}, (err, tool) => {
            if (err) return next(err)
            tool.remove(err => {
                if (err) return next(err)
                res.json({error: false})
            })
        })
    })

module.exports = router