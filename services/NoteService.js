var axios = require("axios");
const NOTE_API_BASE_URL = "http://localhost:8080/api/v1/user";

var getHello = () => {
  return axios.get(NOTE_API_BASE_URL + "/hello");
};
var createUser = (user) => {
  return axios.post(NOTE_API_BASE_URL + "/add", user);
};
var findByUsername = (user) => {
  return axios.post(NOTE_API_BASE_URL + "/findByUsername", user);
};
module.exports.getHello = getHello;
module.exports.createUser = createUser;
module.exports.findByUsername = findByUsername;
