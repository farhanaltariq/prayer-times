function checkCalculationMethod(method, text = 'test'){
    console.log(method);
    switch(method){
        case 4 :
            text = 'Umm Al-Qura University, Makkah';
            break;
        default :
            text = 'Test';
    }

    let methodField = document.getElementById('dropdownMenu2');
    methodField.innerHTML = text;
}

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

function prayerTimes(latitude, longitude, method = 4){
    console.log(method);
    checkCalculationMethod(method);

    fetch('http://api.aladhan.com/v1/calendar?latitude='+latitude+'&longitude='+longitude+'&method='+method)
    .then(response => response.json())
    .then(function(response){
        // console.log(response);
        let date = new Date();
        let today = date.getDate()-1;  2
        let data = response.data[today].timings;
        let app = document.getElementById('container');
        let table = document.createElement('table');
        table.className = 'table text-center table-stripped';
        let tableBody = document.createElement('tbody');
        
        console.log(data);

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
    prayerTimes(defaultLatitude, defaultLongtitude);
    // alert('Gagal mendapatkan lokasi');
    let locationField   = document.getElementById('location');
    let text            = document.createTextNode('Jakarta, Indonesia');
    locationField.appendChild(text);
}

function getUserLocation(){
    if(!navigator.geolocation){
        alert('Geolocation tidak didukung di browser yang anda gunakan, silahkan gunakan browser lain');
    } else{
        navigator.geolocation.getCurrentPosition(success, error);
    }
}



function index(){
    getUserLocation();
}

index();