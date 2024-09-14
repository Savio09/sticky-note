import axios from "axios";
const API_URL = "https://sticky-notes-583bb660aba3.herokuapp.com/api/";

const getNotes = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL + "notes", config);
  return response.data;
};

const createNote = async (data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL + "notes", data, config);
  return response.data;
};

const updateNote = async ({ id, ...data }, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(API_URL + `notes/${id}`, data, config);
  return response.data;
};

const deleteNote = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(API_URL + `notes/${id}`, config);
  return response.data;
};

const noteService = {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
};

export default noteService;
