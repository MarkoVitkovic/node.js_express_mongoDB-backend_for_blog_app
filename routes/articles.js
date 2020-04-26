const express = require('express');
const router = express.Router();
const Articles = require('../models/articles');
//request get all article
router.get('/', (req, res) => {
    Articles.find()
        .then(article => res.json(article))
        .catch(err => res.status(400).json(`Error: ${err}`))
});

//request add new article
router.post('/add', (req, res) => {
    const newArticle = new Articles({
        title: req.body.title,
        article: req.body.article,
        authorname: req.body.authorname
    });

    newArticle.save()
        .then(() => res.json("The new article posted successfuly!"))
        .catch(err => res.status(400).json(`Error: ${err}`));
});

//request find article by id
router.get('/:id', (req, res) => {
    Articles.findById(req.params.id)
        .then(article => res.json(article))
        .catch(err => res.status(400).json(`Error: ${err}`));
});

//request find article by id and update
router.put('/update/:id', (req, res) => {
    Articles.findById(req.params.id)
        .then(article => {
            article.title = req.body.title,
            article.article = req.body.article,
            article.authorname = req.body.authorname

            article.save()
                .then(() => res.json("The article is UPDATED successfuly!"))
                .catch(err => res.status(400).json(`Error: ${err}`))
        })
        .catch(err => res.status(400).json(`Error: ${err}`));
});

//find article by id and delete
router.delete('/:id', (req, res) => {
    Articles.findByIdAndDelete(req.params.id)
        .then(() => res.json("The article is DELETED successfuly!"))
        .catch(err => res.status(400).json(`Error: ${err}`));
});

module.exports = router;


