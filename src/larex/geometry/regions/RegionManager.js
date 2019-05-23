var PriorityPosition = require('../positions/PriorityPosition.js');
var PAGERegionType = require('./type/PAGERegionType.js');
var Region = require('./Region.js');
var RegionType = require('./type/RegionType.js');
var RegionSubType = require('./type/RegionSubType.js');
var DEFAULT_Parameters = require('../../segmentation/parameters/DEFAULT_Parameters.js');

module.exports = function() {

	this.initRegions = function() {
		regions = [];

		let imageRegion = new Region(new PAGERegionType(RegionType.ImageRegion), 
				DEFAULT_Parameters.getImageMinSizeDefault(), -1, null, null);
		let paragraphRegion = new Region(new PAGERegionType(RegionType.TextRegion,RegionSubType.paragraph), 
				DEFAULT_Parameters.getParagraphMinSizeDefault(), -1, null, null);
		let marginaliaRegion = new Region(new PAGERegionType(RegionType.TextRegion,RegionSubType.marginalia), 
				DEFAULT_Parameters.getMarginaliaMinSizeDefault(), -1, null, null);
		let pageNumberRegion = new Region(new PAGERegionType(RegionType.TextRegion,RegionSubType.page_number), 
				DEFAULT_Parameters.getPageNumberMinSizeDefault(), 1, PriorityPosition.top, null);
		let ignoreRegion = new Region(new PAGERegionType(RegionType.TextRegion,RegionSubType.ignore), 0, -1, null, null);

		regions.push(imageRegion);
		regions.push(paragraphRegion);
		regions.push(marginaliaRegion);
		regions.push(pageNumberRegion);
		regions.push(ignoreRegion);

		this.setRegions(regions);
	}

	this.getRegionByType = function(type) {
		for (region of regions) {
			if (region.getType() == type) {
				return region;
			}
        }
        
		return null;
	}

	this.pushRegion = function(region) {
		this.regions.push(region);
	}

	this.getRegions = function() {
		return this.regions;
	}

	this.setRegions = function(regions) {
		this.regions = regions;
    }
    
    this.initRegions();
}