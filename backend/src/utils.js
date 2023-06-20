const asyncWrapper = (cb) => {
  return async (req, res, next) => {
    try {
      return await cb(req, res, next);
    } catch (err) {
      next(err);
    }
  };
};

module.exports = {
  asyncWrapper,
};
