import config from "../config/config.json";
const cities = {
  getCities: async function getCities() {
    const response = await fetch(
      `${config.url}/cities?api_key=${process.env.REACT_APP_REST_API_KEY}`
    );
    return response.json();
  },

  getCitiesOverview: async function getCitiesOverview() {
    const response = await fetch(
      `${config.url}/cities/overview?api_key=${process.env.REACT_APP_REST_API_KEY}`
    );
    return response.json();
  },
  getCityById: async function getCityById(id) {
    const response = await fetch(
      `${config.url}/cities/${id}?api_key=${process.env.REACT_APP_REST_API_KEY}`
    );
    return response.json();
  },
};
export default cities;
