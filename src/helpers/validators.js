function validateLatitudeLongitude(latitude, longitude) {
  // Regular expression to match latitude and longitude values in decimal format

  const latLongRegex =
    /^-?([1-8]?[1-9]|[1-9]0)\.{1}\d{1,6},\s?-?((1?[0-7]?|[1-9]?)[0-9]\.{1}\d{1,6}|180\.0{1,6})$/;

  if (!latitude || !longitude) {
    return false;
  }

  // if (!latLongRegex.test(`${latitude},${longitude}`)) {
  //   console.log("in regex");
  //   return false;
  // }

  if (latitude < -90 || latitude > 90) {
    console.log("in lat");

    return false;
  }

  if (longitude < -180 || longitude > 180) {
    console.log("in lng");

    return false;
  }

  return true;
}

module.exports = {
  validateLatitudeLongitude,
};
