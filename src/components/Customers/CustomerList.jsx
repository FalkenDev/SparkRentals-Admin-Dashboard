import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { AiOutlineRight } from "react-icons/ai";
const CustomerList = ({ filterPhrase, userData }) => {
  const [isOpen, setIsOpen] = useState({});

  const handleClick = (id) => {
    setIsOpen((prevState) => ({ ...prevState, [id]: !prevState[id] }));
  };

  const rotate = (bool) => {
    if (bool) {
      return "rotate(90deg)";
    }
    return "rotate(0deg)";
  };

  const customerData = (user) => {
    return (
      <div className="w-full flex justify-between">
        <div className="p-3">
          <form className="flex flex-row ">
            <div className="flex flex-col px-2">
              <label>First Name</label>
              <input
                className="border-b bg-gray-200 border-gray-800 mr-2 mb-3"
                value={user.firstName}
              />
              <label>Last Name</label>
              <input
                className="border-b bg-gray-200 border-gray-800 mr-2"
                value={user.lastName}
              />
            </div>
            <div className="flex flex-col px-2">
              <label>Email</label>
              <input
                className="border-b bg-gray-200 border-gray-800 mr-2 mb-3"
                value={user.email}
              />
              <label>Phone Number</label>
              <input
                className="border-b bg-gray-200 border-gray-800 mr-2"
                value={user.phoneNumber}
              />
            </div>
            <div className="flex flex-col px-2 ">
              <label>Balance</label>
              <input
                className="border-b bg-gray-200 border-gray-800 mr-2"
                value={user.balance + "kr"}
              />
            </div>
          </form>
        </div>
        <div className="flex flex-col p-4">
          <button
            className="
                my-1 py-1 px-3 transition-colors bg-sidebarHover w-36
               hover:bg-sidebarBlue text-white rounded-full"
          >
            Edit
          </button>
          <button
            className="
                my-1 py-1 px-3 transition-colors bg-sidebarHover w-36
               hover:bg-sidebarBlue text-white rounded-full"
          >
            Delete
          </button>
          <button
            className="
                my-1 py-1 px-3 transition-colors bg-sidebarHover w-36
               hover:bg-sidebarBlue text-white rounded-full"
          >
            Logs
          </button>
        </div>
      </div>
    );
  };

  const users = () => {
    return userData
      .filter((item) => {
        if (filterPhrase === "") {
          return item;
        } else if (
          item.firstName.toLowerCase().includes(filterPhrase.toLowerCase())
        ) {
          return item;
        } else if (
          item.lastName.toLowerCase().includes(filterPhrase.toLowerCase())
        ) {
          return item;
        }
        return;
      })
      .map((item, index) => {
        return (
          <>
            <tr key={index} className="border-b text-base border-gray-400">
              <td className="py-3 px-6">{index}</td>
              <td className="py-3 px-6">{item.firstName}</td>
              <td className="py-3 px-6">{item.lastName}</td>
              <td className="py-3 px-6">{item.email}</td>
              <td className="py-3 px-6 w-2">
                <button
                  className="transition-transform"
                  style={{ transform: rotate(isOpen[item._id.$oid]) }}
                  onClick={() => {
                    handleClick(item._id.$oid);
                  }}
                >
                  <AiOutlineRight />
                </button>
              </td>
            </tr>
            {isOpen[item._id.$oid] ? (
              <td colspan="6">
                <div className="bg-gray-200 w-full border-b border-gray-400">
                  {customerData(item)}
                </div>
              </td>
            ) : (
              <div></div>
            )}
          </>
        );
      });
  };

  if (!userData) {
    return <div>Loading</div>;
  }

  return (
    <>
      <table className="w-full text-lg text-left content-between">
        <thead className=" bg-sidebarBlue text-gray-200">
          <tr>
            <th className="font-normal px-6">ID</th>
            <th className="font-normal px-6">First Name</th>
            <th className="font-normal px-6"> Last Name</th>
            {/* <th className="font-normal ">Current Position</th> */}
            <th className="font-normal px-6">Email</th>
            <th className="font-normal px-6">View</th>
          </tr>
        </thead>
        <tbody>{users()}</tbody>
      </table>
    </>
  );
};

export default CustomerList;
