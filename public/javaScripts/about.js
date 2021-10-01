
let dictAbout = {
    'en': {
        'header': 'What is TRACK VAC?',
        'description1': '“Track-Vac” is a website, which will contain all thenecessary information about how to receive the vaccine locally.',
        'description2': '“Track-Vac” will enable local community members to exchange and share their experience to help in the fight against the pandemic spread.',
        'description3':'Our Aim is to raise the awareness of the local community about COVID-19 vaccination process.',
        'slogan': 'The Best For You,<br><span> Showed For You.</span>',
        'meettheteam' : 'Meet the Team',
        'description4' : '“Track-Vac” is sponsored by IEEE HAC & Sight Committee <br> Grant #21-COV1-086.'
    },
    'ar': {
        'header': 'ما هوا تراكفاك؟',
        'description1': ' "تراكفاك" هو موقع إلكتروني حيث تجد كل المعلومات المهمه عن كيفية تلقي اللقاح حولك' ,
        'description2':'"تراكفاك" سيتيح لأفراد المجتمع المحلي تبادل ومشاركة تجاربهم في سبيل القضاء علي انتشار الوباء ',
        'description3':'هدفنا هو زيادة وعي المجتمع المحلي عن عملية اللقاح ضد كورونا',
        'slogan': '<span> الافضل لك </span><br>, يظهر لك',
        'meettheteam' : 'تعرف علي فريق العمل',
        'description4' : ' "تراكفاك " برعاية IEEE HAC & Sight Committee منحة  # 21-COV1-086. '
    }
}

const dictLangAbout = dictAbout[language];
for (let attr in dictLangAbout) {
    let element = document.querySelectorAll(`.${attr}`);
    console.log(dictLangAbout[attr])
    if (element) {
        element.forEach(elem => {
            elem.innerHTML = dictLangAbout[attr]
        })
    }

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