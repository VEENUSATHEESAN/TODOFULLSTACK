import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
});

export const getTodos = () => api.get('/todos');
export const createTodo = (data) => api.post('/todos', data);
export const updateTodo = (id, data) => api.put(`/todos/${id}`, data);
export const toggleDone = (id) => api.patch(`/todos/${id}/done`);
export const deleteTodo = (id) => api.delete(`/todos/${id}`);
