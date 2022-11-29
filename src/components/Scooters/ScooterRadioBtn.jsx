import React from "react";

const ScooterRadioBtn = () => {
  return (
    <form className="flex flex-row justify-evenly my-4" id="scootermode">
      <div className="py-3">
        <input
          id="rb1"
          type="radio"
          name="scootermode"
          className="peer hidden"
        />
        <label
          for="rb1"
          className="peer-checked:bg-violet-700 px-4 py-3 rounded-xl
                text-white bg-blue-900 transition-colors"
        >
          Available
        </label>
      </div>
      <div className="py-3">
        <input
          id="rb2"
          type="radio"
          name="scootermode"
          className="peer hidden"
        />
        <label
          for="rb2"
          className="peer-checked:bg-violet-700 px-4 py-3 rounded-xl
                  text-white bg-blue-900 transition-colors"
        >
          Maintenace
        </label>
      </div>
      <div className="py-3">
        <input
          id="rb3"
          type="radio"
          name="scootermode"
          className="peer hidden"
        />
        <label
          for="rb3"
          className="peer-checked:bg-violet-700 px-4 py-3 rounded-xl
                  text-white bg-blue-900 transition-colors"
        >
          Deactivate
        </label>
      </div>
      <div className="py-3">
        <input
          id="rb4"
          type="radio"
          name="scootermode"
          className="peer hidden"
        />
        <label
          for="rb4"
          className="peer-checked:bg-violet-700 px-4 py-3 rounded-xl
                  text-white bg-blue-900 transition-colors"
        >
          Charging
        </label>
      </div>
    </form>
  );
};

export default ScooterRadioBtn;
