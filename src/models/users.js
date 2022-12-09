import config from "../config/config.json";
//import storage from "./storage";
const users = {
  getUsers: async function getScooters() {
    const response = await fetch(
      `${config.url}/users?api_key=${process.env.REACT_APP_REST_API_KEY}`
    );
    return response.json();
  },
};

export default users;
