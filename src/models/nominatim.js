export default async function getCoordinates(address) {
  const urlEncodedAddress = encodeURIComponent(address);
  const url = "https://nominatim.openstreetmap.org/search.php?format=jsonv2&q=";
  const response = await fetch(`${url}${urlEncodedAddress}`);
  const result = await response.json();
  console.log(result);
  const coordinates = {
    latitude: parseFloat(result[0].lat),
    longitude: parseFloat(result[0].lon),
    type: result[0].type,
  };
  return coordinates;
}
