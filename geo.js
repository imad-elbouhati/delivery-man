




var marker, circle, lat, long, accuracy;
var flag = false;
var apiKey = "AAPK0a1be173ddee44fe81551da1220975e7SJ4j4eTr57wVzpzA7MFdoDOOwf4ueDzAjsqZf459_Itqk224PsNdUMRxojtdzfK9"



var geocodeService = L.esri.Geocoding.geocodeService({
    apikey: apiKey // replace with your api key - https://developers.arcgis.com
});


var map = document.getElementById("map")

var map_init = L.map(map, {
    center: [34, -6],
    zoom: 5
});

var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map_init);

L.Control.geocoder().addTo(map_init);


function getCurrentPosition() {

    if (!navigator.geolocation) {
        console.log("Your browser doesn't support geolocation feature!");
    } else {

        navigator.geolocation.getCurrentPosition(getPosition)

    }
}





function getPosition(position) {


    lat = position.coords.latitude
    long = position.coords.longitude
    accuracy = position.coords.accuracy



    if (marker) {
        map_init.removeLayer(marker)
    }

    if (circle) {
        map_init.removeLayer(circle)
    }

    var popup = L.popup()
        .setContent(reverseGeoCoder(lat, long));


    if (!flag) {
        map_init.flyTo([lat, long], 18, {
            animate: true,
            duration: 2
        });
    }



    flag = true


    console.log(
        "Your coordinate is: Lat: " +
        lat +
        " Long: " +
        long +
        " Accuracy: " +
        accuracy
    );


}


function reverseGeoCoder(lat, long) {


    geocodeService.reverse().latlng([lat, long]).run(function (error, result) {
        if (error) {
            console.log(error)
            return;
        }

        L.marker(result.latlng).addTo(map_init).bindPopup(result.address.Match_addr).openPopup();
    });

}





function getAvailaibleDelivery() {

    this.usersDeliveryRef.where("available", "==", true)
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                var delivery = { id: doc.id, ...doc.data() }
                // val order = from dom

                let e = { accepted: false, order: { id: 1, name: "Pizza" }, lat: lat, lg: long }
                sendOrderToDelivery(e)
                return
            });
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });

}




function sendOrderToDelivery(order) {

    this.orderDeliveryRef.add(order).then((snapshot) => {
        console.log("successfull")
    }).catch((error) => {
        console.error("Error removing document: ", error);
    });
}



