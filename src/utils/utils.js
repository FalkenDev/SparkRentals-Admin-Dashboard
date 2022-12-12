const utils = {
  sateColor: function stateColor(state) {
    switch (state) {
      case "Available":
        return "#22c55e";
      case "Unavailable":
        return "#dc2626";
      case "Off":
        return "#94a3b8";
      case "In use":
        return "#facc15";
      case "Maintenance":
        return "#ea580c";
    }
  },

  zoneNameTranslate: function zoneNameTranslate(name) {
    switch (name) {
      case "noParkingZone":
        return "No Parking Zone";
      case "bonusParkingZone":
        return "Bonus Parking Zone";
      case "parkingZone":
        return "Parking Zone";
      case "chargingZone":
        return "Charging Zone";
    }
  },
};

export default utils;
