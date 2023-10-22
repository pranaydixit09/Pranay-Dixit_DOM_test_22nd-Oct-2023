
const ipAddressElement = document.getElementById("ip-address");

fetch("https://api.ipify.org?format=json")
    .then(response => response.json())
    .then(data => {
        const ipAddress = data.ip;
        ipAddressElement.textContent = ipAddress;
    })
    .catch(error => {
        ipAddressElement.textContent = "Failed to fetch IP address";
        console.error(error);
    });


    function displayData(data) {  
        document.getElementById("latitude").textContent = "Latitude: " + data.loc.split(",")[0];
        document.getElementById("longitude").textContent = "Longitude: " + data.loc.split(",")[1];
        document.getElementById("city").textContent = "City: " + data.city;
        document.getElementById("region").textContent = "Region: " + data.region;
        document.getElementById("timezone").textContent = "Time Zone: " + data.timezone;
        document.getElementById("dataContainer").style.display = "block";
      }


      function getData() {
        fetch('https://ipinfo.io/ipAddressElement/geo')
          .then(response => response.json())
          .then(data => {
            const latitude= data.loc[0];
            const longitude=data.loc[1];
            console.log(data);
            displayData(data);
            initMap(latitude, longitude)
            
            const timezone = data.timezone;
            displayTime(timezone);
            
            const pincode = data.postal.code;
            getPostOffices(pincode);
          })
          .catch(error => console.log('Error:', error));
         
      }
  
      function initMap(latitude, longitude) {
        const mapCenter = { lat: parseFloat(latitude), lng: parseFloat(longitude) };
  
        const map = new google.maps.Map(document.getElementById("map"), {
          center: mapCenter,
          zoom: 10
        });
  
        new google.maps.Marker({
          position: mapCenter,
          map: map
        });
      }
  
      function displayTime(timezone) {
        const currentDate = new Date();
        const options = {
          timeZone: timezone,
          hour12: false,
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric'
        };
        const timeString = currentDate.toLocaleString('en-US', options);
        document.getElementById("time").textContent = "Current Time: " + timeString;
      }
      
  
      function getPostOffices(pincode) {
        fetch(`https://api.postalpincode.in/pincode/${pincode}`)
          .then(response => response.json())
          .then(data => {
            const postOffices = data[0].PostOffice;
            const postOfficesList = document.getElementById("postOffices");
            postOffices.forEach(postOffice => {
              const listItem = document.createElement("li");
              listItem.textContent = postOffice.Name;
              postOfficesList.appendChild(listItem);
            });
          })
          .catch(error => console.log('Error:', error));
      }