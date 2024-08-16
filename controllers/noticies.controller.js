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

const GetListNoticiesController = async (req, res) => {
  try {
    const response = await noticiesModel.ListNoticies();
    res.json(response);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

const GetListNoticiesByCategoryController = async (req, res) => {
  try {
    const { id_category } = req.body;
    const response = await noticiesModel.ListNoticiesByCategory(id_category);
    res.json(response);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

const GetListFirstThreeNoticiesController = async (req, res) => {
  try {
    const { id_category, id_noticie } = req.body;
    const response = await noticiesModel.ListFirstThreeNoticies(id_category, id_noticie);
    res.json(response);
  } catch (error) {
    console.log("Error en la consulta a la BD: " + error);
  }
};

const GetNoticieByCategoryController = async (req, res) => {
  try {
    const { id_category, id_noticie } = req.body;
    const response = await noticiesModel.GetNoticieByCategory(
      id_category,
      id_noticie
    );
    res.json(response[0]);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

const GetGalleryByNoticieAndCategoryController = async (req, res) => {
  try {
    const { id_noticie, id_category } = req.body;
    const response = await noticiesModel.GetGalleryByNoticeAndCategory(
      id_noticie,
      id_category
    );
    res.json(response);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

const RegisterCategoryController = async (req, res) => {
  try {
    const { name, state_categ } = req.body;
    const response = await noticiesModel.RegisterCategory(name, state_categ);
    res.json(response);
  } catch (error) {}
};

const RegisterNoticeByCategoryController = async (req, res) => {
  try {
    const {
      id_category,
      img_banner,
      img_card,
      title,
      state_notice,
      date_time,
      description,
    } = req.body;
    const response = await noticiesModel.RegisterNoticeByCategory(
      id_category,
      img_banner,
      img_card,
      title,
      state_notice,
      date_time,
      description
    );
    res.json(response);
  } catch (error) {}
};

const ActiveInactiveCategoryStateController = async (req, res) => {
  try {
    const { state_categ, id_category } = req.body;
    const response = await noticiesModel.ActiveInactiveStateCategory(
      state_categ,
      id_category
    );
    res.json(response);
  } catch (error) {
    console.log(error);
  }
};

const ActiveInactiveNoticeStateController = async (req, res) => {
  try {
    const { state_notice, id_category, id_notice } = req.body;
    const response = await noticiesModel.ActiveInactiveStateNoticie(
      state_notice,
      id_category,
      id_notice
    );
    res.json(response);
  } catch (error) {
    console.log(error);
  }
};
export const noticiesController = {
  GetListCategoriesController,
  GetListNoticiesController,
  GetListNoticiesByCategoryController,
  GetListFirstThreeNoticiesController,
  GetNoticieByCategoryController,
  GetGalleryByNoticieAndCategoryController,
  RegisterCategoryController,
  RegisterNoticeByCategoryController,
  ActiveInactiveCategoryStateController,
  ActiveInactiveNoticeStateController,
};
