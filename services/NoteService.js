var axios = require("axios");
const NOTE_API_BASE_URL = "http://localhost:8080/api/v1";

var getHello = () => {
  return axios.get(NOTE_API_BASE_URL + "/hello");
};
module.exports.getHello = getHello;
