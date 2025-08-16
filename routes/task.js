const express = require('express');
const router = express.Router();
const Todo = require('../model/todo'); // Assuming Task is also defined in user.js

router.post("/todo", async (req, res) => {
  try {
    const { task } = req.body; 
    if (!task || task.trim() === "") {
      return res.status(400).json({ message: "Task is required" });
    }

    const newTask = new Todo({ task }); 
    await newTask.save();

    res.status(201).json({ message: "Task created", task: newTask });
  } catch (err) {
    console.error("Error in /todo:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});


router.get("/todo", async (req, res) => {
    Todo.find()
        .then(result => res.json(result))
        .catch(err => res.json(err));
});

router.put("/todos/:id", async (req, res) => {
  try {
    const { task, completed } = req.body;

    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      { task, completed },
      { new: true } // return updated document
    );

    if (!updatedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.json(updatedTodo);
  } catch (err) {
    console.error("Error updating todo:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Delete a todo by ID
router.delete("/todo/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Todo.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: "Todo not found" });
    }
    res.json({ message: "Todo deleted successfully" });
  } catch (err) {
    console.error("Error deleting todo:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;