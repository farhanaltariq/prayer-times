function success(position){
    prayerTimes(position.coords.latitude, position.coords.longitude);
}
function error(){
    alert('Gagal mendapatkan lokasi');
}

function getUserLocation(){
    if(!navigator.geolocation){
        alert('Geolocation tidak didukung di browser yang anda gunakan, silahkan gunakan browser lain');
    } else{
        navigator.geolocation.getCurrentPosition(success, error);
    }
}

function prayerTimes(latitude, longitude){
    fetch('http://api.aladhan.com/v1/calendar?latitude='+latitude+'&longitude='+longitude+'&method=2')
    .then(response => response.json())
    .then(function(response){
        let date = new Date();
        let today = date.getDate()-1;
        let data = response.data[today].timings;
        let app = document.getElementById('container');
        let table = document.createElement('table');
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

function index(){
    getUserLocation();
    let app         = document.getElementById('container');
    let h3          = document.createElement('h3');
    h3.innerHTML    = 'Prayer Times';

    app.appendChild(h3);
}

index();