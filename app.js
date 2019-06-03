window.addEventListener("load",()=>{
 let long;
  let lat;
  let temperatureDescription= document.querySelector(".temperature-description");
  let temperatureDegree = document.querySelector(".temperature-degree");
  let locationTimezone = document.querySelector( ".location-timezone");

   if(navigator.geolocation) {
       navigator.geolocation.getCurrentPosition(position=>{
           long=position.coords.longitude;
            lat=position.coords.latitude;
         
            const proxy = "https://cors-anywhere.herokuapp.com/";
            const api=`${proxy}https://api.darksky.net/forecast/aee86e1e708bc364f40832e2fe9093d4/${lat},${long}`;
            fetch(api) 
            .then(response=>{
                return response.json();
            })
            .then(data=>{
                console.log(data);
                const {temperature,summary,icon} = data.currently;
                temperatureDegree.textContent=temperature;
                temperatureDescription.textContent = summary;
                locationTimezone.textContent = data.timezone;

                setIcons(icon,document.querySelector(".icon"));
            }) ;    
        });
        }
        function setIcons(icon,iconID){
            const skycons = new Skycons({color:"white"});
            const currentIcon = icon.replace(/-/g,"_").toUpperCase();
            skycons.play();
            return skycons.set(iconID,Skycons[currentIcon]);

        }
});