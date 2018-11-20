$(function() {

  function calculateDistance(origin, destination) {
    var service = new google.maps.DistanceMatrixService();
    service.getDistanceMatrix(
    {
      origins: [origin],
      destinations: [destination],
      travelMode: google.maps.TravelMode.DRIVING,
      unitSystem: google.maps.UnitSystem.IMPERIAL,
      avoidHighways: false,
      avoidTolls: false
    }, callback);
  }

  function callback(response, status) {
    if (status != google.maps.DistanceMatrixStatus.OK) {
      $('#result').html(err);
    } else {
      var origin = response.originAddresses[0];
      var destination = response.destinationAddresses[0];
      if (response.rows[0].elements[0].status === "ZERO_RESULTS") {
        $('#result').html("Better get on a plane. There are no roads between " 
                          + origin + " and " + destination);
      } else {
        var distance = response.rows[0].elements[0].distance;
        var distance_value = distance.value;
        var distance_text = distance.text;
        var miles = distance_text.substring(0, distance_text.length - 3);
        $('#result').html("It is " + miles + " miles from " + origin + " to " + destination);
      }
    }
  }
    
  $('#distance_form').submit(function(e){
      event.preventDefault();
      var origin = $('#origin').val();
      var destination = $('#destination').val();
      var distance_text = calculateDistance(origin, destination);
  });
 
});
