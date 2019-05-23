var DEFAULT_Parameters = require('./DEFAULT_Parameters.js');
var ImageSegType = require('./ImageSegType.js');
var RegionManager = require('../../geometry/regions/RegionManager.js')
var ExistingGeometry = require('../../geometry/ExistingGeometry.js');

//originalHeight needed?
module.exports = function(regionManager = new RegionManager(), originalHeight = 0) {
    this.regionManager = regionManager;
	this.existingGeometry = new ExistingGeometry([], []);
    this.desiredImageHeight = DEFAULT_Parameters.getImageHeightDefault();
    this.binaryThresh = DEFAULT_Parameters.getBinaryThreshDefault();

    this.imageRemovalDilationX = DEFAULT_Parameters.getImageRemovalDilationXDefault();
    this.imageRemovalDilationY = DEFAULT_Parameters.getImageRemovalDilationYDefault();

    this.textDilationX = DEFAULT_Parameters.getTextRemovalDilationXDefault();
    this.textDilationY = DEFAULT_Parameters.getTextRemovalDilationYDefault();
    
	this.getRegionManager = function() {
		return this.regionManager;
	}
	
	this.getExistingGeometry = function() {
		return this.existingGeometry;
	}

	this.setExistingGeometry = function(existingGeometry) {
		this.existingGeometry = existingGeometry;
	}
	
	this.getDesiredImageHeight = function() {
		return this.desiredImageHeight;
	}

	this.getBinaryThresh = function() {
		return this.binaryThresh;
	}

	this.setBinaryThresh = function(binaryThresh) {
		this.binaryThresh = binaryThresh;
	}

	this.getImageRemovalDilationX = function() {
		return this.imageRemovalDilationX;
	}

	this.setImageRemovalDilationX = function(imageRemovalDilationX) {
		this.imageRemovalDilationX = imageRemovalDilationX;
	}

	this.getImageRemovalDilationY = function() {
		return this.imageRemovalDilationY;
	}

	this.setImageRemovalDilationY = function(imageRemovalDilationY) {
		this.imageRemovalDilationY = imageRemovalDilationY;
	}

	this.getTextDilationX = function() {
		return this.textDilationX;
	}

	this.setTextDilationX = function(textDilationX) {
		this.textDilationX = textDilationX;
	}

	this.getTextDilationY = function() {
		return this.textDilationY;
	}

	this.setTextDilationY = function(textDilationY) {
		this.textDilationY = textDilationY;
	}

	this.getScaleFactor = function(imageHeight) {
		return this.desiredImageHeight / imageHeight;
	}

	this.getImageSegType = function() {
		return this.imageSegType;
	}

	this.setImageSegType = function(imageSegType) {
		this.imageSegType = imageSegType;
	}

	this.isCombineImages = function() {
		return this.combineImages;
	}

	this.setCombineImages = function(combineImages) {
		this.combineImages = combineImages;
	}
	
	this.setImageSegType(ImageSegType.ROTATED_RECT);
    this.setCombineImages(true);
}