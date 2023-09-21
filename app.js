//varibles
const APIKEY = 'e225d4010e2142eea5d115529230709';
let weatData;
let currentLocation;

//selectors
    //header
const search = document.querySelector('.search');
const searchBtn = document.querySelector('.searchbtn');
const searchContainer = document.querySelector(".searchContainer");
const searchErrorMessage = document.querySelector(".errorMessage");
    //sec-1
const secOneLocation = document.querySelector(".location");
const secOnetime = document.querySelector('.time');
const secOneMainTemp = document.querySelector(".temp");
const secOneDescription = document.querySelector(".weather-des");
const secOneHighTemp = document.querySelector(".day-high");
const secOneLowTemp = document.querySelector(".night-low");
const secOneWeatherIcon = document.querySelector(".weather-icon");
const secOneFeelsLike = document.querySelector(".feels-temp");
const secOneHighLow = document.querySelector(".high-low-number");
const secOneHumidity = document.querySelector(".humidity-number");
const secOneChanceOfRain  = document.querySelector(".chance-of-rain-number");
const secOnePressure = document.querySelector(".pressure-number");
const secOneUVIndex = document.querySelector(".uv-number");
const secOneWind = document.querySelector(".wind-number");
const secOneweatherToday = document.querySelector(".col-2-title");
const todayForecastTitle = document.querySelector(".forecast-title-today");
const day1ForecastTitle = document.querySelector(".forecast-title-day-1");
const day2ForecastTitle = document.querySelector(".forecast-title-day-2");
const todayForecastTemp = document.querySelector(".card-temp-today");
const day1ForecastTemp = document.querySelector(".card-temp-day-1");
const day2ForecastTemp = document.querySelector(".card-temp-day-2");
const todayForecastLowTemp = document.querySelector(".card-low-temp-today");
const day1ForecastLowTemp = document.querySelector(".card-low-temp-day-1");
const day2ForecastLowTemp = document.querySelector(".card-low-temp-day-2");
const todayForecastIcon = document.querySelector(".today-icon");
const day1ForecastIcon = document.querySelector(".day-1-icon");
const day2ForecastIcon = document.querySelector(".day-2-icon");
    //recents
//const recentWidth = document.querySelector(".recents").clientWidth;
//const recentSlideBtn = document.querySelector(".recentSlideBtn");
//const recents = document.querySelector(".recents");
//const recentDltBtn = document.querySelector("#recentDltBtn");



