import React from "react";
import { LoginForm } from "../components";
import BlackLogoSpark from "../assets/img/transBGlogin.png";

const Login = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${BlackLogoSpark})`,
      }}
      className="w-screen flex justify-center p-3 h-screen py-28"
    >
      <LoginForm />
    </div>
  );
};

export default Login;
