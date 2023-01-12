import React, { useEffect, useState } from "react";
import {
  PrepaidList,
  PrepaidUses,
  Filterbar,
  PrepaidForm,
  PrepaidEdit,
} from "../components";
import prepaid from "../models/prepaid";
const Prepaid = () => {
  const [prepaidData, setPrepaidData] = useState();
  const [filterPhrase, setFilterPhrase] = useState("");
  const [displayForm, setDisplayForm] = useState(false);
  const [editForm, setEditForm] = useState(false);
  const [logForm, setLogForm] = useState(false);
  const [selectedCard, setSelectedCard] = useState();
  const [logData, setLogData] = useState();

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const res = await prepaid.getPrePaid();
    const data = res.prepaids;
    setPrepaidData(data);
  }

  const handleAddCard = async (newCard) => {
    await prepaid.addPrepaid(newCard);
    await fetchData();
  };

  const handleForm = () => {
    //event.preventDefault();
    if (displayForm) {
      setDisplayForm(false);
    } else {
      setDisplayForm(true);
    }
  };

  const handleEditForm = () => {
    if (editForm) {
      setEditForm(false);
    } else {
      setEditForm(true);
    }
  };

  const handleLogForm = (card) => {
    setSelectedCard(card);
    if (logForm) {
      setLogForm(false);
    } else {
      setLogForm(true);
    }
  };

  const handleEditCard = async (card) => {
    await prepaid.editPrepaid(card);
    await fetchData();
  };

  const handleRemoveCard = async (id) => {
    await prepaid.removePrepaid(id);
    await fetchData();
  };

  const overlay = () => {
    let state = { click: "auto", backdrop: "blur(0px)" };
    if (displayForm || editForm || logForm) {
      state = { click: "none", backdrop: "blur(4px)" };
    }
    return state;
  };

  return (
    <>
      {editForm ? (
        <div
          className="fixed top-1/2 left-1/2 z-10
        transform -translate-x-1/2 -translate-y-1/2"
        >
          <PrepaidEdit
            handleEditForm={handleEditForm}
            selected={selectedCard}
            handleEditCard={handleEditCard}
          />
        </div>
      ) : null}
      {logForm ? (
        <div
          className="fixed top-1/2 left-1/2 z-10
        transform -translate-x-1/2 -translate-y-1/2"
        >
          <PrepaidUses handleForm={handleLogForm} logData={logData} />
        </div>
      ) : null}
      {displayForm ? (
        <div
          className="fixed top-1/2 left-1/2 z-10
          transform -translate-x-1/2 -translate-y-1/2"
        >
          <PrepaidForm handleForm={handleForm} handleAddCard={handleAddCard} />
        </div>
      ) : null}
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
              Create Prepaid
            </button>
          </div>
        </div>
        <div className="mt-5">
          <PrepaidList
            setLogData={setLogData}
            prepaidData={prepaidData}
            filterPhrase={filterPhrase}
            handleRemoveCard={handleRemoveCard}
            setSelectedCard={setSelectedCard}
            handleEditForm={handleEditForm}
            handleLogForm={handleLogForm}
          />
        </div>
      </div>
    </>
  );
};

export default Prepaid;
