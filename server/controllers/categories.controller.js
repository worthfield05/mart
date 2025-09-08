const categoriesService = require("../services/categories.service");

const addCategories = async (req, res, next) => {
  try {
    const result = await categoriesService.newCategories(req.body);
    return res.status(201).json({
      success: true,
      message: "New category added",
      data: result,
    });
  } catch (error) {
    return next(error);
  }
};
const getCategories = async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    const result = await categoriesService.getSingleCategories(categoryId);
    return res.status(200).json(result);
  } catch (error) {
    return next(error);
  }
};
const getAllCategories = async (req, res, next) => {
  try {
    const result = await categoriesService.getAllCategory();
    return res.status(200).json(result);
  } catch (error) {
    return next(error);
  }
};
const removeCategories = async (req, res, next) => {
  try {
    await categoriesService.removeCategory(req.params.categoryId);
    return res.status(200).json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    return next(error);
  }
};
module.exports = {
  getAllCategories,
  getCategories,
  removeCategories,
  addCategories,
};
