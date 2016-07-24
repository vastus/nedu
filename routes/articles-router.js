const express = require('express');
const pg = require('pg').native;

const { allArticles } = require('../models/article');


function articlesRouter(pool) {
  const router = express.Router();

  router.get('/', function (req, res, next) {
    allArticles(pool)
      .then(result => {
        res.json(result.rows).end();
      })
      .catch(next);
  });

  return router;
}

module.exports = articlesRouter;
