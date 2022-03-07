var axios = require("axios");
const USER_API_BASE_URL = "http://localhost:8080/api/v1/user";
const API_BASE_URL = "http://localhost:8080/api/v1";

var createUser = (user) => {
  return axios.post(USER_API_BASE_URL + "/add", user);
};
var findByUsername = (username) => {
  return axios.post(USER_API_BASE_URL + "/findByUsername", username, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};
var addNote = (note) => {
  return axios.post(API_BASE_URL + "/note", note);
};
var updateNote = (noteId, note) => {
  return axios.put(API_BASE_URL + "/note/" + noteId, note);
};
var findNotesByUser = (user) => {
  return axios.post(API_BASE_URL + "/notes", user);
};
var deleteNoteById = (noteId) => {
  return axios.delete(API_BASE_URL + "/note/" + noteId);
};

module.exports.createUser = createUser;
module.exports.findByUsername = findByUsername;
module.exports.findNotesByUser = findNotesByUser;
module.exports.addNote = addNote;
module.exports.updateNote = updateNote;
module.exports.deleteNoteById = deleteNoteById;
