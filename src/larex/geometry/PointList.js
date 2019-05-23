var cv = require('../../opencv/opencv.js');

// https://stackoverflow.com/a/2117523
function uuidv4() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    )
}


module.exports = function(points, id = uuidv4()) {
    this.id = id;
    if (points.constructor.name != "Mat") {
        this.points = this.convertPoints(points);
    } else {
        this.points = points;
    }

    this.getPoints = function(){
        return this.points;
    }

    this.getResizedPoints = function(scaleFactor) {
        // multiply() somehow does not work here...
        return cv.matFromArray(this.points.rows, this.points.cols, this.points.type(),
                               this.points.data32S.map(x => x * scaleFactor));
    }

    this.convertPoints = function(points) {
        return cv.matFromArray(points.length * 2, 1, cv.CV_32SC2, 
            points.map(p => [p.x, p.y]).flat())
    }

    this.getId = function() {
        return this.id;
    }
}