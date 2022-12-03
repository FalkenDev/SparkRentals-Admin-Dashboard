import React from "react";
import { auth } from "../models/auth";
import { useStateContext } from "../contexts/ContextProvider";

const Settings = () => {
  const { setIsLoggedIn } = useStateContext();

  const handleLogout = (event) => {
    event.preventDefault();
    setIsLoggedIn(false);
    auth.logout();
  };

  return (
    <div>
      <div className="m-5">
        <button
          onClick={handleLogout}
          className="px-4 py-3 bg-blue-800 text-white hover:bg-blue-900 transition-colors rounded-lg"
        >
          Log out!
        </button>
      </div>
    </div>
  );
};

export default Settings;
