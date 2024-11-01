import axios from "axios";

const BASE_URL_API = 'http://localhost:9000';
export const getAllHabits = () => {
  return axios.get(`${BASE_URL_API}/DailyHabits`);
};
export const addHabit = (habit) => {
  return axios.post(`${BASE_URL_API}/DailyHabits` , habit);
};
export const deleteHabit = (id) => {
  return axios.delete(`${BASE_URL_API}/DailyHabits/${id}`);
};
export const updateHabit = (id , data) => {
  return axios.put(`${BASE_URL_API}/DailyHabits/${id}` , data);
};
export const getAllNotes = () => {
  return axios.get(`${BASE_URL_API}/stickNotes`);
};
export const addNote = (note) => {
  return axios.post(`${BASE_URL_API}/stickNotes` , note);
};
export const deleteNote = (id) => {
  return axios.delete(`${BASE_URL_API}/stickNotes/${id}`);
};
export const getAllTasks = () => {
  return axios.get(`${BASE_URL_API}/toDOlist`);
};
export const addTask = (task) => {
  return axios.put(`${BASE_URL_API}/toDOlist` , task);
};
