import {Route, Routes} from "react-router-dom";
//import {   } from "./index";
import { Dashboard, Map, Cities, Customers, Scooters } from "./pages";
import { Sidebar } from "./components"

function App() {
  return (
    <>
      <div className="font-bold">
        <p>ADMIN DASHBOARD</p>
      </div>
      <div>
        <Sidebar/>
      </div>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/map" element={<Map />}/>
        <Route path="/cities" element={<Cities />}/>
        <Route path="/scooters" element={<Scooters />}/>
        <Route path="/customers" element={<Customers />}/>
      </Routes>
    </>
  );
}

export default App;
