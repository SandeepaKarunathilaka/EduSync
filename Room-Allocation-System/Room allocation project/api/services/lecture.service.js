import Lecture from "../models/lecture.model.js";

export const createLecture = async(lectureData) => {
    const lecture = new Lecture(lectureData);
    return await lecture.save();
};

export const getLectureById = async(id) => {
    return await Lecture.findById(id).populate("chapter");
};

export const updateLecture = async(id, lectureData) => {
    return await Lecture.findByIdAndUpdate(id, lectureData, { new: true });
};

export const deleteLecture = async(id) => {
    return await Lecture.findByIdAndUpdate(
        id, { deleteStatus: true }, { new: true }
    );
};

export const getLecturesByChapterId = async(chapterId) => {
    return await Lecture.find({
        chapter: chapterId,
        deleteStatus: false,
    }).populate("chapter");
};