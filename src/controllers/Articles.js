var Article = require('../models/Articles');

//Get all articles
exports.article_list = function(req, res) {
  Article.find({}, function(err, articles) {
    res.json(articles);
  });
};

//Add article
exports.add_article = function(req, res) {
  const article = new Article({
    title: req.body.title,
    date: req.body.date,
    url: req.body.url,
  });
  article.save(function(err, newArticle) {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      res.json(newArticle);
    }
  });
};

//Remove article
exports.remove_article = function(req, res) {
  console.log(req.query);
  Article.deleteOne({ _id: req.query.id }, function(err) {
    if (err) return res.sendStatus(500);
    res.sendStatus(200);
  });
};

//Post new comment
exports.add_comment = function(req, res) {
  const newComment = {
    name: req.body.name,
    email: req.body.email,
    body: req.body.body,
  };
  Article.findById(req.params.id).exec(function(err, article) {
    article.comments.push(newComment);
    article.save(function(err) {
      if (err) {
        console.log(err);
        return res.sendStatus(500);
      }
      res.json(newComment);
    });
  });
};
