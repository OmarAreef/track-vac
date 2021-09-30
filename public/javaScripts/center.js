

mapboxgl.accessToken = 'pk.eyJ1Ijoib21hci1hcmVmIiwiYSI6ImNrdGx3OXZvMDBoNGwydm4ydWVrb3d0bTMifQ._DEnKPltxE3MKSmFI0KBmg';
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: point,
    zoom: 13
});
const marker1 = new mapboxgl.Marker()
    .setLngLat(point)
    .addTo(map);




function showForm(id) {
    document.getElementById(id).style.display = 'block';
    const btnEdit = "btn" + id;
    const displayEdit = "reviewDisplay" + id;
    document.getElementById(id).style.display = "block";
    document.getElementById(btnEdit).style.display = "none";
    document.getElementById(displayEdit).style.display = "none";
}
function showFormAnswer(id) {
    document.getElementById(id).style.display = 'block';
    const btnEdit = "buttonAnswer" + id;
    const displayEdit = "answerDisplay" + id;
    document.getElementById(id).style.display = "block";
    document.getElementById(btnEdit).style.display = "none";
    document.getElementById(displayEdit).style.display = "none";
}
function showFormQuestion(id) {
    document.getElementById(id).style.display = 'block';
    const btnEdit = "buttonQuestion" + id;
    const displayEdit = "questionDisplay" + id;
    document.getElementById(id).style.display = "block";
    document.getElementById(btnEdit).style.display = "none";
    document.getElementById(displayEdit).style.display = "none";
}
function addQuestion() {
    document.getElementById("question").style.display = 'flex';
    document.getElementById("addQuestionButton").style.display = 'none';
    addQuestionButton
}
function addQuestionError() {
    document.getElementById("errorLogin").style.display = 'block';
}

let dict = {
    'en': {
        'Ratings': 'Ratings',
        'Location': 'Location',
        'Service': 'Service',
        'Cleaniness': 'Cleaniness',
        'Speed': 'Speed',
        'WorkingHours': 'Openeing and Closing Hours',
        'Review': 'Write a Review',
        'Good': 'Looks Good',
        'EnterReview': 'Enter your Review here',
        'Empty': ' Review Cannot Be Empty',
        'Submit': 'Submit',
        'Reviews': 'Reviews',
        'NotAllowed': 'You are not eligible to write a review or You are not signed in.',
        'AvgRating': 'Average Rating',
        'Delete': 'Delete',
        'Edit': 'Edit',
        'Report': 'Report',
        'Spam': 'Spam',
        'Harassment': 'Harassment',
        'Inappropriate': 'Inappropriate',
        'EditReview': 'Edit your Review',
        'QuesAndAnswer': 'Questions and Answers',
        'Question': 'Question',
        'NotQuestion': 'You are not signed in to ask a question.Please sign in first.',
        'AddQuestion': 'Add Question',
        'Answer': 'Answer',
        'Add': 'Add',
        'Answers': 'Answers',
        'Delete': 'Delete' ,
        'REv' : 'Review : ',
        'QUs' : 'Question : '
    },
    'ar': {
        'Ratings': 'التقييمات',
        'Location': 'موقع',
        'Service': 'خدمة',
        'Cleaniness': 'النظافة',
        'Speed': 'السرعة',
        'WorkingHours': 'ساعات الافتتاح والختام',
        'Review': 'أكتب مراجعة',
        'Good': 'تبدو جيدا',
        'EnterReview': 'أدخل رأيك هنا',
        'Empty': 'لا يمكن أن تكون المراجعة فارغة',
        'Submit': 'تم',
        'Reviews': 'المراجعات',
        'NotAllowed': 'لست مؤهلاً لكتابة مراجعة أو أنك لم تسجل الدخول',
        'AvgRating': 'متوسط ​​تقييم',
        'Delete': 'حذف',
        'Edit': 'تحرير',
        'Report': 'تقرير',
        'Spam': 'رسائل إلكترونية مزعجة',
        'Harassment': 'إزعاج',
        'Inappropriate': 'غير لائقة',
        'EditReview': 'تحرير المراجعة الخاصة بك',
        'QuesAndAnswer': 'أسئلة وأجوبة',
        'Question': 'السؤال',
        'NotQuestion': 'أنت لم تسجل الدخول لطرح سؤال.الرجاء تسجيل الدخول أولا.',
        'AddQuestion': 'أضف سؤالا',
        'Answer': 'الاجابة',
        'AddAnswer': 'أضف اجابة',
        'Add': 'أضف',
        'Answers': 'الأجوبة',
        'Delete': 'حذف' ,
        'REv' : ' المراجعة : ',
        'QUs' : 'السوال : '
    }
}
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
function on() {
    if (user && !(userType === 'notVaccinated')) {
        document.getElementById("write_review").style.display = "block";
    }
    else {
        alert (dict[language].NotAllowed)
    }
}

function off() {
    document.getElementById("write_review").style.display = "none";
}
let write = document.querySelector('#review');
write.addEventListener('click', on);
let close = document.querySelector('#close_review');
close.addEventListener('click', off);
console.log(user)
console.log(userType)

// function on_edit() {
//     document.querySelector('.edit').style.display = "block";
// }

// function off_edit() {
//     document.querySelector('.edit').style.display = "none";
// }
// let edit = document.querySelector('.edit_review');
// edit.addEventListener('click', on_edit);
// let closeEdit = document.querySelector('#close_edit');
// closeEdit.addEventListener('click', off_edit);