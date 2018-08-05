//MAPA PRINCIPAL
function myMap() {
  var local = {lat: -23.5576413, lng: -46.6623001};
  var map = new google.maps.Map(
    document.getElementById('googleMap'), {zoom: 16, center: local});
  var marker = new google.maps.Marker({position: local, map: map});

  $.each(restaurantes, function(index, value) {
    var markerRest = new google.maps.Marker({position: new google.maps.LatLng(value.latitude, value.longitude), map: map});
  });
}

$(document).ready(function() {

//TELA INICIAL
  setTimeout(function() {
    $('#splashscreen').fadeOut(2000);
    $('#main').delay(2000).fadeIn('slow');
  }, 2000);

//FOTOS RESTAURANTES
  var names = [];
  // var images = [];
  var descriptions = [];
  var types = [];
  $.each(restaurantes, function(index, value) {
    names.push(value.name);
    // images.push(value.image);
    types.push(value.type.toUpperCase());
    descriptions.push(value.description);
    $(".images").append("<img src= " + value.image + " alt=''" + " class='image'" + " data-toggle='modal' data-target='#modalRest'>");
  });

//FILTRO RESTAURANTES
  $('#filter').click(function () {
    var inputValue = $('#restaurant-text').val().toLowerCase();

    $.each(restaurantes, function(index, value) {
      if (inputValue === value.type) {
        $('.images').fadeOut();
        $('.imagesFilter').append("<img src= " + "'" + value.image + "'" + " class='image'" + '>');
        $('#filter').prop('disabled', true);
      }
    });
  });

  $('#restaurant-text').on('input', function () {
    if($(this).val() === '') {
      for (var v of restaurantes) {
        $('.imagesFilter').remove();
        $('.images').fadeIn('slow');
        $('#filter').prop('disabled', false);
      };
    }
  })

//MODAL
  $(".launch-map").click(function () {
    var index = $(this).index();
      $("#modalTitle").append(names[index]);
      $("#typeModal").append("Tipo: " + types[index]);
      $('#descriptionModal').append("Descrição: " + descriptions[index]);
  });
  $('.close').click(function () {
    $('#modalTitle').html("");
    $('#typeModal').html("");
    $('#descriptionModal').html("");
  });

//MODAL Map
var center = new google.maps.LatLng(-23.5576413, -46.6623001);
var infowindow = new google.maps.InfoWindow();
function initialize() {

  var mapOptions = {
    zoom: 15,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    center: center
  };

  map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

$('.launch-map').click(function (e) {
  $('#modalMap').modal({
    backdrop: 'static',
    keyboard: false
  }).on('shown.bs.modal', function () {
    google.maps.event.trigger(map, 'resize');
    map.setCenter(center);
  });
  $.each(restaurantes, function(index, value) {
    var latLng = new google.maps.LatLng(value.latitude, value.longitude);
    var markerRest = new google.maps.Marker({position: latLng, map: map});
    return false;
  });
});

};

initialize();



});
