import React from "react";
import { useState, useEffect } from "react";
import { CustomerList, Filterbar } from "../components";
import { users } from "../data/mock/mockdata";
//import users from "../models/users";
const Customers = () => {
  const [filterPhrase, setFilterPhrase] = useState("");
  const [userData, setUserData] = useState(users.users);

  useEffect(() => {
    // async function fetchData() {
    //   const res = await users.getUsers();
    //   const data = res;
    //   setUserData(data);
    // }
    // fetchData();
    setUserData(users.users);
  }, []);

  return (
    <>
      <div className="flex flex-col w-full px-11 min-h-screen">
        <div className="text-4xl font-semibold p-3">
          <h1>Customers</h1>
        </div>
        <div className="flex flex-row justify-between">
          <div className="py-3">
            <Filterbar
              filterPhrase={filterPhrase}
              setFilterPhrase={setFilterPhrase}
              placeholder={"Filter Users"}
            />
          </div>
        </div>
        <div>
          <CustomerList userData={userData} filterPhrase={filterPhrase} />
        </div>
      </div>
    </>
  );
};

export default Customers;
