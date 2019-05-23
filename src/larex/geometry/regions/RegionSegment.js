var PointList = require('../PointList.js');

// https://stackoverflow.com/a/2117523
function uuidv4() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    )
}

function RegionSegment(type, points, id=uuidv4()) {
		PointList.call(this, points, id);
    this.type = type;

	/**
	 * Returns the a copy of this region with resized points
	 * 
	 * @param scaleFactor Prefered_Image_Height/Original_Image_Height
	 * @return The converted and scaled clone.
	 */
	this.getResized = function(scaleFactor) {
		return new RegionSegment(type, this.getResizedPoints(scaleFactor));
	}

	this.getType = function() {
		return this.type;
	}

	this.setType = function(type) {
		this.type = type;
	}    
}

module.exports = RegionSegment;