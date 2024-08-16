import { Router } from "express";
import { noticiesController } from "../controllers/noticies.controller.js";

const router = Router();

// METHODS GET
router.get("/get-categories", noticiesController.GetListCategoriesController);
router.get("/get-noticies", noticiesController.GetListNoticiesController);

// METHODS POST
router.post("/list-noticies", noticiesController.GetListNoticiesByCategoryController);
router.post("/list-first-noticies", noticiesController.GetListFirstThreeNoticiesController);
router.post("/get-noticie", noticiesController.GetNoticieByCategoryController);
router.post("/get-gallery-notice", noticiesController.GetGalleryByNoticieAndCategoryController);
router.post("/register-category", noticiesController.RegisterCategoryController);
router.post("/register-notice", noticiesController.RegisterNoticeByCategoryController);
router.post("/state-category", noticiesController.ActiveInactiveCategoryStateController);
router.post("/state-noticie", noticiesController.ActiveInactiveNoticeStateController);

export default router;