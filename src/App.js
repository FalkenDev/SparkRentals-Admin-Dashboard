import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  Dashboard,
  MapOverview,
  Cities,
  Customers,
  Scooters,
  Login,
  Settings,
  ScooterSelect,
  CitySelect,
  Zones,
} from "./pages";
import { Sidebar } from "./components";
import { useStateContext } from "./contexts/ContextProvider";
import { auth } from "./models/auth";

function App() {
  const { isLoggedIn, setIsLoggedIn } = useStateContext();

  useEffect(() => {
    setIsLoggedIn(auth.loggedIn());
  }, []);

  if (!isLoggedIn) {
    return <Login />;
  }

  return (
    <>
      <BrowserRouter>
        <div className="flex relative">
          <div className="relative min-w-80 w-80 mr-4 z-10">
            <Sidebar />
          </div>
          <Routes>
            {/* Dashboard */}
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            {/* The rest */}
            <Route path="/map" element={<MapOverview />} />
            <Route path="/cities" element={<Cities />} />
            <Route path="/scooters" element={<Scooters />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/settings" element={<Settings />} />

            <Route path="/scooters/select" element={<ScooterSelect />} />
            <Route path="/cities/select" element={<CitySelect />} />
            <Route path="/cities/select/zones" element={<Zones />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
