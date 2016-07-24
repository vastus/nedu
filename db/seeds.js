const moment = require('moment');
const pg = require('pg').native;

const config = require('../config');


const handleError = err => { throw err };

const articlesAttributes = [
  [
    "My first post",
    "Lorem ipsum dolor sit amet...",
    moment.utc().subtract(1, 'days'),
    moment.utc().subtract(2, 'days'),
    moment.utc().subtract(2, 'days'),
  ],
  [
    "My second post",
    "What's innit for me, I really gotta know...",
    moment.utc().add(1, 'days'),
    moment.utc(),
    moment.utc(),
  ],
];

const client = new pg.Client(config.db);

client.connect();
client.on('error', handleError);

{
  /*
   * Delete data.
   */
  const sql = `
    DELETE FROM shard_1.articles
  `;

  client.query(sql)
    .on('error', handleError);
}

{
  /*
   * Insert seed data.
   */
  const sql = `
    INSERT INTO shard_1.articles 
    (title, content, published_at, created_at, updated_at)
    VALUES
    ($1, $2, $3, $4, $5)
  `;

  const xs = articlesAttributes.map(articleAttributes => {
    return client.query(sql, articleAttributes);
  });

  Promise.all(xs)
    .then(() => client.end())
    .catch(handleError);
}
