import { noticiesModel } from "../models/noticies.model.js";

const GetListCategoriesController = async (req, res) => {
  try {
    const response = await noticiesModel.ListCategories();
    res.status(200).json({
      success: true,
      data: response,
      message: "Lista de categorías obtenida correctamente.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error en la base de datos.",
      error: error.message,
    });
  }
};

const GetListCategoriesActiveController = async (req, res) => {
  try {
    const response = await noticiesModel.ListCategoriesActive();
    res.status(200).json({
      success: true,
      data: response,
      message: "Lista de categorías activas obtenida correctamente.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error en la base de datos.",
      error: error.message,
    });
  }
};

const GetListNoticiesController = async (req, res) => {
  try {
    const response = await noticiesModel.ListNoticies();
    res.status(200).json({
      success: true,
      data: response,
      message: "Lista de noticias obtenida correctamente.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error en la base de datos.",
      error: error.message,
    });
  }
};

const GetListNoticiesByCategoryActiveController = async (req, res) => {
  try {
    const { id_category } = req.body;
    if (!id_category) {
      return res.status(400).json({
        success: false,
        message: "ID de categoría es requerido.",
      });
    }
    const response = await noticiesModel.ListNoticiesByCategoryActive(id_category);
    res.status(200).json({
      success: true,
      data: response,
      message: "Lista de noticias activas por categoría obtenida correctamente.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error en la base de datos.",
      error: error.message,
    });
  }
};

const GetListFirstThreeNoticiesController = async (req, res) => {
  try {
    const { id_category, id_noticie } = req.body;
    if (!id_category || !id_noticie) {
      return res.status(400).json({
        success: false,
        message: "ID de categoría e ID de noticia son requeridos.",
      });
    }
    const response = await noticiesModel.ListFirstThreeNoticies(id_category, id_noticie);
    res.status(200).json({
      success: true,
      data: response,
      message: "Primeras tres noticias obtenidas correctamente.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error en la base de datos.",
      error: error.message,
    });
  }
};

const GetNoticieByCategoryController = async (req, res) => {
  try {
    const { id_category, id_noticie } = req.body;
    if (!id_category || !id_noticie) {
      return res.status(400).json({
        success: false,
        message: "ID de categoría e ID de noticia son requeridos.",
      });
    }
    const response = await noticiesModel.GetNoticieByCategory(id_category, id_noticie);
    res.status(200).json({
      success: true,
      data: response[0],
      message: "Noticia por categoría obtenida correctamente.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error en la base de datos.",
      error: error.message,
    });
  }
};

const GetListGalleryController = async (req, res) => {
  try {
    const response = await noticiesModel.ListGallery();
    res.status(200).json({
      success: true,
      data: response,
      message: "Lista de galería obtenida correctamente.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error en la base de datos.",
      error: error.message,
    });
  }
};

const GetGalleryByNoticeController = async (req, res) => {
  try {
    const { id_notice } = req.body;
    if (!id_notice) {
      return res.status(400).json({
        success: false,
        message: "ID de noticia es requerido.",
      });
    }
    const response = await noticiesModel.GetGalleryNotice(id_notice);
    res.status(200).json({
      success: true,
      data: response,
      message: "Galería de la noticia obtenida correctamente.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error en la base de datos.",
      error: error.message,
    });
  }
};

const RegisterCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Nombre de la categoría es requerido.",
      });
    }
    const response = await noticiesModel.RegisterCategory(name);
    res.status(200).json({
      success: true,
      data: response,
      message: "Categoría registrada correctamente.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error en la base de datos.",
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
    
    if (!id_category || !title || !state_notice || !description) {
      return res.status(400).json({
        success: false,
        message: "ID de categoría, título, estado de noticia y descripción son requeridos.",
      });
    }

    const img_banner_path = req.files["img_banner"]
      ? req.files["img_banner"][0].filename
      : "";
    const img_card_path = req.files["img_card"]
      ? req.files["img_card"][0].filename
      : "";

    const response = await noticiesModel.RegisterNoticeByCategory(
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
      message: "Noticia registrada correctamente.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error en la base de datos.",
      error: error.message,
    });
  }
};

const RegisterGalleryController = async (req, res) => {
  try {
    const { id_notice } = req.body;
    if (!id_notice) {
      return res.status(400).json({
        success: false,
        message: "ID de noticia es requerido.",
      });
    }

    const img_gallery_path = req.file ? req.file["filename"] : "";

    const response = await noticiesModel.RegisterGallery(id_notice, img_gallery_path);
    res.status(200).json({
      success: true,
      data: response,
      message: "Imagen de la galería registrada correctamente.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error en la base de datos.",
      error: error.message,
    });
  }
};

