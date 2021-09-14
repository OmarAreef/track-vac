let select = document.querySelector('#language');

select.addEventListener('click', function () {
    let language = select.value
    let header= document.querySelector('#Header');
    
    header.innerHTML = lang[language].header
    let slogan= document.querySelector('#Slogan');
    slogan.innerHTML = lang[language].slogan
    let description= document.querySelector('#description');
    description.innerHTML = lang[language].description
    
    if (language=== 'en'){
        console.log('here')
        document.querySelector('#lang').removeAttribute('href');
        document.querySelector('.location').setAttribute('src' , 'Shape.png')
    }
    if (language === 'ar'){
        document.querySelector('#lang').setAttribute('href' , 'bootstrap-rtl.css');
        document.querySelector('.location').removeAttribute('src')
    }
    // header.innerHTML = lang[language].header

});

let lang = {
    'en': {
        'header': 'What is TRACK VAC?',
        'description': 'Track vac is a website dedicated for you to find the best choice of vaccination centers , showing real experiences from vaccinated people That their reviews are highly appretiated.',
        'slogan': 'The Best For You,<br><span> Showed For You.</span>'
    },
    'ar': {
        'header': 'ما هوا تراكفاك؟',
        'slogan': '<span> الافضل لك </span><br>, يظهر لك',
        'description': 'TarckVac هو موقع إلكتروني مخصص لك للعثور على أفضل اختيار لمراكز التطعيم.'
    }
}