$(document).ready(onReady);
console.log('in client.js');



function onReady(){
    console.log('in jQuery');
    let date = new Date().toLocaleDateString();
    console.log(date);
}