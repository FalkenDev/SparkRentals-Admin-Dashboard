const users = {
  getUsers: async function getScooters() {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/users?api_key=${process.env.REACT_APP_REST_API_KEY}`
    );
    return response.json();
  },
};

export default users;
