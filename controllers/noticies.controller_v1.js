import { noticiesModel } from "../models/noticies.model.js";

const GetListCategoriesController = async (req, res) => {
  try {
    const response = await noticiesModel.ListCategories();
    res.json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error en la base de datos",
      error: error.message,
    });
  }
};

const GetListCategoriesActiveController = async (req, res) => {
  try {
    const response = await noticiesModel.ListCategoriesActive();
    res.json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error en la base de datos",
      error: error.message,
    });
  }
};

const GetListNoticiesController = async (req, res) => {
  try {
    const response = await noticiesModel.ListNoticies();
    res.json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error en la base de datos",
      error: error.message,
    });
  }
};

const GetListNoticiesByCategoryActiveController = async (req, res) => {
  try {
    const { id_category } = req.body;
    const response = await noticiesModel.ListNoticiesByCategoryActive(id_category);
    res.json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error en la base de datos",
      error: error.message,
    });
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
    res.status(500).json({
      success: false,
      message: "Error en la base de datos",
      error: error.message,
    });
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
    res.status(500).json({
      success: false,
      message: "Error en la base de datos",
      error: error.message,
    });
  }
};

const GetListGalleryController = async (req, res) => {
  try {
    const response = await noticiesModel.ListGallery();
    res.json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error en la base de datos",
      error: error.message,
    });
  }
};

const GetGalleryByNoticeController = async (req, res) => {
  try {
    const { id_notice } = req.body;
    const response = await noticiesModel.GetGalleryNotice(id_notice);
    res.json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error en la base de datos",
      error: error.message,
    });
  }
};

const RegisterCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    const response = await noticiesModel.RegisterCategory(name);
    res.status(200).json({
      success: true,
      data: response,
      message: "Se registro correctamente la categoría.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error en la base de datos",
      error: error.message,
    });
  }
};

const RegisterNoticeByCategoryController = async (req, res) => {
  try {
    const {
        id_category,
        title,
        state_notice,
        description,
      } = req.body;
      
    // Obtener las rutas de los archivos subidos
    const img_banner_path = req.files["img_banner"]
      ? req.files["img_banner"][0].filename
      : "";
    const img_card_path = req.files["img_card"]
      ? req.files["img_card"][0].filename
      : "";

    await noticiesModel.RegisterNoticeByCategory(
      id_category,
      img_banner_path,
      img_card_path,
      title,
      state_notice,
      description
    );
    res.status(200).json({
      success: true,
      data: response,
      message: "Se registro correctamente la noticia.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error en la base de datos",
      error: error.message,
    });
  }
};

const RegisterGalleryController = async (req, res) => {
  try {
    const {
        id_notice
      } = req.body;
      
    // Obtener las rutas de los archivos subidos
    const img_gallery_path = req.file["filename"];
    await noticiesModel.RegisterGallery(
      id_notice,
      img_gallery_path
    );
    res.status(200).json({
      success: true,
      data: response,
      message: "Se registro correctamente la imagen.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error en la base de datos",
      error: error.message,
    });
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
    res.status(500).json({
      success: false,
      message: "Error en la base de datos",
      error: error.message,
    });
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
    res.status(500).json({
      success: false,
      message: "Error en la base de datos",
      error: error.message,
    });
  }
};

const ActiveInactiveGalleryStateController = async (req, res) => {
  try {
    const { state_image, id_notice } = req.body;
    const response = await noticiesModel.ActiveInactiveStateGallery(
      state_image,
      id_notice
    );
    res.json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error en la base de datos",
      error: error.message,
    });
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
    res.status(500).json({
      success: false,
      message: "Error en la base de datos",
      error: error.message,
    });
  }
};

const UpdateNoticiesController = async (req, res) => {
  try {
    const { title, description, id_category, id_notice } =
      req.body;

      const img_card_path = req.files["img_card"]
      ? req.files["img_card"][0].filename
      : "";
    const img_banner_path = req.files["img_banner"]
      ? req.files["img_banner"][0].filename
      : "";
      console.log(req.files["img_card"]);
    const response = await noticiesModel.UpdateNoticies(
      img_banner_path,
      img_card_path,
      title,
      description,
      id_category,
      id_notice
    );
    res.json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error en la base de datos",
      error: error.message,
    });
  }
};

const UpdateGalleryController = async (req, res) => {
  try {
    const { id_notice, id_gallery } = req.body;
    const img_gallery_path = req.file["filename"];
    const response = await noticiesModel.UpdateGallery(
      img_gallery_path, id_notice, id_gallery
    );
    res.json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error en la base de datos",
      error: error.message,
    });
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
    res.status(500).json({
      success: false,
      message: "Error en la base de datos",
      error: error.message,
    });
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
    res.status(500).json({
      success: false,
      message: "Error en la base de datos",
      error: error.message,
    });
  }
};

const DeleteGalleryController = async (req, res) => {
  try {
    const { id_gallery } = req.body;
    const response = await noticiesModel.DeleteGallery(
      id_gallery
    );
    res.json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error en la base de datos",
      error: error.message,
    });
  }
};

export const noticiesController = {
  GetListCategoriesController,
  GetListCategoriesActiveController,
  GetListNoticiesController,
  GetListNoticiesByCategoryActiveController,
  GetListFirstThreeNoticiesController,
  GetNoticieByCategoryController,
  GetListGalleryController,
  GetGalleryByNoticeController,
  RegisterCategoryController,
  RegisterNoticeByCategoryController,
  RegisterGalleryController,
  ActiveInactiveCategoryStateController,
  ActiveInactiveNoticeStateController,
  ActiveInactiveGalleryStateController,
  UpdateCategoryController,
  UpdateNoticiesController,
  UpdateGalleryController,
  DeleteCategoryController,
  DeleteNoticeController,
  DeleteGalleryController
};
