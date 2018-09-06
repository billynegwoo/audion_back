module.exports = {
  haversine: (origin, destination) => {
    const R = 6371e3; // metres
    const phi1 = origin.lat * (Math.PI / 180);
    const phi2 = destination.lat * (Math.PI / 180);
    const deltaPhi = (destination.lat - origin.lat) * (Math.PI / 180);
    const deltaLambda = (destination.lng - origin.lon) * (Math.PI / 180);

    const a = Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2)
      + Math.cos(phi1) * Math.cos(phi2)
      * Math.sin(deltaLambda / 2) * Math.sin(deltaLambda / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  },
};
