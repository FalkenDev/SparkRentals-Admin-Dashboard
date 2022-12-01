import config from "../config/config.json";
const scooter = {
  getScooters: async function getScooters() {
    const response = await fetch(
      `${config.url}/scooters?api_key=${process.env.REACT_APP_REST_API_KEY}`
    );
    return response.json();
  },

  getScootersOverview: async function getScootersOverview() {
    const response = await fetch(
      `${config.url}/scooters/overview?api_key=${process.env.REACT_APP_REST_API_KEY}`
    );
    return response.json();
  },

  getScooterById: async function getScooterById(id) {
    const response = await fetch(
      `${config.url}/scooters/${id}?api_key=${process.env.REACT_APP_REST_API_KEY}`
    );
    return response.json();
  },
};

export default scooter;
