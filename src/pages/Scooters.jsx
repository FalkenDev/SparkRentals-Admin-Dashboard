import React from "react";
import { useState, useEffect } from "react";
import scooter from "../models/scooters";
import cities from "../models/cities";
import { ScooterList, Filterbar, RegisterScooterForm } from "../components";

const Scooters = () => {
  const [filterPhrase, setFilterPhrase] = useState("");
  const [displayForm, setDisplayForm] = useState(false);
  const [scooterData, setScooterData] = useState();
  const [cityNames, setCityNames] = useState();

  useEffect(() => {
    async function fetchData() {
      const res = await scooter.getScooters();
      const data = res.scooters;
      setScooterData(data);
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      const res = await cities.getCitiesOverview();
      const data = res.arrayOverview;
      let cityNames = [];
      data.forEach((e) => {
        cityNames.push(e.name);
      });
      setCityNames(cityNames);
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
          className="absolute top-1/2 left-1/2 z-10
          transform -translate-x-1/2 -translate-y-1/2"
        >
          <RegisterScooterForm
            handleForm={handleForm}
            scooterData={scooterData}
            setScooterData={setScooterData}
            cityNames={cityNames}
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
          <div className="py-5">
            <Filterbar
              filterPhrase={filterPhrase}
              setFilterPhrase={setFilterPhrase}
              placeholder={"Filter Scooters"}
            />
          </div>
          <div>
            {cityNames ? (
              <button
                onClick={handleForm}
                className="
                py-2 px-3 transition-colors bg-sidebarHover
                 hover:bg-sidebarBlue text-white rounded-full"
              >
                Register Scooter
              </button>
            ) : (
              <div>Please create a city first</div>
            )}
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
