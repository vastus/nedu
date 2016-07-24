function allArticles(pool) {
  const sql = `
    SELECT
      *
    FROM
      shard_1.articles
    WHERE
      published_at <= NOW()
  `;

  return pool.query(sql);
}

module.exports = {
  allArticles,
};
