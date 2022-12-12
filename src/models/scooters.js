import storage from "./storage";
const scooter = {
  getScooters: async function getScooters() {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/scooters?api_key=${process.env.REACT_APP_REST_API_KEY}`
    );
    return response.json();
  },

  getScootersOverview: async function getScootersOverview() {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/scooters/overview?api_key=${process.env.REACT_APP_REST_API_KEY}`
    );
    return response.json();
  },

  getScooterById: async function getScooterById(id) {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/scooters/${id}?api_key=${process.env.REACT_APP_REST_API_KEY}`
    );
    return response.json();
  },

  getScootersByCity: async function getScootersByCity(city) {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/scooters/owner/${city}?api_key=${process.env.REACT_APP_REST_API_KEY}`
    );
    return response.json();
  },

  addScooter: async function addScooter(scooter) {
    const data = {
      owner: scooter.owner,
      longitude: scooter.longitude,
      latitude: scooter.latitude,
      battery: scooter.battery,
      status: scooter.status,
      api_key: process.env.REACT_APP_REST_API_KEY,
    };
    const tokenObj = storage.readToken();
    await fetch(`${process.env.REACT_APP_API_URL}/scooters`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "content-type": "application/json",
        "x-access-token": tokenObj.token,
      },
    });
  },

  deleteScooter: async function deleteScooter(id) {
    const data = {
      scooter_id: id,
      api_key: process.env.REACT_APP_REST_API_KEY,
    };
    const tokenObj = storage.readToken();
    const response = await fetch(`${process.env.REACT_APP_API_URL}/scooters`, {
      method: "DELETE",
      body: JSON.stringify(data),
      headers: {
        "content-type": "application/json",
        "x-access-token": tokenObj.token,
      },
    });
    await response.json();
  },

  editScooter: async function editScooter(scooter) {
    const data = {
      scooter_id: scooter._id,
      owner: scooter.owner,
      longitude: scooter.coordinates.longitude,
      latitude: scooter.coordinates.latitude,
      battery: scooter.battery,
      status: scooter.status,
      api_key: process.env.REACT_APP_REST_API_KEY,
    };
    const tokenObj = storage.readToken();
    const response = await fetch(`${process.env.REACT_APP_API_URL}/scooters`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "content-type": "application/json",
        "x-access-token": tokenObj.token,
      },
    });
    await response.json();
  },
};

export default scooter;
