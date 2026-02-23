
import express from "express";
import { getAllNotes, createNote, updateNote, deleteNote,getNotesById } from "../controller/notesController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getAllNotes);
router.get("/:id",getNotesById);
router.post("/", protect, createNote);
router.put("/:id",updateNote);
router.delete("/:id",deleteNote);

export default router;
