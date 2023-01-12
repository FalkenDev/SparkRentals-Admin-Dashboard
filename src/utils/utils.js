const utils = {
  /**
   * Returns color for each state
   * @param {string} state
   * @returns
   */
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

  /**
   * Translate zone reference name to a more readble state
   *
   * @param {string} name
   * @returns
   */
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

  /**
   * Returns objects with amount of zones
   * @param {object} selected
   * @returns zones
   */
  zoneCount: function zoneCount(selected) {
    let zones = {
      noParkingZone: 0,
      bonusParkingZone: 0,
      parkingZone: 0,
      chargingZone: 0,
      total: 0,
    };
    selected.map((item) => {
      zones[item.zoneType] += 1;
      zones["total"] += 1;
    });
    return zones;
  },
};

export default utils;
