

mapboxgl.accessToken = 'pk.eyJ1Ijoib21hci1hcmVmIiwiYSI6ImNrdGx3OXZvMDBoNGwydm4ydWVrb3d0bTMifQ._DEnKPltxE3MKSmFI0KBmg';
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: point,
    zoom: 13
});
const marker1 = new mapboxgl.Marker()
    .setLngLat(point)
    .addTo(map);

    function on() {
        document.getElementById("write_review").style.display = "block";
    }
    
    function off() {
        document.getElementById("write_review").style.display = "none";
    }
    let write = document.querySelector('#review') ;
    write.addEventListener('click' , on);
    let close = document.querySelector('#close_review') ;
    close.addEventListener('click' , off);