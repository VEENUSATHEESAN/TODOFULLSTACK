import express from 'express';
import Todo from '../models/Todo.js';

const router = express.Router();

// GET /api/todos — Get all TODO items (sorted newest first)
router.get('/', async (req, res, next) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });
    res.json({ success: true, data: todos });
  } catch (err) {
    next(err);
  }
});

// POST /api/todos — Create a new TODO item
router.post('/', async (req, res, next) => {
  try {
    const { title, description } = req.body;

    if (!title || title.trim() === '') {
      return res.status(400).json({ success: false, message: 'Title is required' });
    }

    const todo = await Todo.create({ title: title.trim(), description: description?.trim() || '' });
    res.status(201).json({ success: true, data: todo });
  } catch (err) {
    next(err);
  }
});

// PUT /api/todos/:id — Update a TODO's title and/or description
router.put('/:id', async (req, res, next) => {
  try {
    const { title, description } = req.body;

    if (!title || title.trim() === '') {
      return res.status(400).json({ success: false, message: 'Title is required' });
    }

    const todo = await Todo.findByIdAndUpdate(
      req.params.id,
      { title: title.trim(), description: description?.trim() ?? '' },
      { new: true, runValidators: true }
    );

    if (!todo) {
      return res.status(404).json({ success: false, message: 'TODO not found' });
    }

    res.json({ success: true, data: todo });
  } catch (err) {
    next(err);
  }
});

// PATCH /api/todos/:id/done — Toggle done status
router.patch('/:id/done', async (req, res, next) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({ success: false, message: 'TODO not found' });
    }

    todo.done = !todo.done;
    await todo.save();

    res.json({ success: true, data: todo });
  } catch (err) {
    next(err);
  }
});

// DELETE /api/todos/:id — Delete a TODO
router.delete('/:id', async (req, res, next) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);

    if (!todo) {
      return res.status(404).json({ success: false, message: 'TODO not found' });
    }

    res.json({ success: true, message: 'TODO deleted successfully' });
  } catch (err) {
    next(err);
  }
});

export default router;
