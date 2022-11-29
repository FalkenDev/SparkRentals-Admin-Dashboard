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
} from "./pages";
import { Sidebar } from "./components";
import { useStateContext } from "./contexts/ContextProvider";

function App() {
  const { isLoggedIn } = useStateContext();

  if (!isLoggedIn) {
    return <Login />;
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
            <Route path="/map" element={<MapOverview />} />
            <Route path="/cities" element={<Cities />} />
            <Route path="/scooters" element={<Scooters />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/settings" element={<Settings />} />

            <Route path="/scooters/select" element={<ScooterSelect />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
