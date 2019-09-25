var express = require('express')
var router = express.Router()
var Article = require('../models/article')

router
	.get('/', (req, res, next) => {
        Article.find(req.query, (err, articles) => {
            if (err) return next(err)
            res.json(articles)
        })
    })
    .post('/', (req, res, next) => {
        let article = new Article(req.body)
        article.save(err => {
            if (err) return next(err)
            res.json(article)
        })
    })
    .patch('/', (req, res, next) => {
        Article.findOne({_id: req.body._id}, (err, article) => {
            if (req.body.__v) delete req.body.__v
            for(p in req.body) article[p] = req.body[p]
            article.save(err => {
                if (err) return next(err)
                res.json(article)
            })
        })
    })
    .post('/remove', (req, res, next) => {
        Article.findOne({_id: req.body._id}, (err, article) => {
            if (err) return next(err)
            article.remove(err => {
                if (err) return next(err)
                res.json({error: false})
            })
        })
    })

module.exports = router