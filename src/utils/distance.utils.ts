import { IDistance } from "../interfaces/distance";

export default function getDistance (requestUser : any, sendUser : any) {
  var deg2rad = function (deg: any) {
      return deg * (Math.PI / 180);
    },
    R = 6371,
    dLat = deg2rad(sendUser.lat - requestUser.lat),
    dLng = deg2rad(sendUser.lng - requestUser.lng),
    a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(requestUser.lat)) *
        Math.cos(deg2rad(requestUser.lat)) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2),
    c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return (R * c ).toFixed();
}
