// get location
async function getLoc() {
    try {
        const res_loc = await fetch('http://www.geoplugin.net/json.gp')
        const data = await res_loc.json()
        const latitude= data.geoplugin_latitude;
        const longitude= data.geoplugin_longitude;
        const timezone= data.geoplugin_timezone;

        // get weather data 
        const res_weather= await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m&hourly=temperature_2m&daily=weather_code,apparent_temperature_max,apparent_temperature_min`);
        const data_weather= await res_weather.json()
        console.log(data_weather)

        // set date
        const today = new Date();
        console.log(today);
        console.log(today.getDate());

        const date = new Date(data_weather.current.time);
        const options = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          };
          
        const displayDate = date.toLocaleDateString('en-US',options) 
        
        const dayNames = [
             "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"
        ];
        const monNames = [
            "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul",
            "Aug", "Sep", "Oct", "Nov", "Dec"
        ];
        const formatDate = `${today.getDate()} ${monNames[today.getMonth()]} ${today.getFullYear()}`;

        // get index data after today
        const dayAfter1DaysIndex = (today.getDay() + 1) % 7;
        console.log(today.getDay() + 1);
        console.log((today.getDay() + 1) % 7);
        
        const dayAfter2DaysIndex = (today.getDay() + 2) % 7;
        const dayAfter3DaysIndex = (today.getDay() + 3) % 7;
        const dayAfter4DaysIndex = (today.getDay() + 4) % 7;
        const dayAfter5DaysIndex = (today.getDay() + 5) % 7;
        const dayAfter6DaysIndex = (today.getDay() + 6) % 7;

        // data to html
        document.getElementById('temperature').textContent=`${data_weather.current.temperature_2m} ${data_weather.hourly_units.temperature_2m}`
        document.getElementById('humidity').textContent=`${data_weather.current.relative_humidity_2m}`
        document.getElementById('city').textContent = `${data.geoplugin_city}, ${data.geoplugin_region}, ${data.geoplugin_countryName}`;
        document.getElementById('day').textContent = `${displayDate}`
        document.getElementById('day-1').textContent = `${dayNames[dayAfter1DaysIndex]}`
        document.getElementById('day-2').textContent = `${dayNames[dayAfter2DaysIndex]}`
        document.getElementById('day-3').textContent = `${dayNames[dayAfter3DaysIndex]}`
        document.getElementById('day-4').textContent = `${dayNames[dayAfter4DaysIndex]}`
        document.getElementById('day-5').textContent = `${dayNames[dayAfter5DaysIndex]}`
        document.getElementById('day-6').textContent = `${dayNames[dayAfter6DaysIndex]}`
        document.getElementById('temperature.next1').textContent = `${data_weather.hourly.temperature_2m[0]}`
        document.getElementById('temperature.next2').textContent = `${data_weather.hourly.temperature_2m[1]}`
        document.getElementById('temperature.next3').textContent = `${data_weather.hourly.temperature_2m[2]}`
        document.getElementById('temperature.next4').textContent = `${data_weather.hourly.temperature_2m[3]}`
        document.getElementById('temperature.next5').textContent = `${data_weather.hourly.temperature_2m[4]}`
        document.getElementById('temperature.next6').textContent = `${data_weather.hourly.temperature_2m[5]}`
        document.getElementById('min-temp.next1').textContent = `${data_weather.daily.apparent_temperature_min[0]}`
        document.getElementById('min-temp.next2').textContent = `${data_weather.daily.apparent_temperature_min[1]}`
        document.getElementById('min-temp.next3').textContent = `${data_weather.daily.apparent_temperature_min[2]}`
        document.getElementById('min-temp.next4').textContent = `${data_weather.daily.apparent_temperature_min[3]}`
        document.getElementById('min-temp.next5').textContent = `${data_weather.daily.apparent_temperature_min[4]}`
        document.getElementById('min-temp.next6').textContent = `${data_weather.daily.apparent_temperature_min[5]}`
        document.getElementById('max-temp.next1').textContent = `${data_weather.daily.apparent_temperature_max[0]}`
        document.getElementById('max-temp.next2').textContent = `${data_weather.daily.apparent_temperature_max[1]}`
        document.getElementById('max-temp.next3').textContent = `${data_weather.daily.apparent_temperature_max[2]}`
        document.getElementById('max-temp.next4').textContent = `${data_weather.daily.apparent_temperature_max[3]}`
        document.getElementById('max-temp.next5').textContent = `${data_weather.daily.apparent_temperature_max[4]}`
        document.getElementById('max-temp.next6').textContent = `${data_weather.daily.apparent_temperature_max[5]}`
    

    } catch (error) {
        console.error("Error fetching location data:", error);
        document.getElementById("location").textContent ="Gagal mendapatkan lokasi.";
    }
}

getLoc();








