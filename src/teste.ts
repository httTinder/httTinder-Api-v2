import getDistance from "./utils/distance.utils";

const userFind = "-90.00001/0.00000";

const allUsers = "-90.00000/-90.00000";

const requestUserlocation = {
  lat: Number(userFind?.split("/")[0]),
  lng: Number(userFind?.split("/")[1]),
};

const sendUserLocation = {
  lat: Number(allUsers?.split("/")[0]),
  lng: Number(allUsers?.split("/")[1]),
};

const distance = Number(getDistance(requestUserlocation, sendUserLocation));

console.log(distance)