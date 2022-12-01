const scooterutils = {
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
};

export default scooterutils;
