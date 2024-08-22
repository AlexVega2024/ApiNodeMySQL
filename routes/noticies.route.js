import { Router } from "express";
import multer from "multer";
import fs from "fs";
import path from "path";
import { noticiesController } from "../controllers/noticies.controller.js";

// Ruta donde se guardarán los archivos
const uploadDir = 'C:/xampp/htdocs/images_seccion_noticias';

// Asegúrate de que el directorio exista
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configuración de multer para almacenar archivos en la ruta especificada
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const timestamp = new Date().toISOString().replace(/[-T:.Z]/g, '');
    const extension = path.extname(file.originalname);
    cb(null, `${timestamp}${extension}`);
  }
});

const upload = multer({ storage: storage });

const router = Router();
// METHODS GET
router.get("/get-categories", noticiesController.GetListCategoriesController);
router.get("/list-categories-active", noticiesController.GetListCategoriesActiveController);
router.get("/get-noticies", noticiesController.GetListNoticiesController);
router.get("/get-galleries", noticiesController.GetListGalleryController);

// METHODS POST
router.post("/list-noticies-active", noticiesController.GetListNoticiesByCategoryActiveController);
router.post("/list-first-noticies", noticiesController.GetListFirstThreeNoticiesController);
router.post("/get-noticie", noticiesController.GetNoticieByCategoryController);
router.post("/get-gallery-notice", noticiesController.GetGalleryByNoticeController);
router.post("/register-category", noticiesController.RegisterCategoryController);
router.post("/register-notice", upload.fields([{ name: 'img_card' }, { name: 'img_banner' }]), noticiesController.RegisterNoticeByCategoryController);
router.post("/register-gallery", upload.single('name_image'), noticiesController.RegisterGalleryController);
router.post("/state-category", noticiesController.ActiveInactiveCategoryStateController);
router.post("/state-noticie", noticiesController.ActiveInactiveNoticeStateController);
router.post("/state-gallery", noticiesController.ActiveInactiveGalleryStateController);
router.post("/update-category", noticiesController.UpdateCategoryController);
router.post("/update-noticie", upload.fields([{ name: 'img_card' }, { name: 'img_banner' }]), noticiesController.UpdateNoticiesController);
router.post("/update-gallery", upload.single('name_image'), noticiesController.UpdateGalleryController);
router.post("/delete-category", noticiesController.DeleteCategoryController);
router.post("/delete-noticie", noticiesController.DeleteNoticeController);
router.post("/delete-gallery", noticiesController.DeleteGalleryController);

export default router;