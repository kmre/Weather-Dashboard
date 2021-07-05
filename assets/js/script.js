
    var srchBtn = document.querySelector("#srch-btn");
    var inBox = document.querySelector("#in-box");
    var deleteMessage = document.querySelector("#delete-message");
    var low = false;
    var mod = false;
    var high = false;
    var vH = false;
    var extreme = false;
    var color = "";


    $("#message").hide();
    window.addEventListener('DOMContentLoaded', displaySavedObj);

    //clear local storage when window is closed
    //window.onunload = () => {
       //localStorage.clear();
     //}

    deleteMessage.addEventListener("click", reset);
    srchBtn.addEventListener("click", inBoxCheck); //Made the fetch into its own fn

    function inBoxCheck(event) {
        event.preventDefault();
        var cityInput = inBox.value.trim();
        var cityLower = cityInput.toLowerCase();
        var lettersState = /^[a-zA-Z\s]+\,[a-zA-Z\s]+$/;
        var lettersCity = /^[a-zA-Z\s]+$/;
        //console.log(cityInput)
        if (cityInput && (cityLower.match(lettersState)||cityLower.match(lettersCity))) {
            messageBox(true);
            saveSearch(cityInput);
            weatherAPI(cityLower);
        }
        else { 
            messageBox(false);
        }
    };

    function messageBox(event) {
        //console.log(event);
        if (event === true) {
            $("#message").hide();  
        }
        else {
            $("#message").show();
        }
    };

    function reset() {
        messageBox(true);
    }

    function uvIndexCheck(uvIndex,index) {

        if (uvIndex > 0 && uvIndex <= 2) {
            low = true
            mod = false;
            high = false;
            vH = false;
            extreme = false;            
        }
        else if (uvIndex > 2 && uvIndex <= 5) {
            low = false
            mod = true;
            high = false;
            vH = false;
            extreme = false; 
        }
        else if (uvIndex > 5 && uvIndex <= 7) {
            low = false
            mod = false;
            high = true;
            vH = false;
            extreme = false;
        }
        else if (uvIndex > 7 && uvIndex <= 10) {
            low = false
            mod = false;
            high = false;
            vH = true;
            extreme = false;
        }
        else if (uvIndex > 10) {
            low = false
            mod = false;
            high = false;
            vH = false;
            extreme = true;
        }
        pColor(low, mod, high, vH, extreme, index);
    }

    function pColor(low, mod, high, vH, extreme, index) {
        
        if (low) {
            //console.log("green")  
            color = "green";  
        }
        else if (mod) {
            //console.log("yellow")
            color = "yellow";        
        }
        else if (high) {
            //console.log("orange")
            color = "orange"; 
        }
        else if (vH) {
            //console.log("Red")
            color = "red"; 
        }
        else if (extreme) {
            color = "purple"; 
        }
    }


    function saveSearch(cityInput) {
        var city = cityInput;
        var maxNumber = 10; 
        var stored_cities = "cities";
       // console.log(city);
        var srchCity = city;
        //console.log(srchCity);

        var storedCities = JSON.parse(localStorage.getItem(stored_cities)) ?? [];
        //console.log(storedCities)
       // console.log(!storedCities.length)

        if (!storedCities.length) {
            //save city
             //pushes new city to the array
             storedCities.push(srchCity);
             localStorage.setItem(stored_cities, JSON.stringify(storedCities));
             createBtn0(srchCity);

             if (!document.getElementById("button")) {
                deleteBtns();
             }
        }
        else {
            storedCities.push(srchCity);
            localStorage.setItem(stored_cities, JSON.stringify(storedCities));
            if (storedCities.length > maxNumber) {
                createBtnSplice(storedCities, stored_cities)
            }
            else {
            deleteBtns();
            storedCities.forEach((item) => {
                createBtn0(item);
            })
            }   
        }
    }
    function createBtn0(srchCity) {
        var btnContainer = document.getElementById("save-div-btn");
             var createBtn = document.createElement("button");
             $(createBtn).attr({"id":"button", "class":"city column"});
             btnContainer.appendChild(createBtn);
             var btnTxt = srchCity.toUpperCase();
             createBtn.innerHTML = btnTxt;
    }

    function createBtnSplice(storedCities, stored_cities) {
        //deletes top saved element if array > 10
        storedCities.splice(0,1);
        localStorage.setItem(stored_cities, JSON.stringify(storedCities));
        console.log(storedCities.length)
        deleteBtns();
        storedCities.forEach((item) => {
        var btnContainer = document.getElementById("save-div-btn");
        var createBtn = document.createElement("button");
        $(createBtn).attr({"id":"button","class":"city column"});
        btnContainer.appendChild(createBtn);
        var btnTxt = `${item}`.toUpperCase();
        createBtn.innerHTML = btnTxt; 
    })
    }

    function deleteBtns() {
        var btns = document.getElementById("save-div-btn")
        btns.remove();
        var container = document.getElementById("save-div")
        var createDiv = document.createElement("div");
             $(createDiv).attr({"id":"save-div-btn", "class":"container box columns"});
             container.appendChild(createDiv);
    }

    function displaySavedObj() {
        var stored_cities = "cities"
        var storedCities = JSON.parse(localStorage.getItem(stored_cities)) ?? [];
        if (storedCities.length) {
            storedCities.forEach((item) => {
                console.log(item)
                console.log(storedCities)
                var btnContainer = document.getElementById("save-div-btn");
                var createBtn = document.createElement("button");
                $(createBtn).attr({"id":"button","class":"city column"});
                btnContainer.appendChild(createBtn);
                var btnTxt = `${item}`.toUpperCase();
                createBtn.innerHTML = btnTxt; 
            })
        }
    }

  function weatherAPI(latitude, longitude) {
    var apiKey = "d7c30de99a3b40fb84ca75fd821b8b25";
    var urlWeatherApi = "https://api.weatherbit.io/v2.0/forecast/daily?&key=";

    // var lat = latitude;
    // var lon = longitude;
    var city = $(inBox).val();

    var daysDisplay = [6]; //max # of days to display
    var units = "I";

    // var url = urlWeatherApi + apiKey + "&lat=" + lat + "&lon=" + lon + 
    // "&days=" + daysDisplay + "&postal_code=" + zipCode + "&units=" + units;

    var url =  urlWeatherApi + apiKey + "&units=" + units + "&days=" + daysDisplay +
    "&city=" + city;

    fetch (url)
        .then(function(response) { //=> response.json())
                //console.log(response);
            if (response.statusText !== "No Content") {    
                response.json().then(function(data) {
                //console.log(data);
                    var allData = data;
                    dataForContainers(allData);
                });
            }
            else {
                messageBox(false);
            }
    })
}

    function dataForContainers(data) {
        //console.log(data)
        var dataArray = data.data;
        var containerDelete = document.getElementById("results-weather");
            containerDelete.remove();
        //console.log(dataArray)
        var mainContainerW = document.getElementById("results-main");
            var eventContainer = document.createElement("div");
            $(eventContainer).attr({"id": "results-weather", "class": "container"});
            mainContainerW.appendChild(eventContainer);

        var insideCnt2 = document.getElementById("results-weather");
            var insideC2 = document.createElement("div");
            $(insideC2).attr({"id": "results-weather2", "class": "container"});
            insideCnt2.appendChild(insideC2);
        var insideCnt22 = document.getElementById("results-weather");
            var insideC22 = document.createElement("div");
            $(insideC22).attr({"id": "results-weather22", "class": "container"});
            insideCnt22.appendChild(insideC22);

        var weatherCity = data.city_name;
        var weatherState = data.state_code;

               dataArray.forEach((value, index, array) => {
                    //main api variables by index
                    var weatherIndexed = dataArray[index];
                    var weathertemp = weatherIndexed.temp;
                    var tempIcon = weatherIndexed.weather.icon;
                    var icon = "https://www.weatherbit.io/static/img/icons/" + tempIcon + ".png"
                    var altImg = weatherIndexed.weather.description;
                    var humidity = weatherIndexed.rh;
                    var uvIndex = weatherIndexed.uv;
                    var windSpeed = weatherIndexed.wind_spd
                    //console.log("weather index " + index)
                    //console.log("city weather " + weathertemp)
                    //creates a container for each result
                    //looks for div with id results-main-w to append childs
                    if (index == 0) {
                        var getContainerW = document.getElementById("results-weather2");
                        //creates div for each day (currently set at 5) adds attribute id and appends
                        var subContainerCreateW = document.createElement("div");
                        $(subContainerCreateW).attr({"id": "results-w-day" + index, "class": "temp-div-box2 container box"});
                        getContainerW.appendChild(subContainerCreateW);
                        //creates <h3> to show text for current location and appends days from API
                        //var containerW = document.getElementById("results-w" + eventIndexW);
                        var hContainer = document.createElement("h2");
                        subContainerCreateW.appendChild(hContainer);
                        hContainer.innerHTML = "Today: " + `${weatherIndexed.datetime}` + "</br>";
                    
                        //creates <p> with id to append the results from the API
                        var pW = document.createElement("p");
                        //$(pW).attr({"id": "event-results-w" + index});
                        subContainerCreateW.appendChild(pW);
                        var nameTxt = "Temp "  + ": "+ weathertemp + " F" + " " + "</br>" + "City: " + `${weatherCity}` + 
                        ", " + `${weatherState}` + "</br>" + "Humidity: " + humidity + "%" + "</br>" +
                        "</br>" + "Wind Speed: " + windSpeed;
                        pW.innerHTML = nameTxt; 

                        uvIndexCheck(uvIndex);

                        var pW2 = document.createElement("p");
                        $(pW2).attr({"id": "color"+index, "class":color});
                        subContainerCreateW.appendChild(pW2);
                        var nameTxt2 = "UV Index: " + uvIndex;
                        pW2.innerHTML = nameTxt2;

                        

                        var imgContainer = document.createElement("img");
                        $(imgContainer).attr({"src":icon, "class":"icon", "alt":altImg});
                        subContainerCreateW.appendChild(imgContainer);
                        //console.log(index)
                        //console.log(icon)
                    }
                    else {

                        var getContainerW = document.getElementById("results-weather22");
                        //creates div for each day (currently set at 5) adds attribute id and appends
                        var subContainerCreateW = document.createElement("div");
                        $(subContainerCreateW).attr({"id": "results-w-day" + index, "class": "temp-div-box22 container box"});
                        getContainerW.appendChild(subContainerCreateW);
                        //creates <h3> to show text for current location and appends days from API
                        //var containerW = document.getElementById("results-w" + eventIndexW);
                        var hContainer = document.createElement("h3");
                        subContainerCreateW.appendChild(hContainer);
                        hContainer.innerHTML = "Day " + (index) + ": </br>" + `${weatherIndexed.datetime}` + "</br>";
                    
                        //creates <p> with id to append the results from the API
                        var pW = document.createElement("p");
                        //$(pW).attr({"id": "event-results-w" + index});
                        subContainerCreateW.appendChild(pW);
                        var nameTxt = "Temp "  + ": "+ weathertemp + " F" + " " + "</br>" + "City: " + `${weatherCity}` + 
                        ", " + `${weatherState}` + "</br>" + "Humidity: " + humidity + "%" + "</br>" + "Wind Speed: " + windSpeed;
                        pW.innerHTML = nameTxt; 

                        uvIndexCheck(uvIndex, index);
                        var pW2 = document.createElement("p");

                        $(pW2).attr({"id": "color"+index, "class":color});

                        subContainerCreateW.appendChild(pW2);
                        var nameTxt2 = "UV Index: " + uvIndex;
                        pW2.innerHTML = nameTxt2;

                        var imgContainer = document.createElement("img");
                        $(imgContainer).attr({"src":icon, "class":"icon", "alt":altImg});
                        subContainerCreateW.appendChild(imgContainer);
                       // console.log(index)
                        //console.log(icon)
                    }
            })
    }
