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
for (let center of vacCenters) {
    const marker1 = new mapboxgl.Marker()
        .setLngLat([center.longitude, center.latitude])
        .setPopup(
            new mapboxgl.Popup({ offset: 25 }) // add popups
                .setHTML(`<span> <a href="/${center._id}"> ${center.name} </a></span>`)
        )

        .addTo(map);

}
// let allElemnets = document.querySelectorAll();

let dict = {
    'en': {
        'EnglishL': 'English',
        'ArabicL': 'Arabic',
        'Slogan1': 'the best for you',
        'Slogan2': 'showed for you',
        'moreInfo': 'find and share more information',
        'vaccineHolders': 'about Vaccine Holders',
        'tracking': 'Start Tracking',
        'aboutUs': 'about Us',
        'governorates': 'Governorates',
        'districts': 'Districts',
        'centers': 'Centers',
        'results': 'Results',
        'filters': 'Filters'
    },
    'ar':
    {
        'EnglishL': 'الإنجليزية',
        'ArabicL': 'العربية',
        'Slogan1': 'الأفضل لك',
        'Slogan2': 'يظهر لك',
        'moreInfo': 'شاهد و شارك المزيد من المعلومات ',
        'vaccineHolders': 'عن الحاصلين علی اللقاح',
        'tracking': 'ابدأ التتبع',
        'aboutUs': 'عنا',
        'governorates': 'المحافظات',
        'districts': 'الأحياء',
        'centers': 'المراكز',
        'results': 'النتائج',
        'filters': 'التصفيات'
    }
};
const dictLang = dict[language];
for (let attr in dictLang) {
    let element = document.querySelector(`.${attr}`);
    console.log(dictLang[attr])
    element.innerHTML = dictLang[attr]
}
if (language === 'ar') {
    document.querySelector('#lang-ar').setAttribute('href', "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.rtl.min.css" )
    document.querySelector('#lang-en').removeAttribute('href', "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.rtl.min.css" )
    let html =  document.querySelector('html')
    html.setAttribute('lang' , 'ar')
    html.setAttribute('dir' , 'rtl')

}
else {
    // document.querySelectorAll('*').forEach(elem => {
    //     elem.classList.remove('rtl')
    // })
    // document.querySelector('body').classList.remove('rtl')
    // document.querySelector('#language-css').removeAttribute('href')
    document.querySelector('#lang-ar').removeAttribute('href', "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.rtl.min.css" )
    document.querySelector('#lang-en').setAttribute('href', "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.rtl.min.css" )
    // document.querySelector('#language-css').setAttribute('href',"https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css")
    // document.querySelector('#language-css').setAttribute('href', "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.rtl.min.css" )
    let html =  document.querySelector('html')
    html.setAttribute('lang' , 'en' )
    html.removeAttribute('dir' )
    

}


// dictLang.forEach(element => {
//    console.log(element) 
// });


// console.log(vacCenters)

