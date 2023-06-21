const ApiError = require("../error/apiError");
const tokenService = require("../services/tokenService");

module.exports = function (req, res, next) {
  try {
    const accessToken = req.cookies.accessToken;

    if (!accessToken) {
      return next(ApiError.unauthorizedError());
    }

    const userData = tokenService.validateAccessToken(accessToken);
    if (!userData) {
      return next(ApiError.unauthorizedError());
    }

    req.user = userData;
    next();
  } catch (err) {
    return next(ApiError.unauthorizedError());
  }
};
