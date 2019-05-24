var cv = require('../../opencv/opencv.js');

var SegmentationResult = require('./SegmentationResult.js');
var RegionSegment = require('../geometry/regions/RegionSegment.js');
var PAGERegionType = require('../geometry/regions/type/PAGERegionType.js');
var RegionType = require('../geometry/regions/type/RegionType.js');
var RegionSubType = require('../geometry/regions/type/RegionSubType.js');
var RegionClassifier = require('./RegionClassifier.js');
var ImageProcessor = require('../imageProcessing/ImageProcessor.js')
var ImageSegmentation = require('./ImageSegmentation.js');
var ImageSegType = require('./parameters/ImageSegType.js');

module.exports = function(parameters){


	this.segment = function(original) {
		// initialize image and regions
		this.init(original, this.parameters);

		// handle fixed regions and detect images
		let imageRegion = this.getImageRegion();
		let ignoreRegion = this.getIgnoreRegion();

		this.fillFixedSegments(original);

		let fixed = this.processFixedRegions(imageRegion, ignoreRegion);
		let images = this.detectImages(imageRegion, this.parameters.getImageSegType());
        for (let k=0; k<fixed.size(); k++){
            images.push_back(fixed.get(k));
        }

		// detect and classify text regionss
        let texts = this.detectText();
		let results = this.classifyText(texts);
        
        for (let k=0; k<images.size(); k++){
			let result = new RegionSegment(new PAGERegionType(RegionType.ImageRegion), images.get(k));
			results.push(result);
		}
        
		// Apply scale correction
		let scaled = [];
		for (result of results) {
			scaled.push(result.getResized(1.0 / this.parameters.getScaleFactor(original.rows)));
		}
		results = scaled;
        
		// Add fixed segments
		let  fixedSegments = this.parameters.getExistingGeometry().getFixedRegionSegments();
		for (segment of fixedSegments) {
			results.push(new RegionSegment(segment.getType(), segment.getPoints(), segment.getId()));
		}

		// Set result
		let segResult = new SegmentationResult(results);
		segResult.removeImagesWithinText();

		return segResult;
	}

	this.fillFixedSegments = function(original) {
		let fixedSegments = this.parameters.getExistingGeometry().getFixedRegionSegments();
		let contours = new cv.MatVector();

		// Add fixed segments
		for (segment of fixedSegments) {
			contours.push_back(segment.getResizedPoints(this.scaleFactor));
		}
        cv.drawContours(this.binary, contours, -1, new cv.Scalar(0), -1);
        contours.delete();
	}

	this.classifyText = function(texts) {
		let regionClassifier = new RegionClassifier(this.regions);
        let classifiedRegions = regionClassifier.classifyRegions(texts);

		return classifiedRegions;
	}

	this.detectText = function() {
		let dilate = new cv.Mat();

		if (this.parameters.getTextDilationX() == 0 || this.parameters.getTextDilationY() == 0) {
			dilate = this.binary.clone();
		} else {
			dilate = ImageProcessor.dilate(this.binary,
					new cv.Size(this.parameters.getTextDilationX(), this.parameters.getTextDilationY()));
		}

		// draw user defined lines
		dilate = this.parameters.getExistingGeometry().drawIntoImage(dilate, this.scaleFactor);

		let minSize = Number.MAX_VALUE;

		for (region of this.regions) {
			if (region.getMinSize() < minSize) {
				minSize = region.getMinSize();
			}
		}

		let texts = ImageSegmentation.detectTextContours(dilate, minSize);
		dilate.delete();

		return texts;
	}

	this.detectImages = function(imageRegion, type) {
		if (type == ImageSegType.NONE) {
			return [];
		}

		let dilate = null;

		if (this.parameters.getImageRemovalDilationX() == 0 || this.parameters.getImageRemovalDilationY() == 0) {
			dilate = this.binary.clone();
		} else {
			dilate = ImageProcessor.dilate(this.binary,
					new cv.Size(this.parameters.getImageRemovalDilationX(), this.parameters.getImageRemovalDilationY()));
		}

		// draw user defined lines
		dilate = this.parameters.getExistingGeometry().drawIntoImage(dilate, this.scaleFactor);

		let images = ImageSegmentation.detectImageContours(dilate, imageRegion.getMinSize(), type,
				this.parameters.isCombineImages());


        for (let k=0; k<images.size(); k++){
            let cnt = images.get(k);
            let rect = cv.boundingRect(cnt);
            for (let i = rect.x; i < rect.x + rect.width; i++){
                for (let j = rect.y; j < rect.y + rect.height; j++){
                    if (cv.pointPolygonTest(cnt, new cv.Point(i, j), false) >= 0){
                    this.binary.ucharPtr(j, i)[0] = 0;
                    }
                }
            }
            cnt.delete();
        }
		
		dilate.delete();
		return images;
	}

	// TODO: remove redundancy
	this.processFixedRegions = function(imageRegion, ignoreRegion) {
		let fixed = new cv.MatVector();

		for (region of this.regions) {
			if ((region.getType().getType() == RegionType.ImageRegion ||
					RegionSubType.ignore == region.getType().getSubtype())) {
				for (position of region.getPositions()) {
					if (position.isFixed()) {
						let rect = position.getOpenCVRect();
						let removed = this.binary.clone();
						cv.rectangle(removed, new cv.Point(rect.x, rect.y),
                            new cv.Point(rect.x + rect.width, rect.y + rect.height), new Scalar(0), -1);
						this.binary = removed;

						if (region.getType().getType() == RegionType.ImageRegion) {
                            let points = [ new cv.Point(rect.x, rect.y), new cv.Point(rect.x + rect.width, rect.y), 
                                new cv.Point(rect.x + rect.width, rect.y + rect.height), new cv.Point(rect.x, rect.y + rect.width) ];
                            let pointmat = cv.matFromArray(points.length * 2, 1, cv.CV_32SC2, points.map(p => [p.x, p.y]).flat())
							fixed.push_back(pointmat);
						}
					}
				}
			}
		}

		return fixed;
	}

	this.getIgnoreRegion = function() {
		for (region of this.regions) {
			if (RegionSubType.ignore == region.getType().getSubtype()) {
				return region;
			}
		}

		return null;
	}

	this.getImageRegion = function() {
		for (region of this.regions) {
			if ((region.getType().getType() == RegionType.ImageRegion)) {
				return region;
			}
		}

		return null;
	}

	this.calcTrueRegionSize = function(image, regions) {
		for (region of regions) {
			region.calcPositionRects(image);
		}

		this.regions = regions;
	}

	this.init = function(original, parameters) {
		this.scaleFactor = parameters.getScaleFactor(original.rows);
		let resized = ImageProcessor.resize(original, parameters.getDesiredImageHeight());
		let gray = ImageProcessor.calcGray(resized);
		// calculate region size
		this.calcTrueRegionSize(resized, parameters.getRegionManager().getRegions());

		// binarize
		let binaryThresh = parameters.getBinaryThresh();
		let binary = new cv.Mat();

		if (binaryThresh == -1) {
			binary = ImageProcessor.calcBinary(gray);
		} else {
			binary = ImageProcessor.calcBinaryFromThresh(gray, binaryThresh);
		}

		binary = ImageProcessor.invertImage(binary);
		this.binary = binary;

		gray.delete()
		resized.delete()
	}

	this.setParameters = function(parameters) {
		this.parameters = parameters;
	}

	this.delete = function() {
		if (this.binary != null){
			this.binary.delete();
			this.binary = null;
		}
		// remove this.regions
	}

    this.setParameters(parameters);
}