import { Router } from "express";
import { noticiesController } from "../controllers/noticies.controller.js";

const router = Router();

// METHODS GET
router.get("/get-categories", noticiesController.GetListCategoriesController);

// METHODS POST
router.post("/list-noticies", noticiesController.GetNoticiesByCategoryController);
router.post("/state-category", noticiesController.ActiveInactiveCategoryStateController);
router.post("/state-noticie", noticiesController.ActiveInactiveNoticeStateController);

export default router;