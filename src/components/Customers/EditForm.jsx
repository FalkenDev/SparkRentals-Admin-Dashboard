import React from "react";
import { customerEdit } from "../../data/data";
import { GrClose } from "react-icons/gr";
import users from "../../models/users";
const EditForm = ({
  handleEditForm,
  selectedUser,
  setSelectedUser,
  handleAccountEdit,
}) => {
  const handleEdit = (val, field) => {
    setSelectedUser({ ...selectedUser, [field]: val });
  };

  const formList = () => {
    return customerEdit.map((item, index) => {
      return (
        <div key={index}>
          <label>{item.label}</label>
          <input
            onChange={(e) => {
              handleEdit(e.target.value, item.data);
            }}
            type={item.type}
            value={selectedUser[item.data]}
            className="bg-gray-50 border border-gray-300 text-gray-900
                        text-sm rounded-lg block p-2.5 w-72"
          />
        </div>
      );
    });
  };
  return (
    <div className="py-2 px-3 bg-white rounded-xl shadow-md">
      <button className="py-1" onClick={() => handleEditForm()}>
        <GrClose />
      </button>
      <h1 className="text-xl text-center pb-3">Edit Details</h1>
      <form>{formList()}</form>
      <div className="text-center pt-9 pb-3">
        <button
          onClick={(e) => {
            e.preventDefault();
            handleAccountEdit();
          }}
          className="py-2 px-4 transition-colors bg-sidebarHover
              hover:bg-sidebarBlue text-white rounded-full"
        >
          Confirm Changes
        </button>
      </div>
    </div>
  );
};

export default EditForm;
