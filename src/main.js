var test = require('./opencvtest.js');
document.getElementById('status').innerHTML = 'LAREX.js is ready.';
document.getElementById("startbutton").addEventListener("click", function (){
    test.opencv("svgimage", "svg");
});