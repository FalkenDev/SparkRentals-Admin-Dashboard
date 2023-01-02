import storage from "./storage";
const cities = {
  getCities: async function getCities() {
    const tokenObj = storage.readToken();
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/cities?api_key=${process.env.REACT_APP_REST_API_KEY}`,
      {
        headers: {
          "x-access-token": tokenObj.token,
        },
      }
    );
    return response.json();
  },

  getCitiesOverview: async function getCitiesOverview() {
    const tokenObj = storage.readToken();
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/cities/overview?api_key=${process.env.REACT_APP_REST_API_KEY}`,
      {
        headers: {
          "x-access-token": tokenObj.token,
        },
      }
    );
    return response.json();
  },
  getCityById: async function getCityById(id) {
    const tokenObj = storage.readToken();
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/cities/${id}?api_key=${process.env.REACT_APP_REST_API_KEY}`,
      {
        headers: {
          "x-access-token": tokenObj.token,
        },
      }
    );
    return response.json();
  },
  addCity: async function addCity(city) {
    const data = {
      name: city.name,
      fixedRate: city.fixedRate,
      timeRate: city.timeRate,
      bonusParkingZoneRate: city.bonusParkingZoneRate,
      parkingZoneRate: city.parkingZoneRate,
      noParkingZoneRate: city.noParkingZoneRate,
      chargingZoneRate: city.chargingZoneRate,
      NoParkingToValidParking: city.noParkingToValidParking,
      api_key: process.env.REACT_APP_REST_API_KEY,
    };
    const tokenObj = storage.readToken();
    await fetch(`${process.env.REACT_APP_API_URL}/cities`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "content-type": "application/json",
        "x-access-token": tokenObj.token,
      },
    });
  },

  editCity: async function editCity(city) {
    const data = {
      city_id: city._id,
      name: city.name,
      taxRates: city.taxRates,
      api_key: process.env.REACT_APP_REST_API_KEY,
    };
    const tokenObj = storage.readToken();
    await fetch(`${process.env.REACT_APP_API_URL}/cities`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "content-type": "application/json",
        "x-access-token": tokenObj.token,
      },
    });
  },

  deleteCity: async function deleteCity(cityID) {
    const data = {
      city_id: cityID,
      api_key: process.env.REACT_APP_REST_API_KEY,
    };
    const tokenObj = storage.readToken();
    await fetch(`${process.env.REACT_APP_API_URL}/cities`, {
      method: "DELETE",
      body: JSON.stringify(data),
      headers: {
        "content-type": "application/json",
        "x-access-token": tokenObj.token,
      },
    });
  },

  registerZone: async function registerZone(cityId, zone) {
    const data = {
      city_id: cityId,
      zoneType: zone.zoneType,
      type: zone.type,
      coordinates: zone.coordinates,
      api_key: process.env.REACT_APP_REST_API_KEY,
    };

    const tokenObj = storage.readToken();
    await fetch(`${process.env.REACT_APP_API_URL}/cities/zones`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "content-type": "application/json",
        "x-access-token": tokenObj.token,
      },
    });
  },

  deleteZone: async function deleteZone(zoneID, cityID) {
    const data = {
      city_id: cityID,
      zone_id: zoneID,
      api_key: process.env.REACT_APP_REST_API_KEY,
    };

    const tokenObj = storage.readToken();
    await fetch(`${process.env.REACT_APP_API_URL}/cities/zones`, {
      method: "DELETE",
      body: JSON.stringify(data),
      headers: {
        "content-type": "application/json",
        "x-access-token": tokenObj.token,
      },
    });
  },
};
export default cities;
