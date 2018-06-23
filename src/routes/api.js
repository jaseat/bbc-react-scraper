const express = require('express');
const router = express.Router();

const articleController = require('../controllers/Articles');

//article_list
router.get('/articles', articleController.article_list);

//refresh_articles
router.post('/articles', articleController.add_article);

//delete_article
router.delete('/articles', articleController.remove_article);

//add_comment
router.post('/:id/comment', articleController.add_comment);

module.exports = router;
