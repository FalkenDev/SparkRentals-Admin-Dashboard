import mapConfig from "../config/config.json";

const maputils = {
  createMarkerArray: function createMarkerArray(scooters) {
    let Arr = [];
    scooters.map((item) => {
      let coords = [item.coordinates.latitude, item.coordinates.longitude];
      Arr.push(coords);
    });
    return Arr;
  },
};
export default maputils;
