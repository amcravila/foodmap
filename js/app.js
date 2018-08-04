function myMap() {
  var local = {lat: -23.5576413, lng: -46.6623001};
  var map = new google.maps.Map(
      document.getElementById('googleMap'), {zoom: 19, center: local});
  var marker = new google.maps.Marker({position: local, map: map});
}

$(document).ready(function() {

//TELA INICIAL
  setTimeout(function() {
    $('#splashscreen').fadeOut(2000);
    $('#main').delay(2000).fadeIn('slow');
  }, 2000);

//FOTOS RESTAURANTES
  $.each(restaurantes, function(index, value) {
    var newI = $('<img>');
    newI.addClass('img');
    newI.attr('src', value.image);
    $('.images').append(newI);
  });

//FILTRO RESTAURANTES
  $('#filter').click(function () {
    var inputValue = $('#restaurant-type').val().toLowerCase();

    $.each(restaurantes, function(index, value) {
      if (value.type !== inputValue) {
        $('.images').fadeOut();
      }
    });


    var filterResult = restaurantes.filter(function(value) {
      if (inputValue === value.type) {
        return value;
      }
    });

    var returnImg = filterResult.map(function(value) {
    return value.image;
    });
    console.log(returnImg);

    $.each(returnImg, function(index, value) {
      console.log(value);
      var newI = $('<img>');
      newI.addClass('img');
      newI.attr('src', value);
      console.log(newI);
      $('.imagesFilter').append(newI);
      $('.imagesFilter').fadeIn();
    });
  });





  $('#restaurant-type').on('input', function () {
    if($(this).val() === '') {
      for (var v of restaurantes) {
        $('.imagesFilter').fadeOut();
        $('.images').fadeIn('slow');
      };
    }
  })


});
