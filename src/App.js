import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Dashboard, Map, Cities, Customers, Scooters, Login } from "./pages";
import { Sidebar } from "./components";

function App() {
  const [token, setToken] = useState(false);
  if (!token) {
    return <Login setToken={setToken} />;
  }
  return (
    <>
      <BrowserRouter>
        <div className="flex relative">
          <div>
            <Sidebar />
          </div>
          <Routes>
            {/* Dashboard */}
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            {/* The rest */}
            <Route path="/map" element={<Map />} />
            <Route path="/cities" element={<Cities />} />
            <Route path="/scooters" element={<Scooters />} />
            <Route path="/customers" element={<Customers />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
