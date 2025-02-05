const express = require("express");
const Note = require("../models/note.model");
const jwt = require("jsonwebtoken");

const router = express.Router();

// Middleware to verify token
const verifyToken = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ message: "Access denied" });

  try {
    const verified = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid token" });
  }
};

// Create a Note
router.post("/", verifyToken, async (req, res) => {
  try {
    const { title, content, type } = req.body;
    const note = new Note({ userId: req.user.userId, title, content, type });
    await note.save();
    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get all Notes for a User
router.get("/", verifyToken, async (req, res) => {
  try {
    const notes = await Note.find({ userId: req.user.userId }).sort({ createdAt: 1 });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Delete a Note
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: "Note not found" });

    if (note.userId.toString() !== req.user.userId) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await note.deleteOne();
    res.json({ message: "Note deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
