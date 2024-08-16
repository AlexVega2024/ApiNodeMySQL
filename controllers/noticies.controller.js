import { noticiesModel } from "../models/noticies.model.js";

const GetListCategoriesController = async (req, res) => {
  try {
    const response = await noticiesModel.ListCategories();
    res.json(response);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

const GetNoticiesByCategoryController = async (req, res) => {
  try {
    const { id_category } = req.body;
    const response = await noticiesModel.ListNoticiesByCategory(id_category);
    res.json(response);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

const ActiveInactiveCategoryStateController = async (req, res) => {
  try {
    const { new_state, id_category } = req.body;
    const response = await noticiesModel.ActiveInactiveStateCategory(new_state, id_category);
    res.json(response);
  } catch (error) {
    console.log(error);
  }
};

const ActiveInactiveNoticeStateController = async (req, res) => {
  try {
    const { id_notice, id_category, new_state } = req.body;
    const response = await noticiesModel.ActiveInactiveStateNoticie(id_notice, id_category, new_state);
    res.json(response);
  } catch (error) {
    console.log(error);
  }
};
export const noticiesController = {
  GetListCategoriesController,
  GetNoticiesByCategoryController,
  ActiveInactiveCategoryStateController,
  ActiveInactiveNoticeStateController
};
