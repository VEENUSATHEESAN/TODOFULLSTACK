import { useState, useEffect, useCallback } from 'react';
import * as api from '../api/todos.js';

export function useTodos() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'success') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 3500);
  }, []);

  // Load all todos on mount
  const fetchTodos = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await api.getTodos();
      setTodos(res.data.data);
    } catch {
      setError('Failed to load TODOs. Make sure the backend is running.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchTodos(); }, [fetchTodos]);

  // Create — optimistic
  const createTodo = useCallback(async ({ title, description }) => {
    const optimistic = {
      _id: `temp-${Date.now()}`,
      title,
      description,
      done: false,
      createdAt: new Date().toISOString(),
    };
    setTodos((prev) => [optimistic, ...prev]);

    try {
      const res = await api.createTodo({ title, description });
      setTodos((prev) =>
        prev.map((t) => (t._id === optimistic._id ? res.data.data : t))
      );
      addToast('TODO created!');
    } catch {
      setTodos((prev) => prev.filter((t) => t._id !== optimistic._id));
      addToast('Failed to create TODO.', 'error');
    }
  }, [addToast]);

  // Toggle done — optimistic
  const toggleDone = useCallback(async (id) => {
    setTodos((prev) =>
      prev.map((t) => (t._id === id ? { ...t, done: !t.done } : t))
    );
    try {
      const res = await api.toggleDone(id);
      setTodos((prev) =>
        prev.map((t) => (t._id === id ? res.data.data : t))
      );
    } catch {
      setTodos((prev) =>
        prev.map((t) => (t._id === id ? { ...t, done: !t.done } : t))
      );
      addToast('Failed to update status.', 'error');
    }
  }, [addToast]);

  // Update title/description — optimistic
  const updateTodo = useCallback(async (id, data) => {
    const prev_todo = todos.find((t) => t._id === id);
    setTodos((prev) =>
      prev.map((t) => (t._id === id ? { ...t, ...data } : t))
    );
    try {
      const res = await api.updateTodo(id, data);
      setTodos((prev) =>
        prev.map((t) => (t._id === id ? res.data.data : t))
      );
      addToast('TODO updated!');
    } catch {
      setTodos((prev) =>
        prev.map((t) => (t._id === id ? prev_todo : t))
      );
      addToast('Failed to update TODO.', 'error');
    }
  }, [todos, addToast]);

  // Delete — optimistic
  const deleteTodo = useCallback(async (id) => {
    const prev_todos = todos;
    setTodos((prev) => prev.filter((t) => t._id !== id));
    try {
      await api.deleteTodo(id);
      addToast('TODO deleted.');
    } catch {
      setTodos(prev_todos);
      addToast('Failed to delete TODO.', 'error');
    }
  }, [todos, addToast]);

  return {
    todos,
    loading,
    error,
    toasts,
    createTodo,
    toggleDone,
    updateTodo,
    deleteTodo,
    refetch: fetchTodos,
  };
}
