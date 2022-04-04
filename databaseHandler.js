


var ordersRef = db.collection("orders")

var usersRef = db.collection("users")

var usersDeliveryRef = db.collection("delivery-users")

var orderDeliveryRef = db.collection("order-delivery")

navigator.geolocation.getCurrentPosition(getPosition)


this.orderDeliveryRef.onSnapshot(function (querySnapshot) {
    var users = [];

    querySnapshot.forEach(function (doc) {
        var data = doc.data()
        if(data.accepted == false) {
            let x = {docID:doc.id,data}
            users.push(x);
            setPopUpFromClient(x)
        }
        
    });

   // console.log("Somthing added: ", ...users);
});

var map = document.getElementById("map")


var mlat,mlong 

var i = 0

function setPopUpFromClient(order) {
   
    console.log(i);
    let userLat = order.data.lat

    let userLong = order.data.lg


    var customPopup = "<img src='client.png' width='90px'/><br/<br/><b>Name: </b><br/<br/><b>Order: </b><br/<br/><b>id: </b><br/<br/><br/<br/>&nbsp&nbsp&nbsp<button background='red'>Accepter</button>";
    var customOptions = { 'maxWidth': '500', 'className': 'custom' };
    var rennesicone = L.icon({
        iconUrl: 'client.png',
        iconSize: [30, 30]
    });

    L.marker([userLat, userLong], { icon: rennesicone }).bindPopup(customPopup, customOptions).addTo(map_init);

    L.Routing.control({
        waypoints: [
          L.latLng(mlat,mlong),
          L.latLng( order.data.lat, order.data.lg)
        ]
      }).addTo(map_init);
}


function getPosition(position) {


    mlat = position.coords.latitude
    mlong = position.coords.longitude

   

}

function getOrder(uid) {

    this.ordersRef.where("id", "==", uid)
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                console.log(doc.id, " => ", doc.data());
            });
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });
}





function updataDeliveryStatusToTrue(id) {
    this.usersDeliveryRef.doc(id).update({ available: true })
}


function updataDeliveryStatusToFlase(id) {
    this.usersDeliveryRef.doc(id).update({ available: false })
}



function addOrder(order) {
    this.usersDeliveryRef.add(order).then((snapshot) => {
        console.log("successfull")
    }).catch((error) => {
        console.error("Error removing document: ", error);
    });
}



function addUser(user) {

    this.usersDeliveryRef.doc(user.id).set(user).then((snapshot) => {
        console.log("successfull")
    }).catch((error) => {
        console.error("Error removing document: ", error);
    });
}



function deleteUser(id) {
    this.usersRef.doc(id).delete().then(() => {
        console.log("Document successfully deleted!: ", id);
    }).catch((error) => {
        console.error("Error removing document: ", error);
    });
}















