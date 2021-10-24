var loader = document.querySelector('.preloader');
window.addEventListener('load', vanish);
function vanish() {
    loader.classList.add("disppear")
}
// console.log(vacCenters)

// let allElemnets = document.querySelectorAll();'
let point = [31, 31]
if (vacCenters && vacCenters.length) {
    point = [vacCenters[0].longitude, vacCenters[0].latitude];
}
mapboxgl.accessToken = 'pk.eyJ1Ijoib21hci1hcmVmIiwiYSI6ImNrdGx3OXZvMDBoNGwydm4ydWVrb3d0bTMifQ._DEnKPltxE3MKSmFI0KBmg';
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: point,
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
let dict = {
    'en': {
        'Ratings': 'Ratings',
        'Location': 'Location',
        'Service': 'Service',
        'Cleaniness': 'Cleaniness',
        'Speed': 'Speed',
        'Review': 'Write a Review',
        'Submit': 'Submit',
        'EnglishL': 'English',
        'ArabicL': 'Arabic',
        'Slogan1': 'The Best for you',
        'Slogan2': 'Showed for you,',
        'moreInfo': 'find and share more information',
        'vaccineHolders': 'about Vacination centers',
        'tracking': 'Start Tracking',
        'aboutUs': 'about Us',
        'governorates': 'Governorates',
        'districts': 'Districts',
        'centers': 'Centers',
        'results': 'Results',
        'filters': 'Filters',
        'EnterReview': 'Enter your Review here',
        'NotAllowed': 'You are not eligible to write a review or You are not signed in.',
        'select1' : 'Select governorate',
        'select2' : 'Select district',
        'select3' : 'Select center',
        'results': 'Results',
        
    },
    'ar':
    {   
        
        'Location': 'موقع',
        'Service': 'خدمة',
        'Cleaniness': 'النظافة',
        'Speed': 'السرعة',
        'Review': 'أكتب مراجعة',
        'Submit': 'تم',
        'EnglishL': 'الإنجليزية',
        'ArabicL': 'العربية',
        'Slogan1': 'الأفضل لك',
        'Slogan2': 'يظهر لك',
        'moreInfo': 'شاهد و شارك المزيد من المعلومات ',
        'vaccineHolders': 'عن اماكن تلقي اللقاح',
        'tracking': 'إبدأ التصفح',
        'aboutUs': 'من نحن',
        'governorates': 'المحافظات',
        'districts': 'المدينة',
        'centers': 'المراكز',
        'results': 'النتائج',
        'select1' : 'إختر محافظة',
        'select2' : 'إختر مدينة',
        'select3' : 'إختر مركز',
       
        'filters': 'تحديد مكان ',
        'NotAllowed': 'لست مؤهلاً لكتابة مراجعة أو أنك لم تسجل الدخول',
        
        'EnterReview': 'أدخل رأيك هنا',
    }
};
const dictLang = dict[language];
for (let attr in dictLang) {
    let element = document.querySelectorAll(`.${attr}`);
    console.log(dictLang[attr])
    if (element) {
        element.forEach(elem => {
            elem.innerHTML = dictLang[attr]
        })
    }

}
if (language === 'ar') {
    document.querySelector('#lang-ar').setAttribute('href', "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.rtl.min.css")
    document.querySelector('#lang-en').removeAttribute('href', "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.rtl.min.css")
    let html = document.querySelector('html')
    let back = document.querySelector('#background')
    let globe = document.querySelector('#globe')
    globe.style.display = 'none';
    back.classList.add('backgroundar')
    html.setAttribute('lang', 'ar')
    html.setAttribute('dir', 'rtl')

}
else {
    // document.querySelectorAll('*').forEach(elem => {
    //     elem.classList.remove('rtl')
    // })
    let back = document.querySelector('#background')
    back.classList.remove('backgroundar')
    let globe = document.querySelector('#globe')
    globe.style.display = 'inline';
    // document.querySelector('body').classList.remove('rtl')
    // document.querySelector('#language-css').removeAttribute('href')
    document.querySelector('#lang-ar').removeAttribute('href', "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.rtl.min.css")
    document.querySelector('#lang-en').setAttribute('href', "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.rtl.min.css")
    // document.querySelector('#language-css').setAttribute('href',"https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css")
    // document.querySelector('#language-css').setAttribute('href', "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.rtl.min.css" )
    let html = document.querySelector('html')
    html.setAttribute('lang', 'en')
    html.removeAttribute('dir')


}
function onR(id) {
    if (user && !(userType === 'notVaccinated')) {
        document.getElementById(id).classList.add('overlay-visible');
    }
    else {
        alert(dict[language].NotAllowed)
    }
}

function offR(id) {
    document.getElementById(id).classList.remove('overlay-visible');
}
// let write = document.querySelector('#review');
// write.addEventListener('click', on);
// let close = document.querySelector('#close_review');
// close.addEventListener('click', off);



// dictLang.forEach(element => {
//    console.log(element) 
// });


// console.log(vacCenters)

