var cv = require('../../opencv/opencv.js');
var RegionSegment = require('../geometry/regions/RegionSegment.js');
var MaxOccOneFinder = require('./MaxOccOneFinder.js');
var PAGERegionType = require('../geometry/regions/type/PAGERegionType.js');
var RegionType = require('../geometry/regions/type/RegionType.js');
var RegionSubType = require('../geometry/regions/type/RegionSubType.js');
var Candidate = require('./Candidate.js');

var area = rect => rect.height * rect.width;
var remove = (array, toRemove) => array.filter((value) => value != toRemove);

module.exports = function(regions) {

	this.isWithinRegion = function(toCheck, region) {
		for (position of region.getPositions()) {
            let openCVRect = position.getOpenCVRect();
			if (openCVRect.x <= toCheck.x && openCVRect.y <= toCheck.y  &&
                openCVRect.width >= toCheck.width && openCVRect.height >= toCheck.height) {
				return true;
			}
		}

		return false;
	}

	this.checkMaxOccUnbounded = function(candidates, region) {
		let remainingCandidates = [];
		remainingCandidates = remainingCandidates.concat(candidates);
        
		for (candidate of candidates) {
			let rect = candidate.getBoundingRect();

			if (area(rect) > region.getMinSize() && this.isWithinRegion(rect, region)) {
				let newResult = new RegionSegment(region.getType(), candidate.getContour());
				this.results.push(newResult);
				remainingCandidates = remove(remainingCandidates, candidate);
			}
		}

		return remainingCandidates;
	}

	this.checkMaxOccOne = function(candidates, region) {
		let candidate = MaxOccOneFinder.findMaxOccOne(candidates, region);

		if (candidate != null) {
			let newResult = new RegionSegment(region.getType(), candidate.getContour());
			this.results.push(newResult);

			candidates = remove(candidates, candidate);
		}

		return candidates;
	}

	this.classifyRegions = function(contours) {
        this.setCandidates(this.calcCandidates(contours));

		//for (let i = 0; i < this.regions.size(); i++) {
		//	if (this.regions.get(i).getMaxOccurances() == -1) {
		//		let remainingCandidates = this.checkMaxOccUnbounded(this.candidates, this.regions.get(i));
		//		this.setCandidates(remainingCandidates);
		//	} else {
		//		this.setCandidates(this.checkMaxOccOne(this.candidates, this.regions.get(i)));
		//	}
        //}
        for (region of this.regions) {
			if (region.getMaxOccurances() == -1) {
				let remainingCandidates = this.checkMaxOccUnbounded(this.candidates, region);
				this.setCandidates(remainingCandidates);
			} else {
				this.setCandidates(this.checkMaxOccOne(this.candidates, region));
			}
        }

		return this.results;
	}

	this.determineMinimumSize = function() {
		let minSize = Number.MAX_VALUE;

		for (region of this.regions) {
			if (region.getMinSize() < minSize) {
				minSize = region.getMinSize();
			}
		}

		return minSize;
	}

	this.calcCandidates = function(contours) {
		let candidates = [];
		let minSize = this.determineMinimumSize();

        for (let k=0; k<contours.size(); k++){
            let contour = contours.get(k);
			let boundingRect = cv.boundingRect(contour);

			if (area(boundingRect) > minSize) {
				let candidate = new Candidate(contour, boundingRect);
				candidates.push(candidate);
			}
		}

		return candidates;
	}

	// get rid of ignore and image regions, place maxOcc = 1 regions first and
	// paragraph regions last
	this.preprocessRegions = function(regions) {
		let processedRegions = [];
		let maxOccOne = [];
		let paragraphRegion = null;

		for (region of regions) {
			if (region.getType().getType() != RegionType.ImageRegion && 
					region.getType() != new PAGERegionType(RegionType.TextRegion, RegionSubType.ignore)) {
				if (RegionSubType.paragraph == region.getType().getSubtype()) {
					paragraphRegion = region;
				} else {
					if (region.getMaxOccurances() == 1) {
						maxOccOne.push(region);
					} else {
						processedRegions.push(region);
					}
				}
			}
		}

		processedRegions = processedRegions.concat(maxOccOne);
		processedRegions = processedRegions.concat(paragraphRegion);
		this.setRegions(processedRegions);
	}

	this.setRegions = function(regions) {
		this.regions = regions;
	}

	this.setResults = function(results) {
		this.results = results;
	}

	this.setCandidates = function(candidates) {
		this.candidates = candidates;
	}

    this.preprocessRegions(regions);
    this.setResults([]);
}