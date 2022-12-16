import React from "react";
import { GrClose } from "react-icons/gr";
import { prepaidEdit } from "../../data/data";
const PrepaidForm = ({ handleForm }) => {
  const prepaidFormData = () => {
    return prepaidEdit.map((item, index) => {
      return (
        <div key={index}>
          <label>{item.label}</label>
          <input
            // onChange={(e) => {
            //   handleEdit(e.target.value, item.data);
            // }}
            type={item.type}
            className="bg-gray-50 border border-gray-300 text-gray-900
                        text-sm rounded-lg block p-2.5 w-72"
          />
        </div>
      );
    });
  };

  return (
    <div className="py-2 px-3 bg-white rounded-xl shadow-md">
      <button className="py-1" onClick={() => handleForm()}>
        <GrClose />
      </button>
      <h1 className="text-xl text-center pb-3">Create Prepaid</h1>
      <form>{prepaidFormData()}</form>
      <div className="text-center pt-9 pb-3">
        <button
          onClick={(e) => {
            // e.preventDefault();
            // handleAccountEdit();
          }}
          className="py-2 px-4 transition-colors bg-sidebarHover
              hover:bg-sidebarBlue text-white rounded-full"
        >
          Create
        </button>
      </div>
    </div>
  );
};

export default PrepaidForm;
