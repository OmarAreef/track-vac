var loader = document.querySelector('.preloader');
window.addEventListener('load', vanish);
function vanish() {
    loader.classList.add("disppear")
}
console.log(vacCenters)
mapboxgl.accessToken = 'pk.eyJ1Ijoib21hci1hcmVmIiwiYSI6ImNrdGx3OXZvMDBoNGwydm4ydWVrb3d0bTMifQ._DEnKPltxE3MKSmFI0KBmg';
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [vacCenters[0].longitude, vacCenters[0].latitude],
    zoom: 9
});
for (let center of vacCenters){
    const marker1 = new mapboxgl.Marker()
    .setLngLat([  center.longitude , center.latitude])
    .setPopup(
        new mapboxgl.Popup({ offset: 25 }) // add popups
        .setHTML(`<span> <a href="/${center._id}"> ${center.name} </a></span>`)
      )
    
    .addTo(map);
    
}


// console.log(vacCenters)

