import React, { useEffect, useState } from "react";
import scooter from "../models/scooters";
import users from "../models/users";
import cities from "../models/cities";
import { Databox, DataLists } from "../components";
const Dashboard = () => {
  const [data, setData] = useState({
    totalScooters: 0,
    liveScooters: 0,
    chargingScooters: 0,
    maintenceScooters: 0,
    totalUsers: 0,
    activeUsers: 0,
    totalAreas: 0,
    totalParkingZones: 0,
    totalBonus: 0,
    totalNoParking: 0,
  });

  useEffect(() => {
    fetchData();
  }, []);

  const counter = (data, prop, type) => {
    let count = 0;
    data.forEach((element) => {
      if (element[type] === prop) {
        count++;
      }
    });
    return count;
  };

  const areaCounter = (data, prop, type, type2) => {
    let count = 0;
    data.forEach((element) => {
      element[type].forEach((e) => {
        if (e[type2] === prop) {
          count++;
        }
      });
    });
    return count;
  };

  async function fetchData() {
    const scooterOverview = await scooter.getScootersOverview();
    const scooterData = scooterOverview.scootersOverview;
    const usersOverview = await users.getUsers();
    const userData = usersOverview.users;
    const citiesOverview = await cities.getCities();
    const cityData = citiesOverview.cities;
    const liveScooters = counter(scooterData, "In use", "status");
    const chargeScooters = counter(scooterData, "Unavailable", "status");
    const maintenanceScooter = counter(scooterData, "Maintenance", "status");
    const parkingZones = areaCounter(
      cityData,
      "parkingZone",
      "zones",
      "zoneType"
    );
    const bonusZone = areaCounter(
      cityData,
      "bonusParkingZone",
      "zones",
      "zoneType"
    );
    const noPark = areaCounter(cityData, "noParkingZone", "zones", "zoneType");
    setData({
      totalScooters: scooterData.length,
      liveScooters: liveScooters,
      chargingScooters: chargeScooters,
      maintenceScooters: maintenanceScooter,
      totalUsers: userData.length,
      activeUsers: userData.length,
      totalAreas: cityData.length,
      totalParkingZones: parkingZones,
      totalBonus: bonusZone,
      totalNoParking: noPark,
    });
  }
  return (
    <div className="w-full px-5">
      <h1 className="text-xl font-semibold py-2">Dashboard</h1>
      <div className="w-full flex justify-center relative ">
        <Databox data={data} />
      </div>
      <div>
        <DataLists data={data} />
      </div>
    </div>
  );
};

export default Dashboard;
