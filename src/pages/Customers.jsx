import React from "react";
import { useState, useEffect } from "react";
import { CustomerList, EditForm, Filterbar, LogForm } from "../components";
import users from "../models/users";
const Customers = () => {
  const [filterPhrase, setFilterPhrase] = useState("");
  const [userData, setUserData] = useState(users.users);
  const [logData, setLogData] = useState({});
  const [selectedUser, setSelectedUser] = useState();
  const [editForm, setEditForm] = useState(false);
  const [displayForm, setDisplayForm] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const res = await users.getUsers();
    const data = res.users;
    setUserData(data);
  }

  const handleRemoveAccount = async (userID) => {
    await users.deleteUsers(userID);
    await fetchData();
  };

  const handleAccountEdit = async () => {
    setEditForm(false);
    await users.editUsers(selectedUser);
    await fetchData();
  };

  const handleForm = () => {
    //event.preventDefault();

    if (displayForm) {
      setDisplayForm(false);
    } else {
      setDisplayForm(true);
    }
  };

  const overlay = () => {
    let state = { click: "auto", backdrop: "blur(0px)" };
    if (displayForm || editForm) {
      state = { click: "none", backdrop: "blur(4px)" };
    }
    return state;
  };

  const handleEditForm = () => {
    if (editForm) {
      setEditForm(false);
    } else {
      setEditForm(true);
    }
  };

  return (
    <>
      {editForm ? (
        <div
          className="fixed top-1/2 left-1/2 z-10
        transform -translate-x-1/2 -translate-y-1/2"
        >
          <EditForm
            handleEditForm={handleEditForm}
            selectedUser={selectedUser}
            setSelectedUser={setSelectedUser}
            handleAccountEdit={handleAccountEdit}
          />
        </div>
      ) : null}
      {displayForm ? (
        <div
          className="fixed top-1/2 left-1/2 z-10
          transform -translate-x-1/2 -translate-y-1/2"
        >
          <LogForm handleForm={handleForm} logData={logData} />
        </div>
      ) : null}
      <div
        style={{
          pointerEvents: overlay().click,
          filter: overlay().backdrop,
        }}
        className="flex flex-col w-full px-11 min-h-screen"
      >
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
          <CustomerList
            userData={userData}
            filterPhrase={filterPhrase}
            handleForm={handleForm}
            handleEditForm={handleEditForm}
            setSelectedUser={setSelectedUser}
            selectedUser={selectedUser}
            setLogData={setLogData}
            handleRemoveAccount={handleRemoveAccount}
          />
        </div>
      </div>
    </>
  );
};

export default Customers;
