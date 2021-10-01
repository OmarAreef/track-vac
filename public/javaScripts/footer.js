let dictF = 
    {
        'en' : 
        {
          'Uni' : 'German University in Cairo',
          'footLocation' : 'New Cairo City. Main Entrance El-Tagamoa El-Khames',
          'CopyRights' : 'Copyright ©️ 2021• IEEE HAC & Sight',
          'ReachUs' : 'reach us :'
        },
        'ar' :
        { 
          'Uni' : 'الجامعة الألمانية في القاهرة',
          'footLocation' : 'القاهرة الجديدة',
          'CopyRights' : 'IEEE HAC & Sight • حقوق الملكية ©️ 2021',
          'ReachUs' : 'تواصل معنا'
        }
    }
const dictLangF = dictF[language];
for (let attr in dictLangF) {
    let element = document.querySelectorAll(`.${attr}`);
    console.log(dictLangF[attr])
    if (element) {
    element.forEach(elem => {
        elem.innerHTML = dictLangF[attr]
    })}
    
}
if (language === 'ar') {
    document.querySelector('#language-css').setAttribute('href', '/css/bootstrap-rtl.css')
    let allMl = document.querySelectorAll('.ml-auto');
    allMl.forEach(elem => {
        elem.classList.remove('ml-auto');
        elem.classList.add('me-auto')
        console.log(elem.classList)
    })
}
else {
    document.querySelector('#language-css').removeAttribute('href')
}
