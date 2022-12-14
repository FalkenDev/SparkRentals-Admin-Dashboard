import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BlackLogoSpark from "../../assets/LogoBlack.svg";
import { auth } from "../../models/auth.js";
import { useStateContext } from "../../contexts/ContextProvider";

const LoginForm = () => {
  const { setIsLoggedIn } = useStateContext();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isIncorrect, setIsIncorrect] = useState(false);
  const navigate = useNavigate();

  const validPass = async (event) => {
    event.preventDefault();

    const result = await auth.login(email, password);
    if (result.type === "success") {
      setIsLoggedIn(true);
      navigate("/dashboard");
    } else if (result.type === "danger") {
      setIsIncorrect(true);
    }
  };

  return (
    <div
      className="flex flex-col items-center w-96 rounded-2xl
     shadow-lg bg-white py-4 h-128"
    >
      <div className="py-4">
        <img src={BlackLogoSpark} alt="React Logo" className="w-48" />
      </div>
      <h1 className="font-semibold text-2xl mb-3">Admin Dashboard</h1>
      <form
        onSubmit={validPass}
        className="flex flex-col center items-center w-3/4 justify-between h-full"
      >
        <div className="w-full">
          <div className="border-b-2 my-8 w-full text-xl">
            <input
              type="text"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              placeholder="Email"
              className="w-full"
            />
          </div>
          <div className="border-b-2 my-8 w-full text-xl">
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              placeholder="Password"
              className="w-full"
            />
          </div>
        </div>
        {isIncorrect ? (
          <div className="text-center text-xl text-red-700 font-semibold">
            <p>Incorrect password or email please try again!</p>
          </div>
        ) : null}

        <div className="p-3">
          <button
            type="submit"
            className="bg-violet-500 py-1 text-white rounded-full w-72
             hover:bg-violet-600 transition-colors"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
