const asyncWrapper = (cb) => {
  return async (req, res, next) => {
    try {
      return await cb(req, res, next);
    } catch (err) {
      next(err);
    }
  };
};

const toBoolean = (value, defaultValue = false) => {
  if (!value) {
    return defaultValue;
  }

  switch (value.toLowerCase()) {
    case "0":
      return false;
    case "false":
      return false;
    case "true":
      return true;
    case "1":
      return true;
    default:
      return defaultValue;
  }
};

module.exports = {
  asyncWrapper,
  toBoolean,
};
