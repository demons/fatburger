const { Group } = require("../db/models");
const ApiError = require("../error/apiError");

class GroupService {
  async create(userId, title) {
    return await Group.create({ userId, title });
  }

  async getAll(userId) {
    return await Group.getGroups(userId);
  }

  async getOne(userId, groupId) {
    const group = await Group.getGroup(userId, groupId);
    if (!group) {
      throw new ApiError(404, "Группа с указанным id не найденаы");
    }
    return group;
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
