var cv = require('../../opencv/opencv.js');
var RegionType = require('../geometry/regions/type/RegionType.js');

var remove = (array, toRemove) => array.filter((value) => value != toRemove);
var removeAll = (array, toRemoveArray) => {
    for (toRemove of toRemoveArray) {
        array = remove(array, toRemove)
    }
    return array;
    };

module.exports = function(regions) {

	this.getRegionByID = function(id){
		for (roRegion of this.regions) {
			if (roRegion.getId() == id) {
				return roRegion;
			}
		}
		return null;
	}
	
	this.identifyImageList = function() {
		let images = [];

		for (region of this.regions) {
			if (region.getType().getType() == RegionType.ImageRegion) {
				images.push(region);
			}
		}

		return images;
	}

	this.rectIsWithinText = function(rect) {
		for (region of this.regions) {
			let contour2f = region.getPoints();

			if (cv.pointPolygonTest(contour2f, new cv.Point(rect.x, rect.y), false) > 0
					&& cv.pointPolygonTest(contour2f, new cv.Point(rect.width, rect.height), false) > 0) {
				return true;
            }
		}

		return false;
	}

	this.removeImagesWithinText = function() {
		let imageList = this.identifyImageList();

		if (imageList.length == 0) {
			return;
		}

		let keep = [];

		for (image of imageList) {
			let imageRect = cv.boundingRect(image.getPoints());

			if (!this.rectIsWithinText(imageRect)) {
				keep.push(image);
			}
		}

		imageList = removeAll(this.regions, imageList);
		this.regions = this.regions.concat(keep);
	}

	this.getRegions = function() {
		return this.regions;
	}

	this.getReadingOrder = function() {
		return this.heightreadingOrder;
	}

	this.setReadingOrder = function(readingOrder) {
		this.readingOrder = readingOrder;
    }
    
    this.regions = regions;
    this.setReadingOrder([]);
}