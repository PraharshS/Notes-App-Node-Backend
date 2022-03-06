var axios = require("axios");
const USER_API_BASE_URL = "http://localhost:8080/api/v1/user";
const NOTE_API_BASE_URL = "http://localhost:8080/api/v1/note";

var getHello = () => {
  return axios.get(USER_API_BASE_URL + "/hello");
};
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
  return axios.post(NOTE_API_BASE_URL, note);
};
var findNotesByUser = (user) => {
  return axios.post(NOTE_API_BASE_URL + "/get-all", user);
};
var deleteNoteById = (noteId) => {
  return axios.delete(NOTE_API_BASE_URL + "/" + noteId);
};
module.exports.getHello = getHello;
module.exports.createUser = createUser;
module.exports.findByUsername = findByUsername;
module.exports.findNotesByUser = findNotesByUser;
module.exports.addNote = addNote;
module.exports.deleteNoteById = deleteNoteById;
