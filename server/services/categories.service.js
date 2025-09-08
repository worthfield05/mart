const categoryModel = require("../models/category.models");
const categoriesService = {
  newCategories: async (obj) => {
    const newCategory = new categoryModel(obj);
    await newCategory.save();
    return newCategory;
  },
  getSingleCategories: async (categoryId) => {
    const category = await categoryModel.findById(categoryId);
    return category;
  },
  getAllCategory: async () => {
    const categories = await categoryModel.find({});
    return categories;
  },
  removeCategory: async (categoryId) => {
    const category = await categoryModel.findOneAndDelete({ _id: categoryId });
    return category;
  },
};
module.exports = categoriesService;
