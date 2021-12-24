var tempPos;
let globalMethod = 4;

function checkCalculationMethod(method){
    let text = document.getElementById('method'+method).textContent;
    let methodField = document.getElementById('dropdownMenu2');
    methodField.innerHTML = text;
}

// Get data from API then display location
// (Reverse Geocoding)
function showLocation(latitude, longitude){
    let url = 'https://nominatim.openstreetmap.org/reverse?format=json&lat='+latitude+'&lon='+longitude+'&zoom=18&addressdetails=1'
    // let url = 'https://geocode.xyz/'+latitude+','+longitude+'111.530014?json=1';        //API from geocode, slow response
    // console.log(url); 

    fetch(url)
    .then(response => response.json())
    .then(function(response){
        // console.log(response);
        let locationField   = document.getElementById('location');
        let city            = response.address.county;
        let state           = response.address.state;
        let country         = response.address.country;
        let location        = city + ', ' + state + ', ' + country;
        let text            = document.createTextNode(location);
        locationField.appendChild(text);
    });
}

//To clear a table before update
//For changing method
function clearTables(){
    let target = document.getElementById('dataTable');
    target.remove();
}

//Get data from API then display into a table
function prayerTimes(latitude, longitude){
    checkCalculationMethod(globalMethod);

    fetch('https://api.aladhan.com/v1/calendar?latitude='+latitude+'&longitude='+longitude+'&method='+globalMethod)
    .then(response => response.json())
    .then(function(response){
        // console.log(response);
        let date        = new Date();
        let today       = date.getDate()-1;  2
        let data        = response.data[today].timings;
        let app         = document.getElementById('container');
        let table       = document.createElement('table');
        table.id        = 'dataTable';
        table.className = 'table text-center table-stripped';
        let tableBody   = document.createElement('tbody');
        
        for(i in data){
            let row         = tableBody.insertRow();
            let name        = row.insertCell(0);
            let time        = row.insertCell(1);
            name.innerHTML  = i;
            time.innerHTML  = data[i];
            tableBody.appendChild(row);
        }
        table.appendChild(tableBody);
        app.appendChild(table);
    });
}

//Call showLocation and prayerTimes function if location succesfully acquired
function success(position){
    tempPos = position;
    showLocation(position.coords.latitude, position.coords.longitude);
    prayerTimes(position.coords.latitude, position.coords.longitude);
}

//If failed to get data from user
//Set default location to Jakarta, Indonesia
function error(){
    let defaultLatitude = -6.200000;
    let defaultLongtitude = 106.816666;
    prayerTimes(defaultLatitude, defaultLongtitude, globalMethod);
    // alert('Gagal mendapatkan lokasi');
    let locationField   = document.getElementById('location');
    locationField.innerHTML = 'Jakarta, Indonesia';
}


//Get geolocation from user
function getUserLocation(){
    if(!navigator.geolocation){
        alert('Geolocation not supported in your browser, please use another browser');
    } else{
        navigator.geolocation.getCurrentPosition(success, error);
    }
}

//Start function from getUserLocation
getUserLocation();

//Create clickListener
for(let i = 0; i< 16; i++){
    //Skip 6 because method6 is not defined
    if(i === 6)
        continue;

    document.getElementById('method'+i).onclick = function(){
        globalMethod = i;
        clearTables();
        if (typeof tempPos === 'undefined') {
            error();
        } else{
            prayerTimes(tempPos.coords.latitude, tempPos.coords.longitude);
        }
    };
}
