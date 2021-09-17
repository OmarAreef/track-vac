
function on() {
    document.getElementById("sign").style.display = "block";
}

function off() {
    document.getElementById("sign").style.display = "none";
}
let sign = document.querySelector('#signin') ;
sign.addEventListener('click' , on);
let close_sign = document.querySelector('#close_sign') ;
close_sign.addEventListener('click' , off);