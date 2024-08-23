import { Router } from "express";
import multer from "multer";
import fs from "fs";
import path from "path";
import { noticiesController } from "../controllers/noticies.controller.js";
import { body, validationResult } from "express-validator";

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

// Filtro de archivos para tipos permitidos
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
  const extname = path.extname(file.originalname).toLowerCase();
  if (allowedTypes.includes(extname)) {
    cb(null, true);
  } else {
    cb(new Error('Tipo de archivo inválido'), false);
  }
};

// Middleware para manejar errores de validación
const extractErrorMessages = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map(error => error.msg);
    return res.status(400).json({ errors: errorMessages });
  }
  next();
};

// Middleware para manejar errores de multer
const multerErrorHandler = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ errors: [err.message] });
  } else if (err) {
    return res.status(400).json({ errors: [err.message || 'Error desconocido'] });
  }
  next();
};

const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter
});

const router = Router();

// METHODS GET
router.get("/get-categories", noticiesController.GetListCategoriesController);
router.get("/list-categories-active", noticiesController.GetListCategoriesActiveController);
router.get("/get-noticies", noticiesController.GetListNoticiesController);
router.get("/get-galleries", noticiesController.GetListGalleryController);

// METHODS POST
router.post("/list-noticies-active", 
  body('id_category').notEmpty().withMessage("id_category es requerido").escape(),
  extractErrorMessages,
  noticiesController.GetListNoticiesByCategoryActiveController);

router.post("/list-first-noticies", 
  body('id_category').notEmpty().withMessage("id_category es requerido").escape(),
  body('id_noticie').notEmpty().withMessage("id_notice es requerido").escape(),
  extractErrorMessages,
  noticiesController.GetListFirstThreeNoticiesController);

router.post("/get-noticie", 
  body('id_category').notEmpty().withMessage("id_category es requerido").escape(),
  body('id_noticie').notEmpty().withMessage("id_notice es requerido").escape(),
  extractErrorMessages,
  noticiesController.GetNoticieByCategoryController);

router.post("/get-noticie-active", 
  body('id_category').notEmpty().withMessage("id_category es requerido").escape(),
  body('id_noticie').notEmpty().withMessage("id_notice es requerido").escape(),
  extractErrorMessages,
  noticiesController.GetNoticieActiveController);

router.post("/get-gallery-notice", 
  body('id_notice').notEmpty().withMessage("id_notice es requerido").escape(),
  extractErrorMessages,
  noticiesController.GetGalleryByNoticeController);

router.post("/register-category", 
  body('name').notEmpty().withMessage('Name es requerido').trim().escape(), 
  extractErrorMessages,
  noticiesController.RegisterCategoryController);

router.post("/register-notice", 
  upload.fields([{ name: 'img_card' }, { name: 'img_banner' }]), 
  multerErrorHandler,
  body('id_category').notEmpty().withMessage('id_category es requerido').trim().escape(),
  body('title').notEmpty().withMessage('title es requerido').trim().escape(),
  body('state_notice').notEmpty().withMessage('state_notice es requerido').trim().escape(),
  body('description').notEmpty().withMessage('description es requerido').trim().escape(),
  extractErrorMessages,
  noticiesController.RegisterNoticeByCategoryController);

router.post("/register-gallery", 
  upload.single('name_image'), 
  body('id_notice').notEmpty().withMessage('id_notice es requerido').trim().escape(),
  multerErrorHandler,
  extractErrorMessages,
  noticiesController.RegisterGalleryController);

router.post("/state-category", 
  body('state_categ').notEmpty().withMessage('state_categ es requerido').trim().escape(),
  body('id_category').notEmpty().withMessage('id_category es requerido').trim().escape(),
  extractErrorMessages,
  noticiesController.ActiveInactiveCategoryStateController);

router.post("/state-noticie",
  body('state_notice').notEmpty().withMessage('state_notice es requerido').trim().escape(),
  body('id_category').notEmpty().withMessage('id_category es requerido').trim().escape(),
  body('id_notice').notEmpty().withMessage('id_notice es requerido').trim().escape(),
  extractErrorMessages,
  noticiesController.ActiveInactiveNoticeStateController);

router.post("/state-gallery", 
  body('state_image').notEmpty().withMessage('state_image es requerido').trim().escape(),
  body('id_gallery').notEmpty().withMessage('id_gallery es requerido').trim().escape(),
  body('id_notice').notEmpty().withMessage('id_notice es requerido').trim().escape(),
  extractErrorMessages,
  noticiesController.ActiveInactiveGalleryStateController);

router.post("/update-category", 
  body('id_category').notEmpty().withMessage('id_category es requerido').trim().escape(),
  body('name').notEmpty().withMessage('Name es requerido').trim().escape(),
  extractErrorMessages,
  noticiesController.UpdateCategoryController);

router.post("/update-noticie", 
  upload.fields([{ name: 'img_card' }, { name: 'img_banner' }]), 
  multerErrorHandler,
  body('id_category').notEmpty().withMessage('id_category es requerido').trim().escape(),
  body('title').notEmpty().withMessage('title es requerido').trim().escape(),
  body('state_notice').notEmpty().withMessage('state_notice es requerido').trim().escape(),
  body('description').notEmpty().withMessage('description es requerido').trim().escape(),
  body('img_card').notEmpty().withMessage('img_card es requerido').trim().escape(),
  body('img_banner').notEmpty().withMessage('img_banner es requerido').trim().escape(),
  extractErrorMessages,
  noticiesController.UpdateNoticiesController);

router.post("/update-gallery", 
  upload.single('name_image'),
  multerErrorHandler,
  body('id_notice').notEmpty().withMessage('id_notice es requerido').trim().escape(),
  body('id_gallery').notEmpty().withMessage('id_gallery es requerido').trim().escape(),
  extractErrorMessages,
  noticiesController.UpdateGalleryController);

router.post("/delete-category",
  body('id_category').notEmpty().withMessage('id_category es requerido').trim().escape(),
  extractErrorMessages, 
  noticiesController.DeleteCategoryController);

router.post("/delete-noticie", 
  body('id_notice').notEmpty().withMessage('id_notice es requerido').trim().escape(),
  extractErrorMessages,
  noticiesController.DeleteNoticeController);

router.post("/delete-gallery",
  body('id_gallery').notEmpty().withMessage('id_gallery es requerido').trim().escape(),
  extractErrorMessages,
  noticiesController.DeleteGalleryController);

export default router;
