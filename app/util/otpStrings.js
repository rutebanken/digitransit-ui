// Convert between location objects (address, lat, lon)
// and string format OpenTripPlanner uses in many places


export const otpToLocation = (otpString) => {
  const [address, extension1, extension2] = otpString.split('::');
  const coords = extension2 || extension1;
  const gtfsId = extension2 ? extension1 : undefined;

  if (coords) {
    return ({
      address,
      lat: parseFloat(coords.split(',')[0]),
      lon: parseFloat(coords.split(',')[1]),
      gtfsId,
    });
  }
  return { address };
};

export const locationToOTP = location => `${location.address}::${location.lat},${location.lon}`;

export const locationToOtpGtfs = (location) => {
  if (location.gtfsId) {
    return `${location.address}::${location.gtfsId}::${location.lat},${location.lon}`;
  }
  return locationToOTP(location);
};

export const locationToSearch = (location) => {
  const [address, point] = location.split('::');
  return `${address}::${point}`;
};

export const locationToCoords = location => [location.lat, location.lon];
