import {
    createLecture as createService,
    getLectureById as getService,
    updateLecture as updateService,
    deleteLecture as deleteService,
    getLecturesByChapterId as getByChapterService,
} from "../services/lecture.service.js";

export const createLecture = async(req, res) => {
    try {
        const lecture = await createService(req.body);
        res.status(201).json(lecture);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getLectureById = async(req, res) => {
    try {
        const lecture = await getService(req.params.id);
        if (!lecture) return res.status(404).json({ message: "Lecture not found" });
        res.status(200).json(lecture);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateLecture = async(req, res) => {
    try {
        const lecture = await updateService(req.params.id, req.body);
        if (!lecture) return res.status(404).json({ message: "Lecture not found" });
        res.status(200).json(lecture);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteLecture = async(req, res) => {
    try {
        const lecture = await deleteService(req.params.id);
        if (!lecture) return res.status(404).json({ message: "Lecture not found" });
        res.status(200).json({ message: "Lecture deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getLecturesByChapterId = async(req, res) => {
    try {
        const lectures = await getByChapterService(req.params.chapterId);
        res.status(200).json(lectures);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};