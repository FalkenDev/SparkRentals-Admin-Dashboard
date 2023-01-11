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
  addPrepaid: async function addPrepaid(card) {
    const tokenObj = storage.readToken();
    const data = {
      code: card.code,
      amount: card.amount,
      total_uses: card.totalUses,
      api_key: process.env.REACT_APP_REST_API_KEY,
    };
    await fetch(`${process.env.REACT_APP_API_URL}/prepaids`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "content-type": "application/json",
        "x-access-token": tokenObj.token,
      },
    });
  },

  editPrepaid: async function editPrepaid(card) {
    const tokenObj = storage.readToken();
    const data = {
      prepaid_id: card.id,
      code: card.code,
      amount: card.amount,
      totalUses: card.totalUses,
      api_key: process.env.REACT_APP_REST_API_KEY,
    };
    await fetch(`${process.env.REACT_APP_API_URL}/prepaids`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "content-type": "application/json",
        "x-access-token": tokenObj.token,
      },
    });
  },

  removePrepaid: async function removePrepaid(id) {
    const tokenObj = storage.readToken();
    const data = {
      prepaid_id: id,
      api_key: process.env.REACT_APP_REST_API_KEY,
    };
    await fetch(`${process.env.REACT_APP_API_URL}/prepaids`, {
      method: "DELETE",
      body: JSON.stringify(data),
      headers: {
        "content-type": "application/json",
        "x-access-token": tokenObj.token,
      },
    });
  },
};

export default prepaid;
