import { fromLonLat } from "ol/proj";
import mapConfig from "../config/config.json";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import { Style, Icon } from "ol/style";

const maputils = {
  createMarkerArray: function createMarkerArray(scooters) {
    let Arr = [];
    scooters.map((item) => {
      let coords = [item.coordinates.longitude, item.coordinates.latitude];
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
