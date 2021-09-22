

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

function on() {
    document.getElementById("write_review").style.display = "block";
}

function off() {
    document.getElementById("write_review").style.display = "none";
}
let write = document.querySelector('#review');
write.addEventListener('click', on);
let close = document.querySelector('#close_review');
close.addEventListener('click', off);

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