const { Story } = require("../db/models");
const ApiError = require("../error/apiError");

class StoryService {
  async getAll(userId) {
    return await Story.findAll({
      where: { userId },
      order: [["date", "DESC"]],
    });
  }

  async getOne(userId, storyId) {
    const story = await Story.findOne({ where: { id: storyId, userId } });
    if (!story) {
      throw new ApiError(404, "История с указанным id не найденаы");
    }
    return story;
  }

  async create(
    userId,
    date,
    energy,
    protein,
    fat,
    carb,
    fib,
    type,
    comment,
    weight
  ) {
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
      weight,
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
    comment,
    weight
  ) {
    return await Story.update(
      { date, energy, protein, fat, carb, fib, type, comment, weight },
      { where: { userId, id: storyId } }
    );
  }

  async delete(userId, storyId) {
    return await Story.destroy({ where: { userId, id: storyId } });
  }
}

module.exports = new StoryService();
