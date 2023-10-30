var gpaInput = document.getElementById("Street-address-2");
var autocomplete = new google.maps.places.Autocomplete(gpaInput);

// Listen for the place_changed event
autocomplete.addListener("place_changed", function () {
  var place = autocomplete.getPlace();

  // Now, 'place' contains detailed information about the selected place
  // Access various properties of the place object

  var formattedAddress = place.formatted_address; // The formatted address of the place
  var latitude = place.geometry.location.lat(); // The latitude of the place
  var longitude = place.geometry.location.lng(); // The longitude of the place
    var street = place.name;
  // Additional address components
  var locality = "";
  var administrativeAreaLevel1 = "";
  var country = "";
  var postalCode = "";

  // Loop through address components to find the desired fields
  place.address_components.forEach(function (component) {
    if (component.types.includes("locality")) {
      locality = component.long_name; // Locality
    } else if (component.types.includes("administrative_area_level_1")) {
      administrativeAreaLevel1 = component.long_name; // Administrative Area Level 1
    } else if (component.types.includes("country")) {
      country = component.long_name; // Country
    } else if (component.types.includes("postal_code")) {
      postalCode = component.long_name; // Postal Code
    }
  });

  console.log({
    "address": formattedAddress,
    "locality": locality,
    "administrativeAreaLevel1" : administrativeAreaLevel1,
    "country" : country,
    "postalCode" : postalCode

  })
  // Update your HTML elements with the relevant information
 // document.getElementById("formatted-address").value = formattedAddress;
 // document.getElementById("latitude").value = latitude;
 // document.getElementById("longitude").value = longitude;
 document.getElementById("Street-address-2").value = street;
  document.getElementById("City-2").value = locality;
  document.getElementById("Province-2").value = administrativeAreaLevel1;
  //document.getElementById("country").value = country;
  document.getElementById("Pincode").value = postalCode;
});
