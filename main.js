const express = require('express');
const pg = require('pg').native;

const config = require('./config');
const articlesRouter = require('./routes/articles-router');
const { errorLogger, errorHandler } = require('./middleware/errors');


function main() {
  const app = express();
  const pool = new pg.Pool(config.db);

  /**
   * Routes
   */
  app.use('/articles', articlesRouter(pool));

  /**
   * Error handling
   */
  app.use(errorLogger);
  app.use(errorHandler);

  /**
   * Listen and serve
   */
  app.listen(8080, () => {
    console.info('Listening on http://localhost:8080');
  });
}

main();
