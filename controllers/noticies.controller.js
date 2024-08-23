import { noticiesModel } from "../models/noticies.model.js";

const GetListCategoriesController = async (req, res) => {
  try {
    const response = await noticiesModel.ListCategories();
    if (response.ok) {
      return res.status(200).json({
        success: true,
        data: response.data,
        message: "Lista de categorías obtenida correctamente.",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error en la base de datos.",
      error: error.message,
    });
  }
};

const GetListCategoriesActiveController = async (req, res) => {
  try {
    const response = await noticiesModel.ListCategoriesActive();
    if (response.ok) {
      return res.status(200).json({
        success: true,
        data: response.data,
        message: "Lista de categorías activas obtenida correctamente.",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error en la base de datos.",
      error: error.message,
    });
  }
};

const GetListNoticiesController = async (req, res) => {
  try {
    const response = await noticiesModel.ListNoticies();
    if (response.ok) {
      return res.status(200).json({
        success: true,
        data: response.data,
        message: "Lista de noticias obtenida correctamente.",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error en la base de datos.",
      error: error.message,
    });
  }
};

const GetListGalleryController = async (req, res) => {
  try {
    const response = await noticiesModel.ListGallery();
    if (response.ok) {
      return res.status(200).json({
        success: true,
        data: response.data,
        message: "Lista de galería obtenida correctamente.",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error en la base de datos.",
      error: error.message,
    });
  }
};

const GetNoticieActiveController = async (req, res) => {
  try {
    const { id_noticie, id_category } = req.body;

    const response = await noticiesModel.ListNoticieActive(id_noticie, id_category);
    if (response.ok) {
      return res.status(200).json({
        success: true,
        data: response.data,
        message: "Noticia obtenida correctamente",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error en la base de datos.",
      error: error.message,
    });
  }
};

const GetListNoticiesByCategoryActiveController = async (req, res) => {
  try {
    const { id_category } = req.body;
    const response = await noticiesModel.ListNoticiesByCategoryActive(id_category);
    if (response.data) {
      return res.status(200).json({
        success: true,
        data: response.data,
        message: "Lista de noticias activas por categoría obtenida correctamente.",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error en la base de datos.",
      error: error.message,
    });
  }
};

const GetListFirstThreeNoticiesController = async (req, res) => {
  try {
    const { id_category, id_noticie } = req.body;
    const response = await noticiesModel.ListFirstThreeNoticies(id_category, id_noticie);
    if (response.ok) {
      return res.status(200).json({
        success: true,
        data: response.data,
        message: "Primeras tres noticias obtenidas correctamente.",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error en la base de datos.",
      error: error.message,
    });
  }
};

const GetNoticieByCategoryController = async (req, res) => {
  try {
    const { id_category, id_noticie } = req.body;
    const response = await noticiesModel.GetNoticieByCategory(id_category, id_noticie);
    if (response.ok) {
      return res.status(200).json({
        success: true,
        data: response.data,
        message: "Noticia por categoría obtenida correctamente.",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error en la base de datos.",
      error: error.message,
    });
  }
};

const GetGalleryByNoticeController = async (req, res) => {
  try {
    const { id_notice } = req.body;
    const response = await noticiesModel.GetGalleryNotice(id_notice);
    if (response.ok) {
      return res.status(200).json({
        success: true,
        data: response.data,
        message: "Galería de la noticia obtenida correctamente.",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error en la base de datos.",
      error: error.message,
    });
  }
};

const RegisterCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    const response = await noticiesModel.RegisterCategory(name);
    if (response.ok) {
      return res.status(201).json({
        success: true,
        data: response,
        message: "Categoría registrada correctamente.",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error en la base de datos.",
      error: error.message,
    });
  }
};

const RegisterNoticeByCategoryController = async (req, res) => {
  try {
    if (!req.files["img_banner"] || !req.files["img_card"]) {
      return res.status(400).json(
        {
          message: ["No existe una imagen cargada"]
        }
      );
    }

    const img_banner_path = req.files["img_banner"][0].filename;
    const img_card_path = req.files["img_card"][0].filename;
    const {
      id_category,
      title,
      state_notice,
      description,
    } = req.body;

    const response = await noticiesModel.RegisterNoticeByCategory(
      id_category,
      img_banner_path,
      img_card_path,
      title,
      state_notice,
      description
    );
    if (response.ok) {
      return res.status(201).json({
        success: true,
        data: response,
        message: "Noticia registrada correctamente.",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error en la base de datos.",
      error: error.message,
    });
  }
};

const RegisterGalleryController = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json(
        {
          message: ["No existe una imagen cargada"]
        }
      );
    }
    const img_gallery_path = req.file.filename;
    const { id_notice } = req.body;

    const response = await noticiesModel.RegisterGallery(id_notice, img_gallery_path);
    if (response.ok) {
      return res.status(201).json({
        success: true,
        data: response,
        message: "Imagen de la galería registrada correctamente.",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error en la base de datos.",
      error: error.message,
    });
  }
};

const ActiveInactiveCategoryStateController = async (req, res) => {
  try {
    const { state_categ, id_category } = req.body;
    const response = await noticiesModel.ActiveInactiveStateCategory(state_categ, id_category);

    if (response.ok) {
      return res.status(200).json({
        success: true,
        data: response,
        message: "Estado de la categoría actualizado correctamente.",
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "Hubo un error al actualizar el estado de la categoría.",
        messageModel: response.message
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error en la base de datos.",
      error: error.message,
    });
  }
};

const ActiveInactiveNoticeStateController = async (req, res) => {
  try {
    const { state_notice, id_category, id_notice } = req.body;
    const response = await noticiesModel.ActiveInactiveStateNoticie(state_notice, id_category, id_notice);
    if (response.ok) {
      return res.status(200).json({
        success: true,
        data: response,
        message: "Estado de la noticia actualizado correctamente."
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "Hubo un error al actualizar el estado de la noticia.",
        messageModel: response.message
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error en la base de datos.",
      error: error.message,
    });
  }
};

const ActiveInactiveGalleryStateController = async (req, res) => {
  try {
    const { state_image, id_notice, id_gallery } = req.body;
    const response = await noticiesModel.ActiveInactiveStateGallery(state_image, id_notice, id_gallery);
    if (response.ok) {
      return res.status(200).json({
        success: true,
        data: response,
        message: "Estado de la imagen de la galería actualizado correctamente.",
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "Hubo un error al actualizar el estado de la imagen de la galería.",
        messageModel: response.message
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error en la base de datos.",
      error: error.message,
    });
  }
};

const UpdateCategoryController = async (req, res) => {
  try {
    const { name, id_category } = req.body;
    const response = await noticiesModel.UpdateCategory(name, id_category);
    if (response.ok) {
      return res.status(200).json({
        success: true,
        data: response,
        message: "Categoría actualizada correctamente.",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error en la base de datos.",
      error: error.message,
    });
  }
};

const UpdateNoticiesController = async (req, res) => {
  try {

    if (!req.files["img_banner"] || !req.files["img_card"]) {
      return res.status(400).json(
        {
          message: ["No existen imágenes cargadas"]
        }
      );
    }

    const { title, description, id_category, id_notice } = req.body;
    const img_card_path = req.files["img_card"]
      ? req.files["img_card"][0].filename
      : req.body["img_card"];
    const img_banner_path = req.files["img_banner"]
      ? req.files["img_banner"][0].filename
      : req.body["img_banner"];

    const response = await noticiesModel.UpdateNoticies(
      img_banner_path,
      img_card_path,
      title,
      description,
      id_category,
      id_notice
    );

    if (response.ok) {
      return res.status(200).json({
        success: true,
        data: response,
        message: "Noticia actualizada correctamente.",
      });
    } 
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error en la base de datos.",
      error: error.message,
    });
  }
};

const UpdateGalleryController = async (req, res) => {
  console.log(req);
  try {
    if (!req.file) {
      return res.status(400).json(
        {
          message: ["No existe imágenes cargadas"]
        }
      );
    }

    const { name_image, id_notice, id_gallery } = req.body;
    const img_gallery_path = req.file ? req.file.filename : name_image;
    const response = await noticiesModel.UpdateGallery(id_notice, img_gallery_path, id_gallery);
    
    if (response.ok) {
      return res.status(200).json({
        success: true,
        data: response,
        message: "Imagen de la galería actualizada correctamente.",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error en la base de datos.",
      error: error.message,
    });
  }
};

const DeleteCategoryController = async (req, res) => {
  try {
    const { id_category } = req.body;
    const response = await noticiesModel.DeleteCategory(id_category);
    if (response.ok) {
      return res.status(200).json({
        success: true,
        data: response,
        message: "Categoría eliminada correctamente.",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error en la base de datos.",
      error: error.message,
    });
  }
};

const DeleteNoticeController = async (req, res) => {
  try {
    const { id_notice } = req.body;
    const response = await noticiesModel.DeleteNotice(id_notice);
    
    if (response.ok) {
      return res.status(200).json({
        success: true,
        data: response,
        message: "Noticia eliminada correctamente.",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error en la base de datos.",
      error: error.message,
    });
  }
};

const DeleteGalleryController = async (req, res) => {
  try {
    const { id_gallery } = req.body;
    const response = await noticiesModel.DeleteGallery(id_gallery);
    if (response.ok) {
      return res.status(200).json({
        success: true,
        data: response,
        message: "Imagen de la galería eliminada correctamente.",
      });
    }
  } catch (error) {
    return res.status(500).json({
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
  GetNoticieActiveController,
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
