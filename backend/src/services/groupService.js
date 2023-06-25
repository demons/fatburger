const { Group } = require("../db/models");
const ApiError = require("../error/apiError");

class GroupService {
  async create(userId, title) {
    return await Group.create({ userId, title });
  }

  async update(userId, groupId, title) {
    return await Group.update({ title }, { where: { id: groupId, userId } });
  }

  async delete(userId, groupId) {
    const result = await Group.destroy({ where: { id: groupId, userId } });
    return result;
  }
}

module.exports = new GroupService();
