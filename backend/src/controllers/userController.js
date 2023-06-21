const userService = require("../services/userService");
const { validationResult } = require("express-validator");
const ApiError = require("../error/apiError");

class UserController {
  async registration(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(ApiError.badRequest("Ошибка валидации", errors.array()));
    }
    const { email, password } = req.body;
    const userData = await userService.registration(email, password);
    res.cookie("refreshToken", userData.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    return res.json(userData);
  }

  async login(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(ApiError.badRequest("Ошибка валидации", errors.array()));
    }
    const { email, password } = req.body;
    const userData = await userService.login(email, password);

    res.cookie("accessToken", userData.accessToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    res.cookie("refreshToken", userData.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    return res.json(userData);
  }

  async logout(req, res, next) {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      return next(ApiError.badRequest("Refresh token не найден"));
    }
    await userService.logout(refreshToken);

    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");

    return res.json({ type: "success" });
  }

  async activate(req, res, next) {
    const { link: activationLink } = req.params;
    await userService.activate(activationLink);
    return res.redirect(process.env.CLIENT_URL);
  }

  async loginWithGoogle(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(
        ApiError.badRequest("Указаны не все параметры", errors.array())
      );
    }
    const { credential } = req.body;
    const { refreshToken, ...otherInfo } = await userService.loginWithGoogle(
      credential
    );
    res.cookie("refreshToken", refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    return res.json(otherInfo);
  }

  async refresh(req, res, next) {
    const { refreshToken, ...otherInfo } = await userService.refresh(
      req.cookies.refreshToken
    );
    res.cookie("refreshToken", refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    return res.json(otherInfo);
  }

  async getUsers(req, res, next) {
    const users = await userService.getUsers();
    return res.json(users);
  }
}

module.exports = new UserController();
