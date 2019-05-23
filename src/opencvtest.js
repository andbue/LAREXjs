var cv = require('./opencv/opencv.js');

var Segmenter = require('./larex/segmentation/Segmenter.js');
var Parameters = require('./larex/segmentation/parameters/Parameters.js');

module.exports.opencv = function (srcselector, svgselector){

    let mat = cv.imread(srcselector);
    let segmenter = new Segmenter(new Parameters());
    let segmentation = segmenter.segment(mat);

    let svg = document.getElementById(svgselector);
    let svgns = svg.attributes.xmlns.value;
    for (region of segmentation.regions){
      let newelement = document.createElementNS(svgns, 'polygon');
      newelement.setAttribute("id",region.id);
      newelement.setAttribute("points", region.points.data32S.join(" "));
      newelement.classList.add(region.type.toString());
      svg.append(newelement);
     }
     
     mat.delete();
  }
