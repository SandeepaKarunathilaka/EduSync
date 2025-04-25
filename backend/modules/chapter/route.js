const express = require("express");
const chapterController = require("./controller");

const router = express.Router();

router.post("/", chapterController.createChapter);
router.get("/:id", chapterController.getChapterById);
router.put("/:id", chapterController.updateChapter);
router.delete("/:id", chapterController.deleteChapter);
router.get("/course/:courseId", chapterController.getChaptersByCourseId);

module.exports = router;
