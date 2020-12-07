// Functions for printing date and time

var showDate = () => {
    // Date Method
    var date = new Date();

    // getting day using date prototype Method
    var day = date.getDay();
    var week = ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'];
    var todaysDay = week[day - 1];
    // Printing day name
    document.getElementById("day").innerHTML = todaysDay;

    //Getting current date using date method
    var currentDate = date.getDate();
    // printing date 
    document.getElementById("date").innerHTML = currentDate;

    // getting month using date prototype Method
    var month = date.getMonth();
    var AllMonths = ['Jan', 'Feb', 'March', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    // printing month name
    var currentMonth = AllMonths[month];
    document.getElementById("month").innerHTML = currentMonth;
}
showDate();

setInterval(() => {
    var date = new Date();
    //getting hour using date Method 
    var getHour = date.getHours();
     
    // condition for hour
    (getHour < 10) ? document.getElementById('hours').innerHTML = '0' + getHour : document.getElementById('hours').innerHTML = getHour;
    //getting Minutes using date Method 
    var getMinutes = date.getMinutes();
    //condition for minutes 
    (getMinutes < 10) ? document.getElementById('minutes').innerHTML = '0' + getMinutes : document.getElementById('minutes').innerHTML = getMinutes;
    //getting Seconds using date Method
    var getSeconds = date.getSeconds();
    //Condition for seconds
    (getSeconds < 10) ? document.getElementById('seconds').innerHTML = '0' + getSeconds : document.getElementById('seconds').innerHTML = getSeconds;
    // condition for AM & PM
    (getHour > 12) ? document.getElementById('day-night').innerHTML = 'PM' : document.getElementById('day-night').innerHTML = 'AM';


}, 1000);


// Function for getting current Location 
var gettingCurrentLocation=(event)=>{
    // preventing default auto fresh
    event.preventDefault();
    // show loader 
    document.getElementById('loader').style.display="block";
    document.getElementById("livelocationbtn").style.display="none";
    // getting latitude & longitude
    (navigator.geolocation) ? navigator.geolocation.getCurrentPosition(position=>{
        var latitude=position.coords.latitude;
        var longitude=position.coords.longitude;
        
        
        // fetching wheather Details
        fetch('https://api.openweathermap.org/data/2.5/onecall?lat='+latitude+'&lon='+longitude+'&units=metric&appid=32e773e2fe0de1ca58b5261f44ae1cab')
        .then(response=>{return response.json()})
        .then(data=>{
            
            var currentCity=data.timezone;
            
            document.getElementById("city-name").innerHTML=currentCity;
            var wheatherDescription=data.current.weather[0].main;
            document.getElementById('wheather-dis').innerHTML=wheatherDescription;
            var wheatherWindSpeed=data.current.wind_speed;
            document.getElementById('wind-speed').innerHTML=wheatherWindSpeed;
            var wheatherTemperature=data.current.temp;
            document.getElementById('temp-C').innerHTML=wheatherTemperature;
            document.getElementById('temp-F').innerHTML=(wheatherTemperature* 9/5) + 32;
            
            var wheatherHumidity=data.current.humidity;
            document.getElementById('Humidity').innerHTML=wheatherHumidity;
            // hide loader
            document.getElementById('loader').style.display="none";
             document.getElementById("livelocationbtn").style.display="block";
        })
        .catch(error=>{alert(error)})
       
    })
     : document.getElementById('geoLocationError').style.display="block";
   
    
}



// Function for getting userinput City
var getUserInputCity=(event)=>{
    // preventing default auto fresh
    event.preventDefault();
    document.getElementById('loader').style.display="block";
    document.getElementById("livelocationbtn").style.display="none";
    var userInputCity=document.getElementById('userinput').value;
      // fetching wheather Details
      fetch('http://api.weatherstack.com/current?access_key=6dcaec30f23d4af36ed274c4e4aa3e0d&query='+userInputCity)
      .then(response=>{return response.json()})
      .then(data=>{
          
          console.log(data)
          var locationnName=data.location.name;
          document.getElementById("city-name").innerHTML=locationnName;
          var wheatherDescription=data.current.weather_descriptions[0];
         document.getElementById('wheather-dis').innerHTML=wheatherDescription;
          var wheatherWindSpeed=data.current.wind_speed;
          document.getElementById('wind-speed').innerHTML=wheatherWindSpeed;
           var wheatherTemperature=data.current.temperature;
          document.getElementById('temp-C').innerHTML=wheatherTemperature;
           document.getElementById('temp-F').innerHTML=(wheatherTemperature* 9/5) + 32;
          
          var wheatherHumidity=data.current.humidity;
          document.getElementById('Humidity').innerHTML=wheatherHumidity;
        
            // hide loader
            document.getElementById('loader').style.display="none";
            document.getElementById("livelocationbtn").style.display="block";
        // clearing input value
        document.getElementById('userinput').value='';
      })
     .catch(error=>{
          alert("Please refresh your page and try again !")
    // hide loader
    document.getElementById('loader').style.display="none";
    document.getElementById("livelocationbtn").style.display="block";
// clearing input value
document.getElementById('userinput').value='';})
    
   
    
}


