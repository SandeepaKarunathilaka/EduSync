import Chapter from "../models/chapter.model.js";

export const createChapter = async(chapterData) => {
    const chapter = new Chapter(chapterData);
    return await chapter.save();
};

export const getChapterById = async(id) => {
    return await Chapter.findById(id).populate("course");
};

export const updateChapter = async(id, chapterData) => {
    return await Chapter.findByIdAndUpdate(id, chapterData, { new: true });
};

export const deleteChapter = async(id) => {
    return await Chapter.findByIdAndUpdate(
        id, { deleteStatus: true }, { new: true }
    );
};

export const getChaptersByCourseId = async(courseId) => {
    return await Chapter.find({ course: courseId, deleteStatus: false }).populate("course");
};