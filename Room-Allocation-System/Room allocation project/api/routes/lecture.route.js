import express from "express";
import {
    createLecture,
    getLectureById,
    updateLecture,
    deleteLecture,
    getLecturesByChapterId,
} from "../controllers/lecture.controller.js";

const router = express.Router();

router.post("/", createLecture);
router.get("/:id", getLectureById);
router.put("/:id", updateLecture);
router.delete("/:id", deleteLecture);
router.get("/chapter/:chapterId", getLecturesByChapterId);

export default router;