const ActiveInactiveCategoryStateController = async (req, res) => {
  try {
    const { state_categ, id_category } = req.body;
    if (typeof state_categ !== 'boolean' || !id_category) {
      return res.status(400).json({
        success: false,
        message: "Estado de categoría (booleano) e ID de categoría son requeridos.",
      });
    }
    const response = await noticiesModel.ActiveInactiveStateCategory(state_categ, id_category);
    res.status(200).json({
      success: true,
      data: response,
      message: "Estado de la categoría actualizado correctamente.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error en la base de datos.",
      error: error.message,
    });
  }
};

const ActiveInactiveNoticeStateController = async (req, res) => {
  try {
    const { state_notice, id_category, id_notice } = req.body;
    if (typeof state_notice !== 'boolean' || !id_category || !id_notice) {
      return res.status(400).json({
        success: false,
        message: "Estado de noticia (booleano), ID de categoría e ID de noticia son requeridos.",
      });
    }
    const response = await noticiesModel.ActiveInactiveStateNoticie(state_notice, id_category, id_notice);
    res.status(200).json({
      success: true,
      data: response,
      message: "Estado de la noticia actualizado correctamente.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error en la base de datos.",
      error: error.message,
    });
  }
};

const ActiveInactiveGalleryStateController = async (req, res) => {
  try {
    const { state_image, id_notice } = req.body;
    if (typeof state_image !== 'boolean' || !id_notice) {
      return res.status(400).json({
        success: false,
        message: "Estado de imagen (booleano) e ID de noticia son requeridos.",
      });
    }
    const response = await noticiesModel.ActiveInactiveStateGallery(state_image, id_notice);
    res.status(200).json({
      success: true,
      data: response,
      message: "Estado de la imagen de la galería actualizado correctamente.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error en la base de datos.",
      error: error.message,
    });
  }
};

const UpdateCategoryController = async (req, res) => {
  try {
    const { name, id_category } = req.body;
    if (!name || !id_category) {
      return res.status(400).json({
        success: false,
        message: "Nombre de la categoría e ID de categoría son requeridos.",
      });
    }
    const response = await noticiesModel.UpdateCategory(name, id_category);
    res.status(200).json({
      success: true,
      data: response,
      message: "Categoría actualizada correctamente.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error en la base de datos.",
      error: error.message,
    });
  }
};

const UpdateNoticiesController = async (req, res) => {
  try {
    const { title, description, id_category, id_notice } = req.body;
    if (!title || !description || !id_category || !id_notice) {
      return res.status(400).json({
        success: false,
        message: "Título, descripción, ID de categoría e ID de noticia son requeridos.",
      });
    }

    const img_card_path = req.files["img_card"]
      ? req.files["img_card"][0].filename
      : "";
    const img_banner_path = req.files["img_banner"]
      ? req.files["img_banner"][0].filename
      : "";

    const response = await noticiesModel.UpdateNoticies(
      img_banner_path,
      img_card_path,
      title,
      description,
      id_category,
      id_notice
    );
    res.status(200).json({
      success: true,
      data: response,
      message: "Noticia actualizada correctamente.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error en la base de datos.",
      error: error.message,
    });
  }
};

const UpdateGalleryController = async (req, res) => {
  try {
    const { id_notice, id_gallery } = req.body;
    if (!id_notice || !id_gallery) {
      return res.status(400).json({
        success: false,
        message: "ID de noticia e ID de galería son requeridos.",
      });
    }
    const img_gallery_path = req.file ? req.file["filename"] : "";

    const response = await noticiesModel.UpdateGallery(img_gallery_path, id_notice, id_gallery);
    res.status(200).json({
      success: true,
      data: response,
      message: "Imagen de la galería actualizada correctamente.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error en la base de datos.",
      error: error.message,
    });
  }
};

const DeleteCategoryController = async (req, res) => {
  try {
    const { id_category } = req.body;
    if (!id_category) {
      return res.status(400).json({
        success: false,
        message: "ID de categoría es requerido.",
      });
    }
    const response = await noticiesModel.DeleteCategory(id_category);
    res.status(200).json({
      success: true,
      data: response,
      message: "Categoría eliminada correctamente.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error en la base de datos.",
      error: error.message,
    });
  }
};

const DeleteNoticeController = async (req, res) => {
  try {
    const { id_notice } = req.body;
    if (!id_notice) {
      return res.status(400).json({
        success: false,
        message: "ID de noticia es requerido.",
      });
    }
    const response = await noticiesModel.DeleteNotice(id_notice);
    res.status(200).json({
      success: true,
      data: response,
      message: "Noticia eliminada correctamente.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error en la base de datos.",
      error: error.message,
    });
  }
};

const DeleteGalleryController = async (req, res) => {
  try {
    const { id_gallery } = req.body;
    if (!id_gallery) {
      return res.status(400).json({
        success: false,
        message: "ID de galería es requerido.",
      });
    }
    const response = await noticiesModel.DeleteGallery(id_gallery);
    res.status(200).json({
      success: true,
      data: response,
      message: "Imagen de la galería eliminada correctamente.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error en la base de datos.",
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
