import React, { useEffect, useState } from "react";
import {
  PrepaidList,
  PrepaidUses,
  Filterbar,
  PrepaidForm,
} from "../components";
import prepaid from "../models/prepaid";
const Prepaid = () => {
  const [prepaidData, setPrepaidData] = useState();
  const [filterPhrase, setFilterPhrase] = useState("");
  const [displayForm, setDisplayForm] = useState(false);
  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const res = await prepaid.getPrePaid();
    console.log(res);
    const data = res.prepaids;
    setPrepaidData(data);
  }

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
          className="fixed top-1/2 left-1/2 z-10
          transform -translate-x-1/2 -translate-y-1/2"
        >
          <PrepaidForm handleForm={handleForm} />
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
          <h1>Prepaid Cards</h1>
        </div>
        <div className="flex flex-row justify-between">
          <div className="py-3">
            <Filterbar
              filterPhrase={filterPhrase}
              setFilterPhrase={setFilterPhrase}
              placeholder={"Filter Cards"}
            />
          </div>
          <div>
            <button
              onClick={handleForm}
              className="
                py-2 px-3 transition-colors bg-sidebarHover
                 hover:bg-sidebarBlue text-white rounded-full"
            >
              Register Prepaid
            </button>
          </div>
        </div>
        <div className="mt-5">
          <PrepaidList prepaidData={prepaidData} filterPhrase={filterPhrase} />
        </div>
      </div>
    </>
  );
};

export default Prepaid;
