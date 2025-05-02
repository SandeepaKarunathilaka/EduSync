import express from "express";
import {
    createRecord,
    getAllRecords,
    updateRecord,
    deleteRecord
} from "../controllers/record.controller.js";

const router = express.Router();

router.post("/", createRecord);
router.get("/", getAllRecords);
router.put("/:id", updateRecord);
router.delete("/:id", deleteRecord);

export default router;