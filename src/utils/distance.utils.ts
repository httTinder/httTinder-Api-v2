import { IDistance } from "../interfaces/distance";

export default function getDistance (requestUser : any, sendUser : any) {
  const deg2rad = function (deg: any) {
      return deg * (Math.PI / 180);
    }
    const R = 6371
    const dLat = deg2rad(sendUser.lat - requestUser.lat)
    const dLng = deg2rad(sendUser.lng - requestUser.lng)
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(requestUser.lat)) *
        Math.cos(deg2rad(sendUser.lat)) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c
  return d.toFixed();
}
