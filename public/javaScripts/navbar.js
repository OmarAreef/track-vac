console.log('hererarq')
let dictNav = {
    'en': {
        'button1': 'About us',
        'button2': 'FAQ',
        'button3': 'Sign in',
        'button4': 'Log out',
        'REGnumber' : 'Registration Number' ,
        'IDD' : 'Last 4 Digits From ID'
    },
    'ar': {
        'button1': 'معلومات عنا',
        'button2': 'س و ج',
        'button3': 'تسجيل الدخول',
        'button4': 'تسجيل خروج',
        'REGnumber' : 'رقم تسجيل وزارة الصحة' ,
        'IDD' : 'اخر اربع ارقام من البطاقة'

    }
}
const dictLangNav = dictNav[language];
for (let attr in dictLangNav) {
    let element = document.querySelectorAll(`.${attr}`);
    console.log(dictLangNav[attr])

    if (element) {
        element.forEach(elem => {
            elem.innerHTML = dictLangNav[attr]
        })
    }


}

// if (language === 'ar') {
//     document.querySelector('#lang-ar').setAttribute('href', "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.rtl.min.css")
//     document.querySelector('#lang-en').removeAttribute('href', "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.rtl.min.css")
//     let html = document.querySelector('html')
//     html.setAttribute('lang', 'ar')
//     html.setAttribute('dir', 'rtl')

// }
// else {
//     // document.querySelectorAll('*').forEach(elem => {
//     //     elem.classList.remove('rtl')
//     // })
//     // document.querySelector('body').classList.remove('rtl')
//     // document.querySelector('#language-css').removeAttribute('href')
//     document.querySelector('#lang-ar').removeAttribute('href', "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.rtl.min.css")
//     document.querySelector('#lang-en').setAttribute('href', "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.rtl.min.css")
//     // document.querySelector('#language-css').setAttribute('href',"https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css")
//     // document.querySelector('#language-css').setAttribute('href', "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.rtl.min.css" )
//     let html = document.querySelector('html')
//     html.setAttribute('lang', 'en')
//     html.removeAttribute('dir')


// }