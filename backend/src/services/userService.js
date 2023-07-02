const bcrypt = require("bcrypt");
const uuid = require("uuid");
const { User } = require("../db/models");
// const mailService = require("./mailService");
const tokenService = require("./tokenService");
const UserDto = require("../dtos/userDto");
const ApiError = require("../error/apiError");

class UserService {
  async registration(email, password) {
    const candidate = await User.findOne({ where: { email } });
    if (candidate) {
      throw ApiError.badRequest("Пользователь с таким адресом уже существует");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const activationLink = uuid.v4();

    const user = await User.create({
      email,
      password: hashedPassword,
      activationLink,
    });

    // Отправка ключа для активации на почту
    // await mailService.sendActivationMail(
    //   email,
    //   `${process.env.API_URL}/api/activate/${activationLink}`
    // );

    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user: userDto };
  }

  async activate(activationLink) {
    const user = await User.findOne({ where: { activationLink } });
    if (!user) {
      throw ApiError.badRequest("Некорректная ссылка активации");
    }
    user.isActivated = true;
    await user.save();
  }

  async login(email, password) {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw ApiError.badRequest("Пользователь с таким email не найден");
    }
    const isPassEquals = await bcrypt.compare(password, user.password);
    if (!isPassEquals) {
      throw ApiError.badRequest("Неверный email или пароль");
    }
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user: userDto };
  }

  async loginWithGoogle(token) {
    // Проверяем токен
    const userInfo = await tokenService.validateGoogleToken(token);
    if (!userInfo) {
      throw ApiError.badRequest("Неверный google token");
    }

    // Ищем пользователя с googleId
    let user = await User.findOne({ where: { googleId: userInfo.sub } });

    // Регистрируем пользователя, если его еще нет
    if (!user) {
      user = await User.create({
        googleId: userInfo.sub,
        email: userInfo.email || "",
        isActivated: userInfo.email_verified || false,
        picture: userInfo.picture,
        name: userInfo.name,
      });
    }

    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user: userDto };
  }

  async logout(refreshToken) {
    return await tokenService.removeToken(refreshToken);
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.unauthorizedError();
    }
    const userData = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await tokenService.findToken(refreshToken);
    if (!userData || !tokenFromDb) {
      throw ApiError.unauthorizedError();
    }

    const user = await User.findByPk(userData.id);
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });

    await tokenService.updateToken(
      userDto.id,
      tokens.refreshToken,
      refreshToken
    );
    return { ...tokens, user: userDto };
  }

  async getUsers() {
    const users = await User.findAll();
    return users;
  }
}

module.exports = new UserService();
