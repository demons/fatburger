const ApiError = require("../error/apiError");
const storyService = require("../services/storyService");

class StoryController {
  async getAll(req, res, next) {
    const stories = await storyService.getAll(req.user.id);
    return res.json(stories);
  }

  async create(req, res, next) {
    const { date, energy, protein, fat, carb, fib, type, comment, weight } =
      req.body;
    const story = await storyService.create(
      req.user.id,
      date,
      energy,
      protein,
      fat,
      carb,
      fib,
      type,
      comment,
      weight
    );
    return res.json(story);
  }

  async update(req, res, next) {
    const { storyId } = req.params;
    const { date, energy, protein, fat, carb, fib, type, comment, weight } =
      req.body;
    const result = await storyService.update(
      req.user.id,
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
    );
    return res.json(result);
  }

  async delete(req, res, next) {
    const { storyId } = req.params;
    const result = await storyService.delete(req.user.id, storyId);
    return res.json(result);
  }
}

module.exports = new StoryController();
