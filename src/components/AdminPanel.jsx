import React, { useEffect, useState } from "react";
import admin from "../models/admin";
import { adminform } from "../data/data";

const AdminPanel = () => {
  const [adminData, setAdminData] = useState();
  const [selected, setSelected] = useState();
  const [newAdmin, setNewAdmin] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [mode, setMode] = useState("list");

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const res = await admin.getAdmin();
    const data = res.admins;
    setAdminData(data);
  }

  const handleChangeAdmin = (target, value) => {
    setNewAdmin({ ...newAdmin, [target]: value });
  };

  const handleDeleteAdmin = async () => {
    await admin.deleteAdmin(selected._id);
    await fetchData();

  };

  const handleRegister = async () => {
    await admin.addAdmin(newAdmin);
    await fetchData();
    setNewAdmin({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    });
  };

  const allAdmins = () => {
    return adminData.map((item, index) => {
      return (
        <div
          key={index}
          className="
        border-b border-slate-400 px-1 py-3"
        >
          <p>{item.firstName}</p>
          <p>{item.lastName}</p>
          <p>{item.email}</p>
          <label className="pr-2 font-semibold">Select</label>
          <input
            type="radio"
            name="select"
            value={item._id}
            onClick={() => {
              setSelected(item);
            }}
            className="
           bg-gray-600 text-white font-semibold
           rounded-xl"
          />
        </div>
      );
    });
  };

  const adminForm = () => {
    return adminform.map((item, index) => {
      return (
        <div>
          <label>{item.title}</label>
          <input
            type={item.type}
            name={item.name}
            value={newAdmin[item.name]}
            placeholder={item.placeholder}
            onChange={(e) => {
              handleChangeAdmin(item.name, e.target.value);
            }}
            className="bg-gray-50 border border-gray-300 text-gray-900
            text-sm rounded-lg block p-2.5 w-72"
          />
        </div>
      );
    });
  };

  if (!adminData) {
    return <div>loading</div>;
  }

  if (mode === "list") {
    return (
      <div className="px-3 w-80">
        <h1 className="text-2xl font-semibold p-2">Admin Settings</h1>
        <div
          className="rounded-xl shadow-md h-125 w-full overflow-scroll
       bg-white border border-slate-700 p-4"
        >
          <h1 className="text-xl underline">All Admins</h1>
          <div className="flex flex-col">{allAdmins()}</div>
        </div>
        <div className="my-5 flex flex-row justify-evenly">
          <button
            onClick={() => {
              setMode("register");
            }}
            className="p-2 bg-sidebarHover hover:bg-sidebarBlue
        rounded-xl text-white"
          >
            Register Admin
          </button>

          <button
            onClick={() => {
              handleDeleteAdmin();
            }}
            className="p-2 bg-sidebarHover hover:bg-sidebarBlue
        rounded-xl text-white"
          >
            Delete selected
          </button>
        </div>
      </div>
    );
  } else if (mode === "register") {
    return (
      <div className="p-3">
        <form
          className="rounded-xl shadow-md w-full overflow-scroll
          bg-white border border-slate-700 p-4"
        >
          <h1 className="underline text-xl text-center">Register Admin</h1>
          {adminForm()}
          <div className="flex flex-row justify-evenly pt-3">
            <button
              onClick={() => {
                setMode("list");
              }}
              className="py-2 px-4 transition-colors bg-sidebarHover
              hover:bg-sidebarBlue text-white rounded-full"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                handleRegister();
                setMode("list");
              }}
              className="py-2 px-4 transition-colors bg-sidebarHover
              hover:bg-sidebarBlue text-white rounded-full"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    );
  }
};

export default AdminPanel;
