$(document).ready(function () {
    if ($('.services-list').length) {
        $('.services-list').owlCarousel({
            loop: true,
            nav: false,
            dots: true,
            items: 3,
            margin: 30,
            autoplay: false,
            smartSpeed: 700,
            autoplayTimeout: 6000,
            responsive: {
                300: {
                    items: 2,
                    margin: 5
                },
                460: {
                    items: 2,
                    margin: 10
                },
                576: {
                    items: 3,
                    margin: 20
                },
                992: {
                    items: 4,
                    margin: 30
                }
            }
        });
    }
});
let select = document.querySelector('#language');

// select.addEventListener('click', function () {
//     let language = select.value
//     let welcoming= document.querySelector('.welcoming');
//     welcoming.innerHTML = lang[language].welcoming
//     let s= document.querySelector('#s');
//     s.innerHTML = lang[language].s
//     let mark= document.querySelector('#mark');
//     mark.innerHTML = lang[language].mark
//     let nawraz= document.querySelector('#nawraz');
//     nawraz.innerHTML = lang[language].nawraz
//     let omar= document.querySelector('#omar');
//     omar.innerHTML = lang[language].omar
//     let lina= document.querySelector('#lina');
//     lina.innerHTML = lang[language].lina
//     let amera= document.querySelector('#amera');
//     amera.innerHTML = lang[language].amera
//     let reem= document.querySelector('#reem');
//     reem.innerHTML = lang[language].reem
//     let salmateama= document.querySelector('#salmateama');
//     salmateama.innerHTML = lang[language].salmateama
//     let ahmedtamer= document.querySelector('#ahmedtamer');
//     ahmedtamer.innerHTML = lang[language].ahmedtamer
//     let ahmedsamir= document.querySelector('#ahmedsamir');
//     ahmedsamir.innerHTML = lang[language].ahmedsamir
//     let ahmedbelal= document.querySelector('#ahmedbelal');
//     ahmedbelal.innerHTML = lang[language].ahmedbelal
//     let aya= document.querySelector('#aya');
//     aya.innerHTML = lang[language].aya
//     let haidy= document.querySelector('#haidy');
//     haidy.innerHTML = lang[language].haidy
//     let khalid= document.querySelector('#khalid');
//     khalid.innerHTML = lang[language].khalid
//     let yousefelkilany= document.querySelector('#yousefelkilany');
//     yousefelkilany.innerHTML = lang[language].yousefelkilany
//     let markmalak= document.querySelector('#markmalak');
//     markmalak.innerHTML = lang[language].markmalak
//     let yousefmagdy= document.querySelector('#yousefmagdy');
//     yousefmagdy.innerHTML = lang[language].yousefmagdy
//     let lobna= document.querySelector('#lobna');
//     lobna.innerHTML = lang[language].lobna
//     let tasneemhazem= document.querySelector('#tasneemhazem');
//     tasneemhazem.innerHTML = lang[language].tasneemhazem
//     let jomanawael= document.querySelector('#jomanawael');
//     jomanawael.innerHTML = lang[language].jomanawael
//     let aliamahmoud= document.querySelector('#aliamahmoud');
//     aliamahmoud.innerHTML = lang[language].aliamahmoud
//     let eman= document.querySelector('#eman');
//     eman.innerHTML = lang[language].eman
//     let maggie= document.querySelector('#maggie');
//     maggie.innerHTML = lang[language].maggie
//     let rania= document.querySelector('#rania');
//     rania.innerHTML = lang[language].rania
//     let salmasherif= document.querySelector('#salmasherif');
//     salmasherif.innerHTML = lang[language].salmasherif
//     let slogan= document.querySelector('#Slogan');
//     slogan.innerHTML = lang[language].slagan

// });


