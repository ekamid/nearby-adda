class GeoDistanceCalculator {
  constructor(location1, location2, radius = 6371) {
    this.location1 = location1;
    this.location2 = location2;
    this.radius = radius;
  }

  // Convert degrees to radians
  toRadians(degrees) {
    return (degrees * Math.PI) / 180;
  }

  // Calculate the distance between two points using the Haversine formula
  distanceBetween() {
    const dLat = this.toRadians(
      this.location2.latitude - this.location1.latitude
    );
    const dLon = this.toRadians(
      this.location2.longitude - this.location1.longitude
    );
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRadians(this.location1.latitude)) *
        Math.cos(this.toRadians(this.location2.latitude)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = this.radius * c;
    return distance;
  }

  //check if  the distance is within the radius
  isNearby(radius) {
    const distance = this.distanceBetween();
    if (distance > radius) {
      return false;
    }

    return true;
  }
}

/* 
  uses of GeoDistanceCalculator 

    //Television Bhaban, Dhaka 1219, Bangladesh
    const location1 = {
      latitude: 23.765404,
      longitude: 90.422607,
    };

    const location2 = {
      latitude: 23.7820624,
      longitude: 90.41605270000002,
    };

    const calculator = new GeoDistanceCalculator(location1, location2);
    const distance = calculator.distanceBetween();
    const isNearby = calculator.isNearby(5);
    console.log(distance); // Output: 1.96KM
    console.log(isNearby); // Output: ture

*/

module.exports = {
  GeoDistanceCalculator,
};