//on window load, we get Geolocation which goes into api and gets local weather data
getCurrentLocationWeather =  () =>{

    window.addEventListener('load', () => {

        const success = (position) => {
            let currentLat = position.coords.latitude;
            let currentLon = position.coords.longitude;
            
            currentLocationWeatherData = async() =>{
                const currentForcastRes = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${APIKEY}&q=${currentLat},${currentLon}&days=3&aqi=no`);
                const currentForecastData = await currentForcastRes.json();
                console.log(currentForecastData);

                //Capitalizes words in weather description string
                weatherDescription = currentForecastData.current.condition.text;
                words = weatherDescription.split(" ");
                for(i = 0; i < words.length; i++){
                words[i] = words[i][0].toUpperCase() + words[i].substr(1);
                }

                 // get forecast days

                 const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

                 const tomorrowSplitDate = currentForecastData.forecast.forecastday[1].date.split("-");
                 const nextDaySplitDate = currentForecastData.forecast.forecastday[2].date.split("-");
                
                 const tomorrowDate = tomorrowSplitDate.join(", ");
                 const nextDayDate = nextDaySplitDate.join(", ");
 
                 let tomorrow = (new Date(tomorrowDate).getDay());
                 let nextDay = (new Date(nextDayDate).getDay());

                // pull api data onto webpage
                secOneLocation.innerText = `${currentForecastData.location.name}, ${currentForecastData.location.region}`;
                secOneMainTemp.innerText = `${Math.floor(currentForecastData.current.temp_f)}°`;
                secOneDescription.innerText = `${words.join(" ")}`
                secOneHighTemp.innerText = `Day ${Math.round(currentForecastData.forecast.forecastday[0].day.maxtemp_f)}°`;
                secOneLowTemp.innerText = `Night ${Math.round(currentForecastData.forecast.forecastday[0].day.mintemp_f)}°`;
                secOneFeelsLike.innerText= `${Math.round(currentForecastData.current.feelslike_f)}°`
                secOneHighLow.innerText = `${Math.round(currentForecastData.forecast.forecastday[0].day.maxtemp_f)}° / ${Math.round(currentForecastData.forecast.forecastday[0].day.mintemp_f)}°`
                secOneHumidity.innerText = `${currentForecastData.current.humidity} %`
                secOneChanceOfRain.innerText = `${currentForecastData.forecast.forecastday[0].day.daily_chance_of_rain} %`;
                secOnePressure.innerText = currentForecastData.current.pressure_in;
                secOneUVIndex.innerText = `${currentForecastData.current.uv} of 11`;
                secOneWind.innerText = `${currentForecastData.current.wind_mph} mph`;
                secOneweatherToday.innerText = `Weather in ${currentForecastData.location.name}`;
                todayForecastTitle.innerText = 'Today';
                day1ForecastTitle.innerText = weekday[tomorrow];
                day2ForecastTitle.innerText = weekday[nextDay];
                todayForecastTemp.innerText = `${Math.round(currentForecastData.forecast.forecastday[0].day.maxtemp_f)}°`
                day1ForecastTemp.innerText = `${Math.round(currentForecastData.forecast.forecastday[1].day.maxtemp_f)}°`
                day2ForecastTemp.innerText = `${Math.round(currentForecastData.forecast.forecastday[2].day.maxtemp_f)}°`
                todayForecastLowTemp.innerText = `${Math.round(currentForecastData.forecast.forecastday[0].day.mintemp_f)}°`
                day1ForecastLowTemp.innerText = `${Math.round(currentForecastData.forecast.forecastday[1].day.mintemp_f)}°`
                day2ForecastLowTemp.innerText = `${Math.round(currentForecastData.forecast.forecastday[2].day.mintemp_f)}°`
            
                //change icons based on weather description
                if(currentForecastData.current.condition.code <= 1000){
                    secOneWeatherIcon.src = 'images/sun.png'
                }
                else if(currentForecastData.current.condition.code <= 1009){
                    secOneWeatherIcon.src = 'images/partlycloudy.png'
                }
                else if(currentForecastData.current.condition.code >= 1149){
                    secOneWeatherIcon.src = 'images/partlycloudy.png'
                }
                else if(currentForecastData.current.condition.code >= 1198){
                    secOneWeatherIcon.src = 'images/snow.png'
                }
                else if(currentForecastData.current.condition.code >=1240 && currentForecastData.current.condition.code <=1246   ){
                    secOneWeatherIcon.src = 'images/heavy-rain.png'
                }
                else if(currentForecastData.current.condition.code >=1273  ){
                    secOneWeatherIcon.src = 'images/storm.png'
                }
                //change icon for today forecast
                if(currentForecastData.forecast.forecastday[0].day.condition.code <= 1000){
                    todayForecastIcon.src = 'images/sun.png'
                }
                else if(currentForecastData.forecast.forecastday[0].day.condition.code <= 1009){
                    todayForecastIcon.src = 'images/partlycloudy.png'
                }
                else if(currentForecastData.forecast.forecastday[0].day.condition.code >= 1149){
                    todayForecastIcon.src = 'images/partlycloudy.png'
                }
                else if(currentForecastData.forecast.forecastday[0].day.condition.code >= 1198){
                    todayForecastIcon.src =  'images/snow.png'
                }
                else if(currentForecastData.forecast.forecastday[0].day.condition.code >= 1240 && currentForecastData.forecast.forecastday[0].day.condition.code <=1246){
                    todayForecastIcon.src =  'images/heavy-rain.png'
                }
                else if(currentForecastData.forecast.forecastday[0].day.condition.code >= 1273){
                    todayForecastIcon.src =  'images/storm.png'
                }
                // changes icoc for day1 forecast
                if(currentForecastData.forecast.forecastday[1].day.condition.code <= 1000){
                    day1ForecastIcon.src = 'images/sun.png'
                }
                else if(currentForecastData.forecast.forecastday[1].day.condition.code <= 1009){
                    day1ForecastIcon.src = 'images/partlycloudy.png'
                }
                else if(currentForecastData.forecast.forecastday[1].day.condition.code >= 1149){
                    day1ForecastIcon.src = 'images/partlycloudy.png'
                }
                else if(currentForecastData.forecast.forecastday[1].day.condition.code >= 1198){
                    day1ForecastIcon.src =  'images/snow.png'
                }
                else if(currentForecastData.forecast.forecastday[1].day.condition.code >= 1240 && currentForecastData.forecast.forecastday[1].day.condition.code <=1246){
                    day1ForecastIcon.src =  'images/heavy-rain.png'
                }
                else if(currentForecastData.forecast.forecastday[1].day.condition.code >= 1273){
                    day1ForecastIcon.src =  'images/storm.png'
                }
                // changesicon for day2 forecast
                if(currentForecastData.forecast.forecastday[2].day.condition.code <= 1000){
                    day2ForecastIcon.src = 'images/sun.png'
                }
                else if(currentForecastData.forecast.forecastday[2].day.condition.code <= 1009){
                    day2ForecastIcon.src = 'images/partlycloudy.png'
                }
                else if(currentForecastData.forecast.forecastday[2].day.condition.code >= 1149){
                    day2ForecastIcon.src = 'images/partlycloudy.png'
                }
                else if(currentForecastData.forecast.forecastday[2].day.condition.code >= 1198){
                    day2ForecastIcon.src =  'images/snow.png'
                }
                else if(currentForecastData.forecast.forecastday[2].day.condition.code >= 1240 && currentForecastData.forecast.forecastday[2].day.condition.code <=1246){
                    day2ForecastIcon.src =  'images/heavy-rain.png'
                }
                else if(currentForecastData.forecast.forecastday[2].day.condition.code >= 1273){
                    day2ForecastIcon.src =  'images/storm.png'
                }
    
            }
            currentLocationWeatherData()
        };
        
        const error = (error) => {
            console.log(error);
        };
        
        navigator.geolocation.getCurrentPosition(success, error);


    });

}
  getCurrentLocationWeather()

getWeatherSearch = () =>{

    searchBtn.addEventListener("click", () =>{

        //getting the weather data from search query
        searchWeatherData = async() =>{
            const searchForecastRes = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${APIKEY}&q=${search.value}&days=3&aqi=no`);
            const searchForecastData = await searchForecastRes.json();
            console.log(searchForecastRes.status)
            if(searchForecastRes.status == 400){
                searchErrorMessage.classList.add("unhide");
                console.log("caught error")
                searchContaineraddShake()
                setTimeout(searchContainerRemoveShake, 1500)
                setTimeout(()=>{
                    searchErrorMessage.classList.remove("unhide")
                }, 3500)
            
                return
            }

             //Capitalizes words in weather description string
             weatherDescription = searchForecastData.current.condition.text;
             words = weatherDescription.split(" ");
             for(i = 0; i < words.length; i++){
             words[i] = words[i][0].toUpperCase() + words[i].substr(1);
             }

            // get forecast days

            const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

            const tomorrowSplitDate = searchForecastData.forecast.forecastday[1].date.split("-");
            const nextDaySplitDate = searchForecastData.forecast.forecastday[2].date.split("-");

            const tomorrowDate = tomorrowSplitDate.join(", ");
            const nextDayDate = nextDaySplitDate.join(", ");

            let tomorrow = (new Date(tomorrowDate).getDay());
            let nextDay = (new Date(nextDayDate).getDay());
            console.log(weekday[tomorrow])

            //pull api data onto page
            secOneLocation.innerText = `${searchForecastData.location.name}, ${searchForecastData.location.region}`;
            secOneMainTemp.innerText = `${Math.floor(searchForecastData.current.temp_f)}°`;
            secOneDescription.innerText = `${words.join(" ")}`
            secOneHighTemp.innerText = `Day ${Math.round(searchForecastData.forecast.forecastday[0].day.maxtemp_f)}°`;
            secOneLowTemp.innerText = `Night ${Math.round(searchForecastData.forecast.forecastday[0].day.mintemp_f)}°`;
            secOneFeelsLike.innerText= `${Math.round(searchForecastData.current.feelslike_f)}°`
            secOneHighLow.innerText = `${Math.round(searchForecastData.forecast.forecastday[0].day.maxtemp_f)}° / ${Math.round(searchForecastData.forecast.forecastday[0].day.mintemp_f)}°`
            secOneHumidity.innerText = `${searchForecastData.current.humidity} %`
            secOneChanceOfRain.innerText = `${searchForecastData.forecast.forecastday[0].day.daily_chance_of_rain} %`;
            secOnePressure.innerText = searchForecastData.current.pressure_in;
            secOneUVIndex.innerText = `${searchForecastData.current.uv} of 11`;
            secOneWind.innerText = `${searchForecastData.current.wind_mph} mph`;
            secOneweatherToday.innerText = `Weather in ${searchForecastData.location.name}`;
            todayForecastTitle.innerText = 'Today';
            day1ForecastTitle.innerText = weekday[tomorrow];
            day2ForecastTitle.innerText = weekday[nextDay];
            todayForecastTemp.innerText = `${Math.round(searchForecastData.forecast.forecastday[0].day.maxtemp_f)}°`
            day1ForecastTemp.innerText = `${Math.round(searchForecastData.forecast.forecastday[1].day.maxtemp_f)}°`
            day2ForecastTemp.innerText = `${Math.round(searchForecastData.forecast.forecastday[2].day.maxtemp_f)}°`
            todayForecastLowTemp.innerText = `${Math.round(searchForecastData.forecast.forecastday[0].day.mintemp_f)}°`
            day1ForecastLowTemp.innerText = `${Math.round(searchForecastData.forecast.forecastday[1].day.mintemp_f)}°`
            day2ForecastLowTemp.innerText = `${Math.round(searchForecastData.forecast.forecastday[2].day.mintemp_f)}°`


             //change icons based on weather description
             if(searchForecastData.current.condition.code <= 1000){
                secOneWeatherIcon.src = 'images/sun.png'
            }
            else if(searchForecastData.current.condition.code <= 1009){
                secOneWeatherIcon.src = 'images/partlycloudy.png'
            }
            else if(searchForecastData.current.condition.code >= 1149){
                secOneWeatherIcon.src = 'images/partlycloudy.png'
            }
            else if(searchForecastData.current.condition.code >= 1198){
                secOneWeatherIcon.src = 'images/snow.png'
            }
            else if(searchForecastData.current.condition.code >=1240 && searchForecastData.current.condition.code <=1246   ){
                secOneWeatherIcon.src = 'images/heavy-rain.png'
            }
            else if(searchForecastData.current.condition.code >=1273  ){
                secOneWeatherIcon.src = 'images/storm.png'
            }
            //change icon for today forecast
            if(searchForecastData.forecast.forecastday[0].day.condition.code <= 1000){
                todayForecastIcon.src = 'images/sun.png'
            }
            else if(searchForecastData.forecast.forecastday[0].day.condition.code <= 1009){
                todayForecastIcon.src = 'images/partlycloudy.png'
            }
            else if(searchForecastData.forecast.forecastday[0].day.condition.code >= 1149){
                todayForecastIcon.src = 'images/partlycloudy.png'
            }
            else if(searchForecastData.forecast.forecastday[0].day.condition.code >= 1198){
                todayForecastIcon.src =  'images/snow.png'
            }
            else if(searchForecastData.forecast.forecastday[0].day.condition.code >= 1240 && searchForecastData.forecast.forecastday[0].day.condition.code <=1246){
                todayForecastIcon.src =  'images/heavy-rain.png'
            }
            else if(searchForecastData.forecast.forecastday[0].day.condition.code >= 1273){
                todayForecastIcon.src =  'images/storm.png'
            }
            // changes icoc for day1 forecast
            if(searchForecastData.forecast.forecastday[1].day.condition.code <= 1000){
                day1ForecastIcon.src = 'images/sun.png'
            }
            else if(searchForecastData.forecast.forecastday[1].day.condition.code <= 1009){
                day1ForecastIcon.src = 'images/partlycloudy.png'
            }
            else if(searchForecastData.forecast.forecastday[1].day.condition.code >= 1149){
                day1ForecastIcon.src = 'images/partlycloudy.png'
            }
            else if(searchForecastData.forecast.forecastday[1].day.condition.code >= 1198){
                day1ForecastIcon.src =  'images/snow.png'
            }
            else if(searchForecastData.forecast.forecastday[1].day.condition.code >= 1240 && searchForecastData.forecast.forecastday[1].day.condition.code <=1246){
                day1ForecastIcon.src =  'images/heavy-rain.png'
            }
            else if(searchForecastData.forecast.forecastday[1].day.condition.code >= 1273){
                day1ForecastIcon.src =  'images/storm.png'
            }
            // changesicon for day2 forecast
            if(searchForecastData.forecast.forecastday[2].day.condition.code <= 1000){
                day2ForecastIcon.src = 'images/sun.png'
            }
            else if(searchForecastData.forecast.forecastday[2].day.condition.code <= 1009){
                day2ForecastIcon.src = 'images/partlycloudy.png'
            }
            else if(searchForecastData.forecast.forecastday[2].day.condition.code >= 1149){
                day2ForecastIcon.src = 'images/partlycloudy.png'
            }
            else if(searchForecastData.forecast.forecastday[2].day.condition.code >= 1198){
                day2ForecastIcon.src =  'images/snow.png'
            }
            else if(searchForecastData.forecast.forecastday[2].day.condition.code >= 1240 && searchForecastData.forecast.forecastday[2].day.condition.code <=1246){
                day2ForecastIcon.src =  'images/heavy-rain.png'
            }
            else if(searchForecastData.forecast.forecastday[2].day.condition.code >= 1273){
                day2ForecastIcon.src =  'images/storm.png'
            }
            


        }
    
        if(search.value == ""){
            searchContaineraddShake()
            setTimeout(searchContainerRemoveShake, 1500)
            return
        }
        else{
            searchWeatherData()
        }

    });
}
getWeatherSearch()




