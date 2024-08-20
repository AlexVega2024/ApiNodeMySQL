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
    } else {
      return res.status(404).json({
        success: false,
        message: "No se encontraron categorías.",
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
    } else {
      return res.status(404).json({
        success: false,
        message: "No se encontraron categorías activas.",
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
    } else {
      return res.status(404).json({
        success: false,
        message: "No se encontraron noticias.",
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
    if (!id_category) {
      return res.status(400).json({
        success: false,
        message: "ID de categoría es requerido.",
      });
    }
    const response = await noticiesModel.ListNoticiesByCategoryActive(id_category);
    if (response.data) {
      return res.status(200).json({
        success: true,
        data: response.data,
        message: "Lista de noticias activas por categoría obtenida correctamente.",
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "No se encontraron noticias activas para esta categoría.",
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
    if (!id_category || !id_noticie) {
      return res.status(400).json({
        success: false,
        message: "ID de categoría e ID de noticia son requeridos.",
      });
    }
    const response = await noticiesModel.ListFirstThreeNoticies(id_category, id_noticie);
    if (response.ok) {
      return res.status(200).json({
        success: true,
        data: response.data,
        message: "Primeras tres noticias obtenidas correctamente.",
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "No se encontraron noticias.",
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
    if (!id_category || !id_noticie) {
      return res.status(400).json({
        success: false,
        message: "ID de categoría e ID de noticia son requeridos.",
      });
    }
    const response = await noticiesModel.GetNoticieByCategory(id_category, id_noticie);
    if (response.ok) {
      return res.status(200).json({
        success: true,
        data: response.data,
        message: "Noticia por categoría obtenida correctamente.",
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "No se encontró la noticia.",
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
    } else {
      return res.status(404).json({
        success: false,
        message: "No se encontraron imágenes en la galería.",
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
    if (!id_notice) {
      return res.status(400).json({
        success: false,
        message: "ID de noticia es requerido.",
      });
    }
    const response = await noticiesModel.GetGalleryNotice(id_notice);
    if (response.ok) {
      return res.status(200).json({
        success: true,
        data: response.data,
        message: "Galería de la noticia obtenida correctamente.",
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "No se encontraron imágenes para esta noticia.",
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
    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Nombre de la categoría es requerido.",
      });
    }
    const response = await noticiesModel.RegisterCategory(name);
    if (response.ok) {
      return res.status(201).json({
        success: true,
        data: response,
        message: "Categoría registrada correctamente.",
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "Hubo un error al registrar la categoría.",
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
    if (response.ok) {
      return res.status(201).json({
        success: true,
        data: response,
        message: "Noticia registrada correctamente.",
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "Hubo un error al registrar la noticia.",
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

const RegisterGalleryController = async (req, res) => {
  try {
    const { id_notice } = req.body;
    if (!id_notice) {
      return res.status(400).json({
        success: false,
        message: "ID de noticia es requerido.",
      });
    }

    const img_gallery_path = req.file ? req.file.filename : "";

    const response = await noticiesModel.RegisterGallery(id_notice, img_gallery_path);
    if (response.ok) {
      return res.status(201).json({
        success: true,
        data: response,
        message: "Imagen de la galería registrada correctamente.",
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "Hubo un error al registrar la imagen de la galería.",
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

const ActiveInactiveCategoryStateController = async (req, res) => {
  try {
    const { state_categ, id_category } = req.body;
    if (!id_category) {
      return res.status(400).json({
        success: false,
        message: "ID de categoría son requeridos.",
      });
    }
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
    if (!id_category || !id_notice) {
      return res.status(400).json({
        success: false,
        message: "ID de categoría e ID de noticia son requeridos.",
      });
    }
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
    if (!id_notice || !id_gallery) {
      return res.status(400).json({
        success: false,
        message: "Estado de imagen (booleano) e ID de noticia son requeridos.",
      });
    }
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
    if (!name || !id_category) {
      return res.status(400).json({
        success: false,
        message: "Nombre de la categoría e ID de categoría son requeridos.",
      });
    }
    const response = await noticiesModel.UpdateCategory(name, id_category);
    if (response.ok) {
      return res.status(200).json({
        success: true,
        data: response,
        message: "Categoría actualizada correctamente.",
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "Hubo un error al actualizar la categoría.",
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

    if (response.ok) {
      return res.status(200).json({
        success: true,
        data: response,
        message: "Noticia actualizada correctamente.",
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "Hubo un error al actualizar la noticia.",
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

const UpdateGalleryController = async (req, res) => {
  try {
    const { id_notice, id_gallery } = req.body;
    if (!id_notice || !id_gallery) {
      return res.status(400).json({
        success: false,
        message: "ID de noticia e ID de galería son requeridos.",
      });
    }
    const img_gallery_path = req.file ? req.file.filename : "";

    const response = await noticiesModel.UpdateGallery(id_notice, img_gallery_path, id_gallery);
    
    if (response.ok) {
      return res.status(200).json({
        success: true,
        data: response,
        message: "Imagen de la galería actualizada correctamente.",
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "Hubo un error al actualizar la imagen de la galeria.",
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
    if (response.ok) {
      return res.status(200).json({
        success: true,
        data: response,
        message: "Categoría eliminada correctamente.",
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "Hubo un error al eliminar la categoría.",
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
    
    if (response.ok) {
      return res.status(200).json({
        success: true,
        data: response,
        message: "Noticia eliminada correctamente.",
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "Hubo un error al eliminar la noticia.",
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
    if (response.ok) {
      return res.status(200).json({
        success: true,
        data: response,
        message: "Imagen de la galería eliminada correctamente.",
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "Hubo un error al eliminar la imagen de la galería.",
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
