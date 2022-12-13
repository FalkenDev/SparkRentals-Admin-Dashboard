import React from "react";
import { useState, useEffect } from "react";
import { AiOutlineRight, AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
const CustomerList = ({
  filterPhrase,
  userData,
  handleForm,
  setLogData,
  handleEditForm,
  setSelectedUser,
  handleRemoveAccount,
  selectedUser,
}) => {
  const [isOpen, setIsOpen] = useState({});
  const [isDelete, setIsDelete] = useState({});

  // useEffect(() => {
  //   handleForm();
  // }, [selectedUser]);

  const handleClick = (id) => {
    setIsOpen((prevState) => ({ ...prevState, [id]: !prevState[id] }));
  };

  const handleDeleteButton = (id) => {
    setIsDelete((prevState) => ({ ...prevState, [id]: !prevState[id] }));
  };

  const rotate = (bool) => {
    if (bool) {
      return "rotate(90deg)";
    }
    return "rotate(0deg)";
  };

  if (!userData) {
    return <div>Loading</div>;
  }

  const customerData = (user) => {
    return (
      <div className="w-full flex justify-between">
        <div className="p-3">
          <div className="flex flex-row ">
            <div className="flex flex-col px-2">
              <h2>First Name</h2>
              <p className="border-b bg-gray-200 border-gray-800 mr-2 mb-3 w-52">
                {user.firstName}
              </p>
              <h2>Last Name</h2>
              <p className="border-b bg-gray-200 border-gray-800 mr-2 w-52">
                {user.lastName}
              </p>
            </div>
            <div className="flex flex-col px-2">
              <h2>Email</h2>
              <p className="border-b bg-gray-200 border-gray-800 mr-2 mb-3 w-52">
                {user.email}
              </p>
              <h2>Phone Number</h2>
              <p className="border-b bg-gray-200 border-gray-800 mr-2 w-52">
                {user.phoneNumber}
              </p>
            </div>
            <div className="flex flex-col px-2 ">
              <h2>Balance</h2>
              <p className="border-b bg-gray-200 border-gray-800 w-52 mr-2">
                {user.balance + "kr"}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col p-4">
          <button
            onClick={() => {
              handleForm();
              setLogData(user.history);
            }}
            className="
                my-1 py-1 px-3 transition-colors bg-sidebarHover w-36
               hover:bg-sidebarBlue text-white rounded-full"
          >
            Logs
          </button>
          <button
            onClick={() => {
              setSelectedUser(user);
              handleEditForm();
            }}
            className="
                my-1 py-1 px-3 transition-colors bg-sidebarHover w-36
               hover:bg-sidebarBlue text-white rounded-full"
          >
            Edit
          </button>
          {isDelete[user._id] ? (
            <div>
              <p>Confirm deletion?</p>
              <div className="flex justify-evenly">
                <button
                  onClick={() => {
                    handleDeleteButton(user._id);
                    handleRemoveAccount(user._id);
                  }}
                  className="
                my-1 p-1 text-2xl transition-colors bg-sidebarHover
               hover:bg-sidebarBlue text-white rounded-full"
                >
                  <AiOutlineCheck />
                </button>
                <button
                  onClick={() => {
                    handleDeleteButton(user._id);
                  }}
                  className="
                my-1 p-1 text-2xl transition-colors bg-sidebarHover 
               hover:bg-sidebarBlue text-white rounded-full"
                >
                  <AiOutlineClose />
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => {
                handleDeleteButton(user._id);
              }}
              className="
                my-1 py-1 px-3 transition-colors bg-sidebarHover w-36
               hover:bg-sidebarBlue text-white rounded-full"
            >
              Delete
            </button>
          )}
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
                  style={{ transform: rotate(isOpen[item._id]) }}
                  onClick={() => {
                    handleClick(item._id);
                  }}
                >
                  <AiOutlineRight />
                </button>
              </td>
            </tr>
            {isOpen[item._id] ? (
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
