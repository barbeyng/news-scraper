// DEPENDENCIES

var express = require('express');
router = express.Router();
db = require('../models');
axios = require('axios');
cheerio = require('cheerio');

// Home index route
router.get('/', function (req, res) {
    res.render('index')
});

// Scrape headlines and links from news source using cheerio
router.get('/scrape', function (req, res) {
    axios.get('https://www.youredm.com/').then(function (response) {
        // $ shorthand selector    
        var $ = cheerio.load(response.data);
        // Locate the articles and loop through each
        $("div h2").each(function (i, element) {
            // Declare empty object variable to store data later
            var result = [];
            // Target headlines links and summaries to store into empty object as properties
            var title = $(this)
                .children('a')
                .text()
            var link = $(this)
                .children('a')
                .attr("href");
            result.push({
                title: title,
                link: link
            });

            // Store the scraped data into Article db
            db.Article.create(result).then(function (dbArticle) {
                console.log(dbArticle);
            })
                .catch(function (err) {
                    console.log(err);
                });
        });
        // After scrape, redirect to articles page
        res.redirect('/articles');
    });
});

router.get('/articles', function (req, res) {
    db.Article.find().sort({ _id: 1 })
        .then(function (dbArticle) {
            res.render('articles', { articles: dbArticle });
        })
        .catch(function (err) {
            res.json(err);
        });
});

// Route that grabs article by id and note
router.get('articles/:id', function (req, res) {
    db.Article.findOne({ _id: req.params.id })
        .populate('comment')
        .then(function (dbArticle) {
            res.json(dbArticle)
            // res.render('comments', dbArticle)
        })
        .catch(function (err) {
            res.json(err);
        });
});

// Route that saves and updates article's note
router.post('/articles/:id', function (req, res) {
    db.Comment.create(req.body)
        .then(function (dbComment) {
            return db.Article.findOneAndUpdate({ _id: req.params.id }, { comment: dbComment._id }, { new: true });
        })
        .then(function (dbArticle) {
            res.json(dbArticle);
        })
        .catch(function (err) {
            res.json(err);
        });
});

module.exports = router;