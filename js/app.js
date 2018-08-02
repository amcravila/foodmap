function myMap() {
  var local = {lat: -23.5576413, lng: -46.6623001};
  var map = new google.maps.Map(
      document.getElementById('googleMap'), {zoom: 19, center: local});
  var marker = new google.maps.Marker({position: local, map: map});
}

$(document).ready(function() {

for (var v of restaurantes) {
  var newI = $("<img>");
  newI.addClass("img");
  newI.attr("src", v.image);
  $(".images").append(newI);
}


});
