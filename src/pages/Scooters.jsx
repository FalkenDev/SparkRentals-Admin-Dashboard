import React from "react";
import { useState, useEffect } from "react";
import scooter from "../models/scooters";
import { ScooterList, Filterbar, RegisterScooterForm } from "../components";

const Scooters = () => {
  const [filterPhrase, setFilterPhrase] = useState("");
  const [displayForm, setDisplayForm] = useState(false);
  const [scooterData, setScooterData] = useState();

  useEffect(() => {
    async function fetchData() {
      const res = await scooter.getScooters();
      const data = res.scooters;
      setScooterData(data);
    }
    fetchData();
  }, []);

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
    if (displayForm) {
      state = { click: "none", backdrop: "blur(4px)" };
    }
    return state;
  };

  return (
    <>
      {displayForm ? (
        <div
          className="absolute h-screen top-1/2 left-1/2 z-10
          transform -translate-x-1/2 -translate-y-1/2"
        >
          <RegisterScooterForm
            handleForm={handleForm}
            scooterData={scooterData}
            setScooterData={setScooterData}
          />
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
          <h1>Scooters</h1>
        </div>
        <div className="flex flex-row justify-between">
          <div className="py-3">
            <Filterbar
              filterPhrase={filterPhrase}
              setFilterPhrase={setFilterPhrase}
              placeholder={"Filter Scooters"}
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
        <div className="my-6">
          <ScooterList filterPhrase={filterPhrase} scooterData={scooterData} />
        </div>
      </div>
    </>
  );
};

export default Scooters;
