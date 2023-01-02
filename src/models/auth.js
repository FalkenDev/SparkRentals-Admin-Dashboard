import storage from "./storage";
const auth = {
  loggedIn: function loggedIn() {
    const token = storage.readToken();
    const Hours = 1000 * 60 * 60;
    const notExpired = new Date().getTime() - token.date < Hours;
    return token && notExpired;
  },

  login: async function login(email, password) {
    const data = {
      email: email,
      password: password,
      api_key: process.env.REACT_APP_REST_API_KEY,
    };
    const tokenObj = storage.readToken();
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/auth/login/server/admin`,
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "content-type": "application/json",
          "x-access-token": tokenObj.token,
        },
      }
    );
    const result = await response.json();

    if (Object.prototype.hasOwnProperty.call(result, "errors")) {
      return {
        message: result.errors.title,
        description: result.errors.detail,
        type: "danger",
      };
    }

    storage.storeToken(result.data.token);

    return {
      message: "Success",
      description: result.data.message,
      type: "success",
    };
  },
  logout: async function logout() {
    storage.deleteToken();
  },
};

export { auth };
