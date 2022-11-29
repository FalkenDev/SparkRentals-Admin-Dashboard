import React from "react";
import { useState } from "react";
import { ScooterList, Filterbar, RegisterScooterForm } from "../components";

const Scooters = () => {
  const [filterPhrase, setFilterPhrase] = useState("");
  const [displayForm, setDisplayForm] = useState(false);

  const handleForm = (event) => {
    event.preventDefault();
    if (displayForm) {
      setDisplayForm(false);
    } else {
      setDisplayForm(true);
    }
  };

  const overlay = () => {
    let state = { click: "auto", backdrop: "blur(0px)" };
    if (displayForm) {
      state = { click: "none", backdrop: "blur(4px)" };
    }
    return state;
  };

  return (
    <>
      {displayForm ? (
        <div
          className="absolute top-1/2 left-1/2 z-10
          transform -translate-x-1/2 -translate-y-1/2"
        >
          <RegisterScooterForm handleForm={handleForm} />
        </div>
      ) : (
        <div></div>
      )}

      <div
        style={{
          pointerEvents: overlay().click,
          filter: overlay().backdrop,
        }}
        className="flex flex-col w-full px-11"
      >
        <div className="text-4xl font-semibold p-3">
          <h1>Scooters</h1>
        </div>
        <div className="flex flex-row justify-between">
          <div className="py-3">
            <Filterbar
              filterPhrase={filterPhrase}
              setFilterPhrase={setFilterPhrase}
            />
          </div>
          <div>
            <button
              onClick={handleForm}
              className="py-2 px-3 transition-colors bg-sidebarHover hover:bg-sidebarBlue text-white rounded-full"
            >
              Register Scooter
            </button>
          </div>
        </div>
        <div className="mt-6">
          <ScooterList filterPhrase={filterPhrase} />
        </div>
      </div>
    </>
  );
};

export default Scooters;
