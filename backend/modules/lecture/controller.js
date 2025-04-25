const lectureService = require("./service");

const createLecture = async (req, res) => {
  try {
    const lecture = await lectureService.createLecture(req.body);
    res.status(201).json(lecture);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getLectureById = async (req, res) => {
  try {
    const lecture = await lectureService.getLectureById(req.params.id);
    if (!lecture) {
      return res.status(404).json({ message: "Lecture not found" });
    }
    res.status(200).json(lecture);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateLecture = async (req, res) => {
  try {
    const lecture = await lectureService.updateLecture(req.params.id, req.body);
    if (!lecture) {
      return res.status(404).json({ message: "Lecture not found" });
    }
    res.status(200).json(lecture);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteLecture = async (req, res) => {
  try {
    const lecture = await lectureService.deleteLecture(req.params.id);
    if (!lecture) {
      return res.status(404).json({ message: "Lecture not found" });
    }
    res.status(200).json({ message: "Lecture deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getLecturesByChapterId = async (req, res) => {
  try {
    const lectures = await lectureService.getLecturesByChapterId(
      req.params.chapterId
    );
    res.status(200).json(lectures);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createLecture,
  getLectureById,
  updateLecture,
  deleteLecture,
  getLecturesByChapterId,
};
