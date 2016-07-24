function errorLogger(err, req, res, next) {
  console.error(Object.keys(err));
  next(err);
}

function errorHandler(err, req, res, next) {
  res.status(500).end('500 internal server error');
}

module.exports = {
  errorLogger,
  errorHandler,
};
