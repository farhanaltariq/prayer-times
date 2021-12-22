function success(position){
    console.log(position);
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

function index(){
    getUserLocation();
    let app         = document.getElementById('container');
    let h3          = document.createElement('h3');
    h3.innerHTML    = 'Prayer Times';

    app.appendChild(h3);
}

index();