//specialty functions

function searchContaineraddShake () {
    searchContainer.classList.add("shake")
};

function searchContainerRemoveShake(){
    searchContainer.classList.remove("shake")
}


createLocalStorage = () =>{
    window.addEventListener("load", async ()=>{

        //creating local storage array on window load
        let myRecents = JSON.parse(localStorage.getItem('RecentSearches')) || [];

         //if statements for recents slide bar
         if(recentWidth < document.body.clientWidth){
            recentSlideBtn.style.display = "none"
         }
         else if(recentWidth > document.body.clientWidth){
             recentSlideBtn.style.display = null;
             console.log("recentslidershow")

         }

         creatRecentItem = () =>{
            recents.innerHTML = '';

            myRecents.forEach(recentitem => {
                //creating the items
                let recentItem = document.createElement("div");
                recentItem.classList.add("recentitem");
                let recentImgContianer = document.createElement("div");
                recentImgContianer.classList.add("recentImgContainer");
                let recentWthrIcon = document.createElement('img');
                recentWthrIcon.classList.add('recentWthrIcon')
                recentWthrIcon.src = recentitem.icon;
                let recentInfo = document.createElement("div");
                recentInfo.classList.add('recentInfo');
                let recentTemp = document.createElement('p');
                recentTemp.classList.add("recentTemp");
                recentTemp.innerText = `${Math.floor(recentitem.temp)}°`
                let recentLocation = document.createElement("p");
                recentLocation.classList.add("recentLocation")
                recentLocation.innerText = recentitem.name
                let recentDltBtn = document.createElement("button");
                recentDltBtn.setAttribute("id", 'recentDltBtn');
                let DltBtnIcon = document.createElement("i");
                DltBtnIcon.classList.add('fa-solid')
                DltBtnIcon.classList.add("fa-ellipsis-vertical")

                //append all elements to the page
                
                recents.append(recentItem);
                recentItem.append(recentImgContianer);
                recentImgContianer.append(recentWthrIcon);
                recentItem.append(recentInfo);
                recentInfo.append(recentTemp);
                recentInfo.append(recentLocation);
                recentItem.append(recentDltBtn);
                recentDltBtn.append(DltBtnIcon);

                recentDltBtn.addEventListener('click', ()=>{
                    myRecents = myRecents.filter(t => t != recentitem)
                    localStorage.setItem('RecentSearches', JSON.stringify(myRecents))
                    createRecentItem()    
                    console.log("fuggg")
                });

            });
            creatRecentItem()

         }

        

        searchBtn.addEventListener("click", async ()=>{
            const searchForecastRecentRes = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${APIKEY}&q=${search.value}&days=3&aqi=no`);
            const searchForecastRecentData = await searchForecastRecentRes.json();
            console.log(searchForecastRecentData)

            if(searchForecastRecentRes.status == 400){
                searchErrorMessage.classList.add("unhide");
                console.log("caught error")
                searchContaineraddShake()
                setTimeout(searchContainerRemoveShake, 1500)
                setTimeout(()=>{
                    searchErrorMessage.classList.remove("unhide")
                }, 3500)
            
                return
            }

            recentitem = {icon:'',temp:Math.round(searchForecastRecentData.forecast.forecastday[0].day.maxtemp_f) ,name: searchForecastRecentData.location.name,};

            if(searchForecastRecentData.forecast.forecastday[0].day.condition.code <= 1000){
                recentitem.icon = 'images/sun.png'
                console.log("sunny day image")
            }
            else if(searchForecastRecentData.forecast.forecastday[0].day.condition.code <= 1009){
                recentitem.icon = 'images/partlycloudy.png'
            }
            else if(searchForecastRecentData.forecast.forecastday[0].day.condition.code >= 1149){
                recentitem.icon = 'images/partlycloudy.png'
            }
            else if(searchForecastRecentData.forecast.forecastday[0].day.condition.code >= 1198){
                recentitem.icon =  'images/snow.png'
            }
            else if(searchForecastRecentData.forecast.forecastday[0].day.condition.code >= 1240 && searchForecastRecentData.forecast.forecastday[0].day.condition.code <=1246){
                recentitem.icon =  'images/heavy-rain.png'
            }
            else if(searchForecastRecentData.forecast.forecastday[0].day.condition.code >= 1273){
                recentitem.icon =  'images/storm.png'
            }

            myRecents.push(recentitem);

            localStorage.setItem('RecentSearches', JSON.stringify(myRecents))
            console.log(myRecents);

            recents.innerHTML = '';

            myRecents.forEach(recentitem => {
                //creating the items
                let recentItem = document.createElement("div");
                recentItem.classList.add("recentitem");
                let recentImgContianer = document.createElement("div");
                recentImgContianer.classList.add("recentImgContainer");
                let recentWthrIcon = document.createElement('img');
                recentWthrIcon.classList.add('recentWthrIcon')
                recentWthrIcon.src = recentitem.icon;
                let recentInfo = document.createElement("div");
                recentInfo.classList.add('recentInfo');
                let recentTemp = document.createElement('p');
                recentTemp.classList.add("recentTemp");
                recentTemp.innerText = `${Math.floor(recentitem.temp)}°`
                let recentLocation = document.createElement("p");
                recentLocation.classList.add("recentLocation")
                recentLocation.innerText = recentitem.name
                let recentDltBtn = document.createElement("button");
                recentDltBtn.setAttribute("id", 'recentDltBtn');
                let DltBtnIcon = document.createElement("i");
                DltBtnIcon.classList.add('fa-solid')
                DltBtnIcon.classList.add("fa-ellipsis-vertical")

                //append all elements to the page
                
                recents.append(recentItem);
                recentItem.append(recentImgContianer);
                recentImgContianer.append(recentWthrIcon);
                recentItem.append(recentInfo);
                recentInfo.append(recentTemp);
                recentInfo.append(recentLocation);
                recentItem.append(recentDltBtn);
                recentDltBtn.append(DltBtnIcon);
            });

        });
    });

};

// createLocalStorage()

