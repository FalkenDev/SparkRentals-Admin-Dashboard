const storage = {
  //WRONG
  storeToken: function storeToken(token) {
    localStorage.setItem("token", token);
  },
  readToken: function readToken() {
    localStorage.getItem("token");
  },
  deleteToken: function readToken() {
    localStorage.removeItem("token");
  },
};

export default storage;
