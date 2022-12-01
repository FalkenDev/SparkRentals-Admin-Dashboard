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

  addMarkers: function addMarkers(lonLatArray) {
    const iconStyle = new Style({
      image: new Icon({
        anchorXUnits: "fraction",
        anchorYUnits: "pixels",
        anchor: [0.5, 1],
        src: mapConfig.markerImage32,
      }),
    });
    const features = lonLatArray.map((item) => {
      let feature = new Feature({
        geometry: new Point(fromLonLat(item)),
      });
      feature.setStyle(iconStyle);
      return feature;
    });
    return features;
  },
};
export default maputils;
