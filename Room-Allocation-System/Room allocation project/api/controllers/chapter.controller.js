import {
    createChapter as createService,
    getChapterById as getService,
    updateChapter as updateService,
    deleteChapter as deleteService,
    getChaptersByCourseId as getByCourseService
} from "../services/chapter.service.js";

export const createChapter = async(req, res) => {
    try {
        const chapter = await createService(req.body);
        res.status(201).json(chapter);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getChapterById = async(req, res) => {
    try {
        const chapter = await getService(req.params.id);
        if (!chapter) return res.status(404).json({ message: "Chapter not found" });
        res.status(200).json(chapter);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateChapter = async(req, res) => {
    try {
        const chapter = await updateService(req.params.id, req.body);
        if (!chapter) return res.status(404).json({ message: "Chapter not found" });
        res.status(200).json(chapter);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteChapter = async(req, res) => {
    try {
        const chapter = await deleteService(req.params.id);
        if (!chapter) return res.status(404).json({ message: "Chapter not found" });
        res.status(200).json({ message: "Chapter deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getChaptersByCourseId = async(req, res) => {
    try {
        const chapters = await getByCourseService(req.params.courseId);
        res.status(200).json(chapters);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};