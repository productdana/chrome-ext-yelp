$(document).ready(function(){
  extractData(yelpData.businesses);
  //console.log(yelpData.businesses);

//   getLocation();

//   var x = document.getElementById("ua");
// function getLocation() {
//   console.log("getLocation")
//     if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(showPosition);
//     } else {
//         x.innerHTML = "Unavailable.";
//     }
// }
// function showPosition(position) {
//     console.log("showPosition")

//     x.innerHTML = "Latitude: " + position.coords.latitude + 
//     "<br>Longitude: " + position.coords.longitude; 
// }




function extractData(yelp) {
  let arrayOfRestaurants = [];
    
    yelp.forEach((restaurant) => {
      let restaurantData = {};
      restaurantData["name"] = restaurant.name;
      restaurantData["addressArray"] = restaurant["location"]["address"];
      restaurantData["zipCode"] = restaurant["location"]["postal_code"];
      restaurantData["phone"] = restaurant.phone;
      restaurantData["rating"] = restaurant.rating;
      restaurantData['ratingURL'] = restaurant["rating_img_url"];
      restaurantData['reviewCount'] = restaurant["review_count"];
      restaurantData['image'] = restaurant["image_url"];
      restaurantData['URL'] = restaurant.url;
      restaurantData['categories'] = restaurant["categories"];

      arrayOfRestaurants.push(restaurantData);

      appendData(restaurantData);
      //console.log(restaurantData)
  });
      randomizer(arrayOfRestaurants);

};

  function appendData(obj) {
    let name = "<h3 id='name'>" + obj.name + "</h3>";
    // obj.addressArray[3] = obj.addressArray[3] || "";
    let address = obj.addressArray[0];
    let zipCode = obj.zipCode;
    let phone = obj.phone;
    let rating = obj.rating;
    let ratingStar = "<img src='" +obj.ratingURL+ "'>";
    let reviews = obj.reviewCount;
    let image = obj.image;
    let URL = "<a href='"+ obj.URL+ "'target='_blank'><img id='postimage' src='"+ image + "' height='100' width='100'></a>";
    let phoneformat = phone.slice(0,3) + "-" + phone.slice(3, 6) + "-" + phone.slice(6);
    let foodType = obj.categories[0][0];


    $('#output').append("<div class = 'container'><div class = 'left'><ul class = 'post'>" + URL + name + ratingStar + " <br>" +reviews + " reviews</div><div class = 'right'><span id = 'addressphone'>" + " " + address + " <br>phone: " + phoneformat  + "<br><br><br>" + foodType + "</span>" +"</ul></div></div><div class = 'clear'></div><hr>");

  }

//too much repeated code, need to refactor
  function randomizer(restaurant) {
    let randomIndex = Math.floor(Math.random() * restaurant.length);
    let obj = restaurant[randomIndex];

    let name = "<h3 id='name'>" + obj.name + "</h3>";
    let address = obj.addressArray[0];
    let zipCode = obj.zipCode;
    let phone = obj.phone;
    let rating = obj.rating;

    let ratingStar = "<img src='" +obj.ratingURL+ "'>";
    let reviews = obj.reviewCount;
    let image = obj.image;
    let URL = "<a href='"+ obj.URL+ "'target='_blank'><img src='"+ image + "' height='120' width='120'></a>";
    let phoneformat = phone.slice(0,3) + "-" + phone.slice(3, 6) + "-" + phone.slice(6);
    let foodType = obj.categories[0][0];

    let lastVisit;

    

    if (localStorage.getItem(`${obj.name}`)) {
      lastVisit = localStorage.getItem(`${obj.name}`);
    } else {
      lastVisit = "New";
    }


    $('#choice').html("<div class = 'container choice'><div class = 'left'><ul class = 'post'>" + URL + name + ratingStar + " <br>"+ reviews + " reviews</div><div class = 'right'><span id = 'addressphone'>" + " " + "Last suggested:  " + lastVisit + "<br><br>" + address + " <br>phone: " + phoneformat + "<br><br><br>" + foodType + "</span></ul></div></div><div class = 'clear'></div>");

      let date = new Date().toJSON().slice(0,10);
      let day = getDayName(date).slice(0,3);
      localStorage.setItem(`${obj.name}`, `${day + " " + date}`);
  }

  function getDayName(dateString) {
    return ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][new Date(dateString).getDay()];
  }



});