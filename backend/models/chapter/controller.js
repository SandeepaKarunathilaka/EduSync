const chapterService = require("./service");

const createChapter = async (req, res) => {
  try {
    const chapter = await chapterService.createChapter(req.body);
    res.status(201).json(chapter);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getChapterById = async (req, res) => {
  try {
    const chapter = await chapterService.getChapterById(req.params.id);
    if (!chapter) {
      return res.status(404).json({ message: "Chapter not found" });
    }
    res.status(200).json(chapter);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateChapter = async (req, res) => {
  try {
    const chapter = await chapterService.updateChapter(req.params.id, req.body);
    if (!chapter) {
      return res.status(404).json({ message: "Chapter not found" });
    }
    res.status(200).json(chapter);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteChapter = async (req, res) => {
  try {
    const chapter = await chapterService.deleteChapter(req.params.id);
    if (!chapter) {
      return res.status(404).json({ message: "Chapter not found" });
    }
    res.status(200).json({ message: "Chapter deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getChaptersByCourseId = async (req, res) => {
  try {
    const chapters = await chapterService.getChaptersByCourseId(
      req.params.courseId
    );
    res.status(200).json(chapters);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createChapter,
  getChapterById,
  updateChapter,
  deleteChapter,
  getChaptersByCourseId,
};
