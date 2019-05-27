var test = require('./opencvtest.js');
document.getElementById('status').innerHTML = 'LAREX.js is ready.';
document.getElementById("btnSegment").addEventListener("click", function () {
    test.opencv("svgimage", "svg");
});

document.getElementById("btnToggleCol").addEventListener("click", function () {
    let img = document.getElementById("svgimage");
    if (img.getAttribute("filter") === "url(#filterBW)"){
        img.removeAttribute("filter");
    } else {
        img.setAttribute("filter", "url(#filterBW)");
    }
});


let svg = document.getElementById("svg");
let editor = document.getElementById("imgBox");

svg.onmousedown = function(e) {
    e.preventDefault();
    let svgBCR = svg.getBoundingClientRect();
    let edBCR = editor.getBoundingClientRect();
    let startX = svgBCR.x - edBCR.x - e.clientX;
    let startY = svgBCR.y - edBCR.y - e.clientY;

    let dragfunc = function(ce) {
        ce.preventDefault();
        
        let minX = Math.min(edBCR.width - svgBCR.width, 0)
            maxX = Math.max(edBCR.width - svgBCR.width, 0);
        let left = Math.max(minX, startX + ce.clientX);
        left = Math.min(maxX, left);

        let minY = Math.min(edBCR.height - svgBCR.height, 0)
            maxY = Math.max(edBCR.height - svgBCR.height, 0);
        let top = Math.max(minY, startY + ce.clientY);
        top = Math.min(maxY, top);

        svg.style.left = left + "px";
        svg.style.top = top + "px";
    }

    document.addEventListener("mouseup", function(e){
        e.preventDefault();
        editor.removeEventListener("mousemove", dragfunc);});
    editor.addEventListener("mousemove", dragfunc);
}

svg.parentElement.onwheel = function(e) {
    e.preventDefault();

    let scaleFac = 1 + (e.deltaY / 10)
        svgBCR = svg.getBoundingClientRect()
        edBCR = editor.getBoundingClientRect()
        scaleX = (svgBCR.left - e.clientX) / svgBCR.width
        scaleY = (svgBCR.top - e.clientY) / svgBCR.height
        startLeft = svgBCR.x - edBCR.x
        startTop = svgBCR.y - edBCR.y 
        newH = svgBCR.height * scaleFac
        newW = svgBCR.width * scaleFac
        posDiffW = scaleX * (newW - svgBCR.width)
        posDiffH = scaleY * (newH - svgBCR.height);

    if ((scaleFac > 1 && newH < edBCR.height * 10) ||
        (scaleFac < 1 && newH > edBCR.height / 2)) {
        svg.style.height = newH + "px";
        svg.style.left = (startLeft + posDiffW) + "px";
        svg.style.top = (startTop + posDiffH) + "px";
    }
}