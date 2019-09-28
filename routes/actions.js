var express = require('express')
var router = express.Router()
var Action = require('../models/action')

router
	.get('/', (req, res, next) => {
        Action.find(req.query, (err, actions) => {
            if (err) return next(err)
            res.json(actions)
        })
    })
    .post('/', (req, res, next) => {
        let action = new Action(req.body)
        action.save(err => {
            if (err) return next(err)
            res.json(action)
        })
    })
    .patch('/', (req, res, next) => {
        Action.findOne({_id: req.body._id}, (err, action) => {
            if (req.body.__v) delete req.body.__v
            for(p in req.body) action[p] = req.body[p]
            action.save(err => {
                if (err) return next(err)
                res.json(action)
            })
        })
    })
    .post('/remove', (req, res, next) => {
        Action.findOne({_id: req.body._id}, (err, action) => {
            if (err) return next(err)
            action.remove(err => {
                if (err) return next(err)
                res.json({error: false})
            })
        })
    })

module.exports = router