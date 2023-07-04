const { Story } = require("../db/models");
const ApiError = require("../error/apiError");

class StoryService {
  async getAll(userId) {
    return await Story.findAll({
      where: { userId },
      order: [["date", "DESC"]],
    });
  }

  async create(userId, date, energy, protein, fat, carb, fib, type, comment) {
    return await Story.create({
      userId,
      date,
      energy,
      protein,
      fat,
      carb,
      fib,
      type,
      comment,
    });
  }

  async update(
    userId,
    storyId,
    date,
    energy,
    protein,
    fat,
    carb,
    fib,
    type,
    comment
  ) {
    return await Story.update(
      { date, energy, protein, fat, carb, fib, type, comment },
      { where: { userId, id: storyId } }
    );
  }

  async delete(userId, storyId) {
    return await Story.destroy({ where: { userId, id: storyId } });
  }
}

module.exports = new StoryService();
