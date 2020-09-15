const $lat = document.getElementById("lat");
const $lng = document.getElementById("lng");
const $city = document.getElementById("city");
const $countrie = document.getElementById("countrie");

function initialize(){
  geocoder = new google.maps.Geocoder();
}

function reverseGeo(lat, lng) {
  console.log("geocoer running")
  var latlng = new google.maps.LatLng(lat, lng);
  geocoder.geocode({'latLng': latlng}, function(results, status) {
  console.log("lat,lng",latlng)
  if (status == google.maps.GeocoderStatus.OK) {
    if (results[1]) {
        for (var i=0; i<results[0].address_components.length; i++) {
          for (var b=0;b<results[0].address_components[i].types.length;b++) {
            if (results[0].address_components[i].types[b] == "administrative_area_level_1") {
                city = results[0].address_components[i];
                console.log(city)
                $city.value = city.long_name;
                break;
            }
            if (results[0].address_components[i].types[0] == "country") {
                countrie = results[0].address_components[i];
                console.log(countrie)
                $countrie.value = countrie.long_name;
                break;
            }
          }
        }
    } else {
      alert("No results found");
    }
  } else {
    alert("Geocoder failed due to: " + status);
  }
}); 
}

const localUser = () =>{
  return new Promise ((resolve,reject) =>{
      const sucessHandler = position => {
      const data = {
        lat: position.coords.latitude, 
        lng: position.coords.longitude,
      };
      resolve(data);
    };
    const errorHandler = error => {
      reject(error);
    };
    navigator.geolocation.getCurrentPosition(sucessHandler, errorHandler);
  });
}

localUser()
  .then(value => {
    $lat.value = value.lat;
    $lng.value = value.lng;
    reverseGeo(value.lat, value.lng);
  })
  .catch(error => {
    console.log(error);
  });

  

