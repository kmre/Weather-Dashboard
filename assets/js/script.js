
var srchBtn = document.querySelector("#srch-btn");
var inBox = document.querySelector("#in-box");
var deleteMessage = document.querySelector("#delete-message");



$("#message").hide();


deleteMessage.addEventListener("click", deleteMessageBox)
srchBtn.addEventListener("click", inBoxCheck); //Made the fetch into its own fn

function deleteMessageBox(event) {
    event.preventDefault();
    $("#message").hide();
};

function inBoxCheck(event) {
    event.preventDefault();

    var cityInput = inBox.value.trim();

    if (cityInput) {
        weatherAPI(cityInput);
        $("#message").hide();
    }
    else {
        $("#message").show();
        return;
    }
};


  function weatherAPI(latitude, longitude) {
    var apiKey = "d7c30de99a3b40fb84ca75fd821b8b25";
    var urlWeatherApi = "https://api.weatherbit.io/v2.0/forecast/daily?&key=";

    // var lat = latitude;
    // var lon = longitude;
    var city = $(inBox).val();

    if (city == "") {
        error();
    }

    $("#message").hide();
   // document.getElementsByID("message")[0].style.visibility = "hidden";
    var daysDisplay = [5]; //max # of days to display
    var units = "I";

    // var url = urlWeatherApi + apiKey + "&lat=" + lat + "&lon=" + lon + 
    // "&days=" + daysDisplay + "&postal_code=" + zipCode + "&units=" + units;

    var url =  urlWeatherApi + apiKey + "&units=" + units + "&days=" + daysDisplay +
    "&city=" + city;
    

    // var mainContainerW = document.getElementById("results-main-w");
    // var eventContainer = document.createElement("div");
    // $(eventContainer).attr({"id": "results-w-event" + eventIndexW, "class": "temp-div-box"});
    // mainContainerW.appendChild(eventContainer);

      fetch (url)
        .then(response => response.json(console.log("response: " + response)))
            
        .then(data => {
         console.log("data: " + data)
          var dataArray = data['data'];

        
          dataArray.forEach((value, index, array) => {
            //main api variables by index
             var weatherIndexed = dataArray[index];
             var weathertemp = weatherIndexed.temp;
             var tempIcon = weatherIndexed.weather.icon;
             var icon = "https://www.weatherbit.io/static/img/icons/" + tempIcon + ".png"
             var altImg = weatherIndexed.weather.description;
            console.log("weather index " + index)
            console.log("city weather " + weathertemp)
            //creates a container for each result
            //looks for div with id results-main-w to append childs

            //   var mainContainerW = document.getElementById("results-w-event" + eventIndexW);
            //   console.log("weather event index " + eventIndexW)
            //    //creates div for each day (currently set at 3) adds attribute id and appends
            //    var subContainerCreateW = document.createElement("div");
            //    $(subContainerCreateW).attr({"id": "results-w-day" + index, "class": "temp-div-box"});
            //    mainContainerW.appendChild(subContainerCreateW);
               
            //    //creates <h3> to show text for current location and appends days from API
            //    //var containerW = document.getElementById("results-w" + eventIndexW);
            //    var hContainer = document.createElement("h3");
            //    subContainerCreateW.appendChild(hContainer);
            //    hContainer.innerHTML = "Weather for current location Day " + (index + 1) + ": " + `${weatherIndexed.datetime}` + "</br>";
               
            //    //creates <p> with id to append the results from the API
            //    var pW = document.createElement("p");
            //    //$(pW).attr({"id": "event-results-w" + index});
            //    subContainerCreateW.appendChild(pW);
            //    var nameTxt = "Temp "  + ": "+ weathertemp + " F" + " " + "</br>" + "City: " + `${weatherCity}` + 
            //    " ";
            //    pW.innerHTML = nameTxt; 
  
               //creates div for each image/day (currently set at 3) adds attribute id and appends
               //var imgContainerW = document.getElementById("results2-w" + index);
              //  var imgCreateW = document.createElement("div");
              //  $(imgCreateW).attr({"id": "img-w" + index, "class": "div-icon"});
              //  subContainerCreateW.appendChild(imgCreateW);
              
               //creates <img> to show current weather icon
              //  var imgW = document.getElementById("img-w" + eventIndexW);
            //    var imgContainer = document.createElement("img");
            //    $(imgContainer).attr({"src":icon, "class":"icon", "alt":altImg});
            //    subContainerCreateW.appendChild(imgContainer);
            //    console.log(index)
            //    console.log(icon)
              

          })
        })
  };

  function getLocation () {
    navigator.geolocation.getCurrentPosition((position) => {
      weatherAPI(position.coords.latitude, position.coords.longitude);
    });

  }