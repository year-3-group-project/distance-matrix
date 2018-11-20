

const adAPIKey = "AIzaSyDNSBW4dXN_lKLR1zqqs0qlL94mSnkjqxo";

const location1 = {
  "angle": 90,
  "id": 2,
  "lat": 51.884256,
  "lng": -8.538715
}

const location2 = {
  "lat": 51.9095,
  "lng": -8.2589
}


const calculateDistanceCrowFlies = (loc1, loc2, unit) => {

  lat1 = loc1.lat;
  lon1 = loc1.lng;

  lat2 = loc2.lat;
  lon2 = loc2.lng;

  var radlat1 = Math.PI * lat1 / 180
  var radlat2 = Math.PI * lat2 / 180
  var radlon1 = Math.PI * lon1 / 180
  var radlon2 = Math.PI * lon2 / 180
  var theta = lon1 - lon2
  var radtheta = Math.PI * theta / 180
  var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
  dist = Math.acos(dist)
  dist = dist * 180 / Math.PI
  dist = dist * 60 * 1.1515
  if (unit == "K") { dist = dist * 1.609344 }
  if (unit == "N") { dist = dist * 0.8684 }
  return dist

}


const testCrowFlies = () => {
  console.log(location1);
  console.log(location2);


  theDistance = calculateDistanceCrowFlies(location1, location2, "K");

  console.log(`The distance is: ${theDistance} `);
}

testCrowFlies();

const gmtrx = (loc1, loc2) => {
  var geocoder = new google.maps.Geocoder;
  var service = new google.maps.DistanceMatrixService;
  service.getDistanceMatrix({
    origins: [loc1],
    destinations: [loc2],
    travelMode: 'DRIVING',
    unitSystem: google.maps.UnitSystem.METRIC,
    avoidHighways: false,
    avoidTolls: false
  }, function (response, status) {
    if (status !== 'OK') {
      alert('Error was: ' + status);
    } else {
      console.log(`The distance in meters is ${response.rows[0].elements[0].distance.value}`);
      console.log(`The time in seconds is ${response.rows[0].elements[0].duration.value}`);
      console.log(response);
      return response;
    }
  });
}

var roadDistanceObject = gmtrx(location1, location2);

console.log(roadDistanceObject);

