import express from "express";
import {
    createChapter,
    getChapterById,
    updateChapter,
    deleteChapter,
    getChaptersByCourseId
} from "../controllers/chapter.controller.js";

const router = express.Router();

router.post("/", createChapter);
router.get("/:id", getChapterById);
router.put("/:id", updateChapter);
router.delete("/:id", deleteChapter);
router.get("/course/:courseId", getChaptersByCourseId);

export default router;