import storage from "./storage";
const prepaid = {
  getPrePaid: async function getPrePaid() {
    const tokenObj = storage.readToken();
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/prepaids?api_key=${process.env.REACT_APP_REST_API_KEY}`,
      {
        headers: {
          "x-access-token": tokenObj.token,
        },
      }
    );
    return response.json();
  },
};

export default prepaid;
