const Lecture = require("./model");

const createLecture = async (lectureData) => {
  const lecture = new Lecture(lectureData);
  return await lecture.save();
};

const getLectureById = async (id) => {
  return await Lecture.findById(id).populate("chapter");
};

const updateLecture = async (id, lectureData) => {
  return await Lecture.findByIdAndUpdate(id, lectureData, { new: true });
};

const deleteLecture = async (id) => {
  return await Lecture.findByIdAndUpdate(
    id,
    { deleteStatus: true },
    { new: true }
  );
};

const getLecturesByChapterId = async (chapterId) => {
  return await Lecture.find({
    chapter: chapterId,
    deleteStatus: false,
  }).populate("chapter");
};

module.exports = {
  createLecture,
  getLectureById,
  updateLecture,
  deleteLecture,
  getLecturesByChapterId,
};
