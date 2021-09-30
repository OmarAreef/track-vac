const items = document.querySelectorAll(".accordion a");
 
function toggleAccordion(){
  this.classList.toggle('active');
  this.nextElementSibling.classList.toggle('active');
}
 
items.forEach(item => item.addEventListener('click', toggleAccordion));
let dict = {
  'en': {
    'Header': 'Frequently Asked Questions',
    'Q1': 'What are the steps for writting a review?',
    'Q1Answer': 'You have to make sure first that you are signed in.To sign in, you have to be vaccinated by entering a valid registration number and the last for digits of your national ID.Then, you can simply add your review.',
    'Q2': 'How can I search for a specific center?',
    'Q2Answer': 'First you have to naviagte to the start tracking You have 2 options: 1-To search for it in the Start Track page. 2-You can filter your target center by governorate then by district then by your center.',
   'Q3': 'Is there is a way to report a review?',
    'Q3Answer': 'Yes but you have first to be signed in.If you find an appropriate review you can report it by mark it as Spam, Harassment or inappropriate.'
  },
  'ar': {
    'Header': 'الأسئلة الشائعة',
    'Q1': 'ما هي خطوات كتابة الاراء؟',
    'Q1Answer': 'يجب عليك التأكد أولاً من تسجيل الدخول. لتسجيل الدخول ، يجب أن تحصل على التطعيم عن طريق إدخال رقم تسجيل صالح وآخر رقم من أرقام الهوية الوطنية الخاصة بك.بعد ذلك ، يمكنك ببساطة إضافة رأيك', 
    'Q2': 'كيف يمكنني البحث عن مركز معين؟',
    'Q2Answer': 'أولا عليك أن تنتقل إلى تتبع البدء لديك خياران: 1 - للبحث عنه في صفحة بدء المسار.  2-يمكنك تصفية المركز المستهدف حسب المحافظة ثم المنطقة ثم المركز الخاص بك.',
    'Q3': 'هل هناك طريقة للإبلاغ عن الاراء ؟',
    'Q3Answer': 'عم ولكن يجب عليك أولا تسجيل الدخول. إذا وجدت تعليقًا مناسبًا ، يمكنك الإبلاغ عنه عن طريق وضع علامة عليه كرسالة غير مرغوب فيها أو مضايقة أو غير ملائمة.'
  }
}
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