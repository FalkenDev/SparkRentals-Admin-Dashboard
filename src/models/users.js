import storage from "./storage";
const users = {
  getUsers: async function getUsers() {
    const tokenObj = storage.readToken();
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/users?api_key=${process.env.REACT_APP_REST_API_KEY}`,
      {
        headers: {
          "x-access-token": tokenObj.token,
        },
      }
    );
    return response.json();
  },

  editUsers: async function editUsers(user) {
    const data = {
      user_id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
      email: user.email,
      balance: user.balance,
      api_key: process.env.REACT_APP_REST_API_KEY,
    };
    const tokenObj = storage.readToken();
    await fetch(`${process.env.REACT_APP_API_URL}/users`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "content-type": "application/json",
        "x-access-token": tokenObj.token,
      },
    });
  },
  deleteUsers: async function deleteUsers(userID) {
    const data = {
      user_id: userID,
      api_key: process.env.REACT_APP_REST_API_KEY,
    };
    const tokenObj = storage.readToken();
    await fetch(`${process.env.REACT_APP_API_URL}/users`, {
      method: "DELETE",
      body: JSON.stringify(data),
      headers: {
        "content-type": "application/json",
        "x-access-token": tokenObj.token,
      },
    });
  },
};

export default users;
