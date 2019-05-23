module.exports = function(contour, boundingRect) {

    this.getContour = function() {
        return this.contour;
    }

    this.setContour = function(contour) {
        this.contour = contour;
    }

    this.getBoundingRect = function() {
        return boundingRect;
    }

    this.setBoundingRect = function(boundingRect) {
        this.boundingRect = boundingRect;
    }
    
    this.setContour(contour);
    this.setBoundingRect(boundingRect);
}