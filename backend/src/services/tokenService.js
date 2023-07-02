const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
const { Token } = require("../db/models");

class TokenService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
      expiresIn: process.env.JWT_ACCESS_EXPIRES,
    });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
      expiresIn: process.env.JWT_REFRESH_EXPIRES,
    });
    return { accessToken, refreshToken };
  }

  async saveToken(userId, refreshToken) {
    const token = await Token.create({ userId, refreshToken });
    return token;
  }

  async updateToken(userId, refreshToken, oldRefreshToken) {
    const tokenData = await Token.findOne({
      where: { userId, refreshToken: oldRefreshToken },
    });
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }
    return this.saveToken(userId, refreshToken);
  }

  async removeToken(refreshToken) {
    return await Token.destroy({ where: { refreshToken } });
  }

  validateAccessToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
      return userData;
    } catch (err) {
      return null;
    }
  }

  validateRefreshToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
      return userData;
    } catch (err) {
      return null;
    }
  }

  async findToken(refreshToken) {
    const tokenData = await Token.findOne({ where: { refreshToken } });
    return tokenData;
  }

  async validateGoogleToken(token) {
    try {
      const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      const payload = ticket.getPayload();
      return payload;
    } catch (err) {
      return null;
    }
  }
}

module.exports = new TokenService();
