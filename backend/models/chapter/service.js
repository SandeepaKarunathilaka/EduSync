const Chapter = require("./model");

const createChapter = async (chapterData) => {
  const chapter = new Chapter(chapterData);
  return await chapter.save();
};

const getChapterById = async (id) => {
  return await Chapter.findById(id).populate("course");
};

const updateChapter = async (id, chapterData) => {
  return await Chapter.findByIdAndUpdate(id, chapterData, { new: true });
};

const deleteChapter = async (id) => {
  return await Chapter.findByIdAndUpdate(
    id,
    { deleteStatus: true },
    { new: true }
  );
};

const getChaptersByCourseId = async (courseId) => {
  return await Chapter.find({ course: courseId, deleteStatus: false }).populate(
    "course"
  );
};

module.exports = {
  createChapter,
  getChapterById,
  updateChapter,
  deleteChapter,
  getChaptersByCourseId,
};
