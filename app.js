function showLocation(latitude, longitude){
    let url = 'https://nominatim.openstreetmap.org/reverse?format=json&lat='+latitude+'&lon='+longitude+'&zoom=18&addressdetails=1'
    // let url = 'https://geocode.xyz/'+latitude+','+longitude+'111.530014?json=1';                                         //API from geocode, slow response
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
        // locationField.innerHTML = 'Location : ' + location
    });
}

function prayerTimes(latitude, longitude){
    fetch('http://api.aladhan.com/v1/calendar?latitude='+latitude+'&longitude='+longitude+'&method=4')
    .then(response => response.json())
    .then(function(response){
        // console.log(response);
        let date = new Date();
        let today = date.getDate()-1;  2
        let data = response.data[today].timings;
        let app = document.getElementById('container');
        let table = document.createElement('table');
        table.className = 'table text-center';
        let tableBody = document.createElement('tbody');
        
        for(i in data){
            let row = tableBody.insertRow();
            let name = row.insertCell(0);
            let time = row.insertCell(1);
            name.innerHTML = i;
            time.innerHTML = data[i];
            tableBody.appendChild(row);
        }
        table.appendChild(tableBody);
        app.appendChild(table);
    });
}

function success(position){
    showLocation(position.coords.latitude, position.coords.longitude);
    prayerTimes(position.coords.latitude, position.coords.longitude);
}

function error(){
    let defaultLatitude = -6.200000;
    let defaultLongtitude = 106.816666;
    showLocation(defaultLatitude, defaultLongtitude);
    prayerTimes(defaultLatitude, defaultLongtitude);
    // alert('Gagal mendapatkan lokasi');
}

function getUserLocation(){
    if(!navigator.geolocation){
        alert('Geolocation tidak didukung di browser yang anda gunakan, silahkan gunakan browser lain');
    } else{
        navigator.geolocation.getCurrentPosition(success, error);
    }
}



function index(){
    let app         = document.getElementById('container');
    let h3          = document.createElement('h3');
    h3.innerHTML    = 'Prayer Times';
    h3.className    = 'text-center bg-info text-light';
    app.appendChild(h3);

    let location        = document.createElement('h6');
    location.innerHTML  = '<br>Location&nbsp; : ';
    location.id         = 'location';
    let method          = document.createElement('span');
    method.id           = 'method';
    method.innerHTML    = 'Method&nbsp;&nbsp;&nbsp; : <br><br>';

    app.appendChild(location);
    app.appendChild(method);
    getUserLocation();

}

index();