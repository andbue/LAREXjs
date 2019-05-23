var cv = require('../../opencv/opencv.js');

module.exports = function(fixedRegionSegments, cuts) {
    this.fixedRegionSegments = fixedRegionSegments;
    this.cuts = cuts;

    this.drawIntoImage = function(image, scaleFactor) {
        let result = image.clone();
        let ocvPointList = new cv.MatVector();
        
        // Resize
		for (pointList of fixedRegionSegments)
			ocvPointLists.push_back(pointList.getResizedPoints(scaleFactor));
		for (cut of cuts)
			ocvPointLists.push_back(cut.getResizedPoints(scaleFactor));

        // Draw
        cv.drawContours(result, ocvPointList, -1, new cv.Scalar(0), 2, cv.LINE_8);

        return result;
    }

    this.getFixedRegionSegments = function() {
        return this.fixedRegionSegments;
    }

    this.getCuts = function() {
        return this.cuts;
    }
}