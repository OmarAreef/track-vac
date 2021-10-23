const items = document.querySelectorAll(".accordion a");

function toggleAccordion() {
  this.classList.toggle('active');
  this.nextElementSibling.classList.toggle('active');
}

items.forEach(item => item.addEventListener('click', toggleAccordion));
let dict = {
  'en': {
    'Header': 'Frequently Asked Questions',
    'Q1': 'What are the steps for writting a review?',
    'Q1Answer': 'You have to make sure first that you are signed in. To sign in :- ',
    'Q1Answer2': 'Enter the 20-digit valid registration number.',
    'Q1Answer3': 'Enter the last four digits of your national ID.',
    'Q1Answer4': 'Now you can add your review.',
    'Q2': 'How can I search for a specific center?',
    'Q2Answer1': 'Navigate to start tracking.',
    'Q2Answer2': 'You have two options :-',
    'Q2Answer3': 'Search for it in the Start Track page.',
    'Q2Answer4': 'Filter your target center by governorate then by district then by your center.',
    'Q3': 'Is there is a way to report reviews/questions/answers?',
    'Q3Answer': 'Yes, but you have first to be signed in.',
    'Q3Answer2': 'To report a review, question or answer :-',
    'Q3Answer3': 'Click on the report button beside this review/question/answer.',
    'Q3Answer4': 'Specify the reason for reporting it :- ',
    'Q3Answer5': 'Spam.',
    'Q3Answer6': 'Harassment. ',
    'Q3Answer7': 'Inappropriate.'

  },
  'ar': {
    'Header': 'الأسئلة الشائعة',
    'Q1': 'ما هي خطوات كتابة الآراء؟',
    'Q1Answer': 'يجب أن تتأكد أولاً من أنك قمت بتسجيل الدخول. لتسجيل الدخول: - ',
    'Q1Answer2': 'أدخل رقم التسجيل الصحيح المكون من 20 رقمًا.',
    'Q1Answer3': 'أدخل آخر أربعة أرقام من بطاقة هويتك الوطنية.',
    'Q1Answer4': 'الآن يمكنك إضافة رأيك.',
    'Q2': 'كيف يمكنني البحث عن مركز معين؟',
    'Q2Answer1': 'انتقل ل بدء التتبع.',
    'Q2Answer2': 'لديك خياران: -',
    'Q2Answer3': 'ابحث عنها في صفحة بدء التتبع.',
    'Q2Answer4': 'قم بتصفية المركز المستهدف حسب المحافظة ثم المنطقة ثم المركز الخاص بك.',
    'Q3': 'هل هناك طريقة للإبلاغ عن الآراء/الأسئلة/الأجوبة ؟',
    'Q3Answer': 'نعم ، ولكن يجب عليك أولاً تسجيل الدخول.',
    'Q3Answer2': 'للإبلاغ عن مراجعة أو سؤال أو إجابة: -',
    'Q3Answer3': 'انقر على زر الإبلاغ بجانب هذا الاستعراض / السؤال / الإجابة.',
    'Q3Answer4': 'حدد سبب الإبلاغ عنها: - ',
    'Q3Answer5': 'رسائل إلكترونية مزعجة.',
    'Q3Answer6': 'إزعاج. ',
    'Q3Answer7': 'غير مناسب.'
  }
}
const dictLang = dict[language];
for (let attr in dictLang) {
  let element = document.querySelector(`.${attr}`);
  console.log(dictLang[attr])
  element.innerHTML = dictLang[attr]
}
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