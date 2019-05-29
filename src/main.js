var test = require('./opencvtest.js');

let svg = document.getElementById("svg");
let editor = document.getElementById("imgBox");
let thmb = document.getElementById("thumbnails");
let thmbh = document.getElementById("thumbnailhandle");

thmb.onwheel = e => {
    e.preventDefault();
    e.stopPropagation();
    //thmb.scrollBy(Math.min(e.deltaY * 5, 15), 0);
    thmb.scrollBy(e.deltaY * 5, 0);

}

thmbh.onclick = e => {
    if (thmb.style.bottom != "-10rem"){
        thmb.style.bottom = "-10rem";
        thmbh.style.bottom = ".5rem";
    } else {
        thmb.style.bottom = "0rem";
        thmbh.style.bottom = "11rem";
    }
}

let loadPage = function(sequence, id) {
    let c = sequence.getCanvasById(id);
    let imgUrl = c.getCanonicalImageUri();
    let imgW = c.getWidth();
    let imgH = c.getHeight();
    let svgFO = document.getElementById("svgFO");
    let svgimg = document.getElementById("svgimage");
    let svgregions = document.getElementById("svgregions");
    while (svgregions.lastChild) svgregions.removeChild(svgregions.lastChild);

    svg.setAttribute("viewBox", `0 0 ${imgW} ${imgH}`);
    svgFO.setAttribute("width", imgW);
    svgFO.setAttribute("height", imgH);
    svgimg.setAttribute("src", imgUrl);

    svg.style.height = "calc(100% - 5rem)"
    svg.style.left = ((editor.getBoundingClientRect().width
                     - svg.getBoundingClientRect().width) / 2  ) + "px";
    svg.style.top = "2rem";
}

iiifLoad = function(manifestAddr){
    manifesto.loadManifest(manifestAddr).then(function(manifest){
        let m = manifesto.create(manifest);
        let sequence = m.getSequenceByIndex(0)
        let canvases = sequence.getCanvases();

        while (thmb.firstChild) {
            thmb.removeChild(thmb.firstChild);
        }
        for (let canvas of canvases){
            let thmbnail = document.createElement("div");
            thmbnail.style.backgroundImage = `url(${canvas.getCanonicalImageUri()})`;
            thmbnail.setAttribute("title", canvas.getDefaultLabel());
            thmbnail.setAttribute("data-cID", canvas.id)
            thmbnail.onclick = e => {loadPage(sequence, canvas.id);}
            thmb.appendChild(thmbnail);
        }

        loadPage(sequence, canvases[0].id);
    });
}




document.getElementById('status').innerHTML = 'LAREX.js is ready.';
document.getElementById("btnSegment").addEventListener("click", function () {
    test.opencv("svgimage", "svgregions");
});

document.getElementById("btnToggleCol").addEventListener("click", function () {
    let img = document.getElementById("svgFO");
    if (img.getAttribute("filter") === "url(#filterBW)"){
        img.removeAttribute("filter");
    } else {
        img.setAttribute("filter", "url(#filterBW)");
    }
});

document.getElementById("btnLoadManifest").addEventListener("click", function () {
    iiifLoad(document.getElementById("iiifAddr").value);
});

iiifLoad(document.getElementById("iiifAddr").value);



// dragging the page image
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

// zooming the page image
svg.parentElement.onwheel = function(e) {
    e.preventDefault();

    let scale = 1 - (e.deltaY / 10)
        scaleFac = Math.min(Math.max(.6, scale), 1.4)
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


