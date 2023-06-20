const ApiError = require('../error/apiError');

module.exports = function (err, req, res, next) {
  if (err instanceof ApiError) {
    console.error('ApiError:', err.message);
    return res
      .status(err.status)
      .json({ type: 'error', message: err.message, errors: err.errors });
  }
  console.error('Error:', err.message);
  return res.status(500).json({ type: 'error', message: err.message });
};
