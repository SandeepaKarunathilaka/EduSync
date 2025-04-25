const express = require("express");
const lectureController = require("./controller");

const router = express.Router();

router.post("/", lectureController.createLecture);
router.get("/:id", lectureController.getLectureById);
router.put("/:id", lectureController.updateLecture);
router.delete("/:id", lectureController.deleteLecture);
router.get("/chapter/:chapterId", lectureController.getLecturesByChapterId);

module.exports = router;
