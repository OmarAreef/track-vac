
function on() {
    document.getElementById("sign").classList.add('overlay-visible');
}

function off() {
    document.getElementById("sign").classList.remove('overlay-visible');
}
let sign = document.querySelector('#signin') ;
sign.addEventListener('click' , on);
let close_sign = document.querySelector('#close_sign') ;
close_sign.addEventListener('click' , off);