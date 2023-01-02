import storage from "./storage";
const admin = {
  getAdmin: async function getAdmin() {
    const tokenObj = storage.readToken();
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/admins?api_key=${process.env.REACT_APP_REST_API_KEY}`,
      {
        headers: {
          "x-access-token": tokenObj.token,
        },
      }
    );
    return response.json();
  },
  addAdmin: async function addAdmin(admin) {
    const data = {
      firstName: admin.firstName,
      lastName: admin.lastName,
      email: admin.email,
      password: admin.password,
      api_key: process.env.REACT_APP_REST_API_KEY,
    };
    const tokenObj = storage.readToken();
    await fetch(`${process.env.REACT_APP_API_URL}/admins`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "content-type": "application/json",
        "x-access-token": tokenObj.token,
      },
    });
  },
  deleteAdmin: async function deleteAdmin(id) {
    const data = {
      id: id,
      api_key: process.env.REACT_APP_REST_API_KEY,
    };
    const tokenObj = storage.readToken();
    await fetch(`${process.env.REACT_APP_API_URL}/admins`, {
      method: "DELETE",
      body: JSON.stringify(data),
      headers: {
        "content-type": "application/json",
        "x-access-token": tokenObj.token,
      },
    });
  },
};
export default admin;
