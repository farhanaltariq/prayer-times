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
        console.log(response.data[today].timings);
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