let dict = {
    'en': {
        'welcoming': 'Welcome on board',
        's': 'Meet the team!',
        'mark': 'Mark Wafik',
        'nawraz': 'Nawraz Saeed',
        'omar': 'Omar Ahmed',
        'lina': 'Lina Emad',
        'amera': 'Amera salah',
        'reem': 'Reem Abdelrazek',
        'ahmedtamer': 'Ahmed tamer',
        'ahmedsamir': 'Ahmed Samir',
        'ahmedbelal': 'Ahmed Belal',
        'salmateama': 'Salma Teama',
        'aya': 'Aya Ahmed',
        'haidy': 'Haidy',
        'khalid': 'khaled Romeh',
        'yousefelkilany': 'Yousef El kilany',
        'markmalak': 'Mark Malak',
        'yousefmagdy': 'Yousef Magdy',
        'tasneemhazem': 'Tasneem Hazem',
        'jomanawael': 'Jomana Wael',
        'aliamahmoud': 'Alia Mahmoud',
        'salmasherif': 'Salma Sherif',
        'lobna': 'Lobna',
        'eman': 'Dr. Eman Azab<br><ul><li> Assistant Professor at the German University in Cairo </li><li>Faculty of Information Engineering & Technology </li><li> IEEE Senior Member </li><li> WIE Egypt Board Member</li></ul>',
        'maggie': 'Dr. Maggie Mashaly<br><ul><li> Assistant Professor at the German University in Cairo </li><li>Faculty of Information Engineering & Technology </li><li> IEEE Senior Member </li><li> WIE Egypt Board Member</li></ul>',
        'rania': 'Assoc. Prof. Rania Sweif<br><ul><li> Associate Professor at the Ain Shams University</li><li>Faculty of Engineering  </li><li> IEEE Senior Member </li><li> WIE Egypt Board Member</li></ul>',
        'slogan': ' The Best For You,<br><span class="s"> Showed For You.</span> ',


    },
    'ar': {
        'welcoming': 'مرحبا بك',
        's': 'تعرف علي الفريق',
        'mark': 'مارك وفيق',
        'nawraz': 'نورز سعيد',
        'omar': 'عمر أحمد',
        'lina': 'لينا عماد',
        'amera': 'أميرة صلاح',
        'reem': 'ريم أحمد',
        'ahmedtamer': 'أحمد تامر',
        'ahmedsamir': 'أحمد سمير',
        'ahmedbelal': 'أحمد بلال',
        'salmateama': 'سلمي طعيمة',
        'aya': 'آية أحمد',
        'haidy': 'هايدي تحفة',
        'khalid': 'خالد رميح',
        'yousefelkilany': 'يوسف الكيلاني',
        'markmalak': 'مارك ملاك',
        'yousefmagdy': 'يوسف مجدي',
        'tasneemhazem': 'تسنيم حازم',
        'jomanawael': 'جمانة وائل',
        'aliamahmoud': 'عليا محمود',
        'salmasherif': 'سلمي شريف',
        'lobna': 'لبني النحاس',
        'eman': 'د/إيمان عزب<br><ul><li> دكتور مساعدة بالجامعة الألمانية بالقاهرة </li><li>كلية هندسة وتكنولوجيا المعلومات  </li><li> IEEE  عضو سابق في </li><li> WIE Egypt عضو مسؤول في</li></ul>',
        'maggie': 'د/ماجي مشالي<br><ul><li> دكتور مساعدة بالجامعة الألمانية بالقاهرة </li><li>كلية هندسة وتكنولوجيا المعلومات  </li><li> IEEE  عضو سابق في </li><li> WIE Egypt عضو مسؤول في</li></ul>',
        'rania': 'د/رانيا سويف<br><ul><li> دكتور مساعدة بجامعة عين شمس</li><li>كلية الهندسة  </li><li> IEEE عضو سابق في </li><li> WIE Egypt عضو مسؤول في</li></ul>',
        'slogan': '<span class="s"> الافضل لك </span><br>, يظهر لك',

    }
}
function changelang() {
    let language = select.value
    const dictLang = dict[language];
    for (let attr in dictLang) {
        let element = document.querySelectorAll(`#${attr}`);
        console.log(dictLang[attr])
        if (element) {
            element.forEach(elem => {
                elem.innerHTML = dictLang[attr]
            })
        }
    }
}

select.addEventListener('change', function () {
    changelang() ;

})

changelang();


if (language === 'ar') {
    document.querySelector('#lang-ar').setAttribute('href', "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.rtl.min.css")
    document.querySelector('#lang-en').removeAttribute('href', "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.rtl.min.css")
    let html = document.querySelector('html')
    html.setAttribute('lang', 'ar')
    html.setAttribute('dir', 'rtl')

}
else {
    // document.querySelectorAll('*').forEach(elem => {
    //     elem.classList.remove('rtl')
    // })
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