import Record from "../models/record.model.js";

// Create new record
export const createRecord = async(req, res, next) => {
    try {
        const newRecord = new Record(req.body);
        const saved = await newRecord.save();
        res.status(201).json(saved);
    } catch (error) {
        next(error);
    }
};

// Get all records
export const getAllRecords = async(req, res, next) => {
    try {
        const records = await Record.find();
        res.status(200).json(records);
    } catch (error) {
        next(error);
    }
};

// Delete a record by ID
export const deleteRecord = async(req, res, next) => {
    try {
        await Record.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Record deleted successfully" });
    } catch (error) {
        next(error);
    }
};

// Update a record by ID
export const updateRecord = async(req, res, next) => {
    try {
        const updated = await Record.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updated);
    } catch (error) {
        next(error);
    }
};