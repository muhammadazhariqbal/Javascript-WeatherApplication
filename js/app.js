
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
    // conditions for greetings 
    if(getHour>=6 && getHour<12){
        document.getElementById('greetings').innerHTML='GOOD MORNING !';
        document.getElementById('main-bg').style.backgroundImage = "url('./img/morning-blured.jpg')";
        
    } else if(getHour>=12 && getHour<18){
        document.getElementById('greetings').innerHTML='GOOD AFTERNOON!';
        document.getElementById('main-bg').style.backgroundImage = "url('./img/afternoon-blured.jpg')";
        
      
    } else if (getHour>=18 && getHour<20) {
        document.getElementById('greetings').innerHTML='GOOD EVENING !';
        
        
        
        document.getElementById('main-bg').style.backgroundImage = "url('./img/evening-blured.jpg')";
        
       
    } else if(getHour>=20 || getHour<=6) {
        document.getElementById('greetings').innerHTML='GOOD NIGHT!';
        document.getElementById('main-bg').style.backgroundImage = "url('./img/night-blurd.jpg')";
        
        
    }
    // (getHour >=6 && getHour<12 ) ? document.getElementById('greetings').innerHTML='GOOD MORNING !' :
    //  (getHour>=12 && getHour<18) ? document.getElementById('greetings').innerHTML='GOOD AFTERNOON!' :
    //  (getHour>=18 && getHour<20) ? document.getElementById('greetings').innerHTML='GOOD EVENING !' :
    //  (getHour>=20 && getHour<6) ? document.getElementById('greetings').innerHTML='GOOD NIGHT!' : document.getElementById('greetings').innerHTML='GOOD NIGHT!'
     
    
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
    
    
   var userInputCity=document.getElementById('userinput').value;
   fetch('https://api.openweathermap.org/data/2.5/weather?q='+userInputCity+'&units=metric&appid=32e773e2fe0de1ca58b5261f44ae1cab')
   .then(response=>{return response.json()})
   .then(data=>{
       console.log(data)
       var cityName=data.name;
       document.getElementById("city-name").innerHTML=cityName;
       var wheatherDescription=data.weather[0].main;
        document.getElementById('wheather-dis').innerHTML=wheatherDescription;
        var wheatherWindSpeed=data.wind.speed;
            document.getElementById('wind-speed').innerHTML=wheatherWindSpeed;
            var wheatherTemperature=data.main.temp;
            document.getElementById('temp-C').innerHTML=wheatherTemperature;
            document.getElementById('temp-F').innerHTML=(wheatherTemperature* 9/5) + 32;
            
            var wheatherHumidity=data.main.humidity;
            document.getElementById('Humidity').innerHTML=wheatherHumidity;
       
   })
   .catch(error=>{
    swal("Invalid City Name","", "error");
    document.getElementById("city-name").innerHTML="---";
   })
   


   
    
}
