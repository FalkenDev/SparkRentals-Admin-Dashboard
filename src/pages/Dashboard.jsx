import React from "react";
import { Databox } from "../components";
const Dashboard = () => {
  return (
    <div className="w-full px-5">
      <h1 className="text-xl font-semibold py-2">Dashboard</h1>
      <div className="w-full flex justify-center relative ">
        <Databox />
      </div>
    </div>
  );
};

export default Dashboard;
