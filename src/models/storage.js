const storage = {
  storeToken: function storeToken(token) {
    localStorage.setItem("tokenDate", new Date().getTime());
    localStorage.setItem("token", token);
  },
  readToken: function readToken() {
    const token = localStorage.getItem("token");
    const tokenDate = localStorage.getItem("tokenDate");
    const tokenObj = {
      token: token,
      date: tokenDate,
    };
    return tokenObj;
  },
  deleteToken: function readToken() {
    localStorage.removeItem("token");
    localStorage.removeItem("tokenDate");
  },
};

export default storage;
