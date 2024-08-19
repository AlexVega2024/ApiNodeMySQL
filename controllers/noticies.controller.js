import { noticiesModel } from "../models/noticies.model.js";
import fs from "fs";

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
    const response = await noticiesModel.ListFirstThreeNoticies(
      id_category,
      id_noticie
    );
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
    const { name } = req.body;
    const response = await noticiesModel.RegisterCategory(name);
    res.json(response);
  } catch (error) {}
};

const RegisterNoticeByCategoryController = async (req, res) => {
  try {
    const {
        id_category,
        title,
        state_notice,
        date_time,
        description,
      } = req.body;
      
    // Obtener las rutas de los archivos subidos
    const img_card_path = req.files["img_card"]
      ? req.files["img_card"][0].originalname
      : "";
    const img_banner_path = req.files["img_banner"]
      ? req.files["img_banner"][0].originalname
      : "";
    await noticiesModel.RegisterNoticeByCategory(
      id_category,
      img_card_path,
      img_banner_path,
      title,
      state_notice,
      date_time,
      description
    );
    res.json({ status: "success" });
  } catch (error) {
    console.log("Error en el controlador: ", error);
  }
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

const UpdateCategoryController = async (req, res) => {
  try {
    const { name, id_category } = req.body;
    const response = await noticiesModel.UpdateCategory(
      name, id_category
    );
    if (id_category) {
      res.json(response);
    }
  } catch (error) {
    console.log(error);
  }
};


const DeleteCategoryController = async (req, res) => {
  try {
    const { id_category } = req.body;
    const response = await noticiesModel.DeleteCategory(
      id_category
    );
    if (id_category) {
      res.json(response);
    }
  } catch (error) {
    console.log(error);
  }
};

const DeleteNoticeController = async (req, res) => {
  try {
    const { id_notice } = req.body;
    const response = await noticiesModel.DeleteNotice(
      id_notice
    );
    if (id_notice) {
      res.json(response);
    }
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
  UpdateCategoryController,
  DeleteCategoryController,
  DeleteNoticeController
};
