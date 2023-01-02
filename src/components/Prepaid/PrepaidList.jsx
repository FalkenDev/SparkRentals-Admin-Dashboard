import React, { useState } from "react";
import { AiOutlineRight, AiOutlineCheck, AiOutlineClose } from "react-icons/ai";

const PrepaidList = ({ prepaidData, filterPhrase }) => {
  const [isOpen, setIsOpen] = useState({});
  const [isDelete, setIsDelete] = useState({});

  const handleDeleteButton = (id) => {
    setIsDelete((prevState) => ({ ...prevState, [id]: !prevState[id] }));
  };

  const handleClick = (id) => {
    setIsOpen((prevState) => ({ ...prevState, [id]: !prevState[id] }));
  };
  const rotate = (bool) => {
    if (bool) {
      return "rotate(90deg)";
    }
    return "rotate(0deg)";
  };

  const prepaidInfo = (card) => {
    return (
      <div className="w-full flex justify-between">
        <div className="p-3">
          <div className="flex flex-row ">
            <div className="flex flex-col px-2">
              <h2>Code</h2>
              <p className="border-b bg-gray-200 border-gray-800 mr-2 mb-3 w-80">
                {card.code}
              </p>
              <h2>Amount</h2>
              <p className="border-b bg-gray-200 border-gray-800 mr-2 w-52">
                {card.amount}
              </p>
            </div>
            <div className="flex flex-col px-2">
              <h2>Total uses</h2>
              <p className="border-b bg-gray-200 border-gray-800 mr-2 mb-3 w-52">
                {card.totalUses}
              </p>
              <h2>Uses left</h2>
              <p className="border-b bg-gray-200 border-gray-800 mr-2 w-52">
                {card.usesLeft}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col p-4">
          <button
            // onClick={() => {
            //   handleForm();
            //   setLogData(card.history);
            // }}
            className="
                my-1 py-1 px-3 transition-colors bg-sidebarHover w-36
               hover:bg-sidebarBlue text-white rounded-full"
          >
            Logs
          </button>
          <button
            // onClick={() => {
            //   setSelectedcard(card);
            //   handleEditForm();
            // }}
            className="
                my-1 py-1 px-3 transition-colors bg-sidebarHover w-36
               hover:bg-sidebarBlue text-white rounded-full"
          >
            Edit
          </button>
          {isDelete[card._id] ? (
            <div>
              <p>Confirm deletion?</p>
              <div className="flex justify-evenly">
                <button
                  onClick={() => {
                    handleDeleteButton(card._id);
                    // handleRemoveAccount(card._id);
                  }}
                  className="
                my-1 p-1 text-2xl transition-colors bg-sidebarHover
               hover:bg-sidebarBlue text-white rounded-full"
                >
                  <AiOutlineCheck />
                </button>
                <button
                  onClick={() => {
                    handleDeleteButton(card._id);
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
                handleDeleteButton(card._id);
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

  const prepaids = () => {
    return prepaidData
      .filter((item) => {
        if (filterPhrase === "") {
          return item;
        } else if (
          item.code.toLowerCase().includes(filterPhrase.toLowerCase())
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
              <td className="py-3 px-6">{item.code}</td>
              <td className="py-3 px-6">{item.totalUses}</td>
              <td className="py-3 px-6">{item.usesLeft}</td>
              <td className="py-3 px-6">{item.amount}</td>
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
                  {prepaidInfo(item)}
                </div>
              </td>
            ) : (
              <div></div>
            )}
          </>
        );
      });
  };

  if (!prepaidData) {
    return <div>No prepaid cards</div>;
  }

  return (
    <>
      <table className="w-full text-lg text-left content-between">
        <thead className=" bg-sidebarBlue text-gray-200">
          <tr>
            <th className="font-normal px-6">ID</th>
            <th className="font-normal px-6">Code</th>
            <th className="font-normal px-6"> Total uses</th>
            <th className="font-normal px-6">Uses left</th>
            <th className="font-normal px-6">Amount</th>
            <th className="font-normal px-6">View</th>
          </tr>
        </thead>
        <tbody>{prepaids()}</tbody>
      </table>
    </>
  );
};

export default PrepaidList;
