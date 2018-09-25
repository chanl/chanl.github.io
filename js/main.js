// Shorthand for $( document ).ready()
$(function() {
    console.log( "ready!" );



function initMap() {
	var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 40.8054491, lng: -73.9654415},
    zoom: 17,
    scrollwheel: false

  });

  var marker = new google.maps.Marker({
    position: {lat: 40.8054491, lng: -73.9654415},
    map: map,
    title: 'Monks Café'
  });
}

initMap();

$(document).ready(function() {
 
  $('#reservation').submit(function(e) {
    e.preventDefault();
    var name = $('#name').val();
    var day = $('#day').val();

 
    $(".error").remove();
 
    if (name.length < 1) {
      $('#name').after('<span class="error">This field is required</span>');
    }
    if (day.length < 1) {
      $('#day').after('<span class="error">This field is required</span>');
    }
 
  });
 
});

// Initialize Firebase
  var config = {
    apiKey: "AIzaSyAVkwvAUwDvBNB4drFXHxzO_d-H2I68zIs",
    authDomain: "reservation-site-55d2f.firebaseapp.com",
    databaseURL: "https://reservation-site-55d2f.firebaseio.com",
    projectId: "reservation-site-55d2f",
    storageBucket: "reservation-site-55d2f.appspot.com",
    messagingSenderId: "582097544556"
  };
  firebase.initializeApp(config);

var database = firebase.database();

// create reservationData object which will be populated with User Input
var reservationData = {};

// set the day when an option is clicked on
// set the day when an option is clicked on
//$('.reservation-day').on('click', function() {
//  reservationData.day = $(this).text();
//});
// when submitted, the name data should be set
// and all data should be sent to your database
$('.reservation-form').on('submit', function(e) {
  e.preventDefault();
  // get date from input
  reservationData.day = $('.reservation-day').val();

// get name from input
  reservationData.name = $('.reservation-name').val();

  // push configured data object to database
  database.ref('reservations').push(reservationData);
});


// on initial load and addition of each reservation update the view
database.ref('reservations').on('child_added', function(snapshot) {
  // grab element to hook to
  var reservationList = $('.reservation-list');
  // get data from database
  var reservations = snapshot.val();
  // get your template from your script tag
  var source   = $("#reservation-template").html();
  // compile template
  var template = Handlebars.compile(source);
  // pass data to template to be evaluated within handlebars
  // as the template is created
  var reservationTemplate = template(reservations);
  // append created templated
  reservationList.append(reservationTemplate);
});

// when page loads, get reservations
getReservations();

// Click event to delete reservations

  // find comment whose objectId is equal to the id we're searching with
$('.reservations').on('click', '.delete', function (e) {
  // Get the ID for the comment we want to update
  var id = $(e.target).parent().data('id');

  // find comment whose objectId is equal to the id we're searching with
  var resReference = database.ref('reservations/' + id);


  // Use remove method to remove the comment from the database
  resReference.remove();
});

// get current time and day and compare it with hours of operation
//var currentDay = getDay();
//var currentHours = getHours();

//console.log(currentDay);
//console.log(currentHours)

//if (currentDay == 1|| currentDay == 2|| currentDay == 3) && (currentHours <= 7 && currentHours >= 1) {
//  $(".operation").html("Closed");
//} else {
//  $(".operation").html("Open");
//}
});