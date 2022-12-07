import React from "react";
import { CityList, RegisterCityForm, Filterbar } from "../components";
import { useState } from "react";

const Cities = () => {
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
          <RegisterCityForm handleForm={handleForm} />
        </div>
      ) : (
        <div></div>
      )}
      <div
        style={{
          pointerEvents: overlay().click,
          filter: overlay().backdrop,
        }}
        className="flex flex-col w-full px-11 min-h-screen"
      >
        <div className="text-4xl font-semibold p-3">
          <h1>Cities</h1>
        </div>
        <div className="flex flex-row justify-between">
          <div className="py-3">
            <Filterbar
              filterPhrase={filterPhrase}
              setFilterPhrase={setFilterPhrase}
              placeholder={"Filter Cities"}
            />
          </div>
          <div>
            <button
              onClick={handleForm}
              className="py-2 px-3 transition-colors bg-sidebarHover hover:bg-sidebarBlue text-white rounded-full"
            >
              Register City
            </button>
          </div>
        </div>
        <div className="mt-6">
          <CityList filterPhrase={filterPhrase} />
        </div>
      </div>
    </>
  );
};

export default Cities;
