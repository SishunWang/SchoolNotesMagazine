'use strict';

/**
 * Module dependencies
 */
var articlesPolicy = require('../policies/articles.server.policy'),
  articles = require('../controllers/articles.server.controller');

module.exports = function(app) {
  // Articles Routes
  app.route('/api/articles').all(articlesPolicy.isAllowed)
    .get(articles.list)
    //.post(articles.create)
    .post(articles.uploads);

  app.route('/api/articles/:articleId').all(articlesPolicy.isAllowed)
    .get(articles.read)
    .put(articles.update)
    .delete(articles.delete);

  // Finish by binding the Article middleware
  app.param('articleId', articles.articleByID);
};
