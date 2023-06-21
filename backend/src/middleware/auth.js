const ApiError = require("../error/apiError");
const tokenService = require("../services/tokenService");
const userService = require("../services/userService");

module.exports = async function (req, res, next) {
  try {
    const accessToken = req.cookies.accessToken;

    if (!accessToken) {
      return next(ApiError.unauthorizedError());
    }

    const userData = tokenService.validateAccessToken(accessToken);
    if (!userData) {
      // Удаляем куки
      res.clearCookie("accessToken");

      // Пытаемся получить новый по refreshToken
      const { refreshToken, accessToken, user } = await userService.refresh(
        req.cookies.refreshToken
      );

      res.cookie("accessToken", accessToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      res.cookie("refreshToken", refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });

      // Записываем пользователя
      if (user) {
        req.user = user;
        return next();
      }

      return next(ApiError.unauthorizedError());
    }

    req.user = userData;
    return next();
  } catch (err) {
    return next(ApiError.unauthorizedError());
  }
};
