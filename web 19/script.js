let map;
let originMarker;
let destinationMarker;
var lat= 36.321038;
var lng = 59.537281;

async function read_data(json_file){
    let file = await fetch(json_file);
    let information = await file.text();
    cars = JSON.parse(information);    
}

function initMap() {
    read_data("img/taxi.png");
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: lat, lng: lng },
        zoom: 12,
    });

    map.addListener("click", (event) => {
        if (!originMarker) {
            originMarker = new google.maps.Marker({
                position: event.latLng,
                map: map,
                draggable: true,
                title: "Origin",
            });
            document.getElementById("originText").innerText = "Now choose your destination";
            document.getElementById("originText").style.display = "none";
            document.getElementById("destinationText").style.display = "block";
            originMarker.addListener("click", () => {
                // Remove destination marker if it exists
                if (destinationMarker) {
                    destinationMarker.setMap(null);
                    destinationMarker = null;
                    document.getElementById("distance").innerText = "";
                    document.getElementById("fare").innerText = "";
                }
            });
        } else if (!destinationMarker) {
            destinationMarker = new google.maps.Marker({
                position: event.latLng,
                map: map,
                draggable: true,
                title: "Destination",
            });
            calculateDistanceAndFare(); // Call the function here
        }
    });
    displayCars();
}


function displayCars(){ 
    if (cars && cars.length >= 3) {
        console.log(cars);
        var car1 = new google.maps.LatLng(cars[0].lat, cars[0].lng);
        var car2 = new google.maps.LatLng(cars[1].lat, cars[1].lng);
        var car3 = new google.maps.LatLng(cars[2].lat, cars[2].lng);

        var car_img_1 = new google.maps.Marker({   
            position: car1,
            draggable: false,
            icon:'img/taxi.png',
            map: map
        });
        
        var car_img_2 = new google.maps.Marker({   
            position: car2,
            draggable: false,
            icon:'img/taxi.png',
            map: map
        });
        
        var car_img_3 = new google.maps.Marker({   
            position: car3,
            draggable: false,
            icon:'img/taxi.png',
            map: map
        });
    } else {
        console.error("Error: The 'cars' array is undefined or has fewer than 3 elements.");
    }
}
function calculate_distance(start, end) {
    const earthRadiusKm = 6371;
    const lat1 = start.lat() * Math.PI / 180; 
    const lon1 = start.lng() * Math.PI / 180; 
    const lat2 = end.lat() * Math.PI / 180; 
    const lon2 = end.lng() * Math.PI / 180; 
    const dLat = lat2 - lat1; 
    const dLon = lon2 - lon1; 
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1) * Math.cos(lat2) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = earthRadiusKm * c; // Distance in kilometers

    return distance;
}

function calculateDistanceAndFare() {
    if (originMarker && destinationMarker) {
        const origin = originMarker.getPosition();
        const destination = destinationMarker.getPosition();
        // const distance = google.maps.geometry.spherical.computeDistanceBetween(origin, destination) / 1000; // in kilometers
        const distance = calculate_distance(origin,destination);
        // const fare = calculateFare(distance);
        const fare = Math.round(distance * 2);
        document.getElementById("distance").innerText = `Distance: ${distance.toFixed(2)} km`;
        document.getElementById("fare").innerText = `Fare: $${fare}`;
    }
}

function calculateFare(distance) {
    // Your fare calculation logic goes here
    // For example, let's assume the fare is $2 per kilometer
    return distance * 2;
}

document.getElementById("originText").addEventListener("click", () => {
    document.getElementById("originText").innerText = "Click to set your origin";
    document.getElementById("originText").style.display = "none";
    document.getElementById("destinationText").style.display = "block";
});

document.getElementById("destinationText").addEventListener("click", () => {
    document.getElementById("originText").innerText = "Click to set your origin";
    document.getElementById("originText").style.display = "block";
    document.getElementById("destinationText").style.display = "none";
});
