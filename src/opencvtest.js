var cv = require('./opencv/opencv.js');

var Segmenter = require('./larex/segmentation/Segmenter.js');
var Parameters = require('./larex/segmentation/parameters/Parameters.js');

module.exports.opencv = function (srcselector, svgselector){
  let img = document.getElementById(srcselector);
  let canvas = document.createElement("canvas");
  let img_w = img.width.baseVal.value;
  let img_h = img.height.baseVal.value;
  canvas.width = img_w;
  canvas.height = img_h;
  let ctx=canvas.getContext("2d");
  ctx.drawImage(img, 0, 0, img_w, img_h);
  
  let mat = cv.imread(canvas);
  canvas.remove();

  let segmenter = new Segmenter(new Parameters());
  let segmentation = segmenter.segment(mat);

  let svg = document.getElementById(svgselector);
  while (svg.lastChild.tagName == "polygon") svg.removeChild(svg.lastChild)
  let svgns = "http://www.w3.org/2000/svg";
  for (region of segmentation.regions){
    let newelement = document.createElementNS(svgns, 'polygon');
    newelement.setAttribute("id",region.id);
    newelement.setAttribute("points", region.points.data32S.join(" "));
    newelement.classList.add(region.type.toString());
    svg.append(newelement);
    }


    segmentation.delete();
    segmenter.delete();
    mat.delete();
  }
