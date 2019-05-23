// DEFAULT Processing Parameters
var IMAGE_HEIGHT_DEFAULT = 1600;
var IMAGE_HEIGHT_MIN = 800;
var IMAGE_HEIGHT_MAX = 3000;
var IMAGE_HEIGHT_STEPSIZE = 100;

var BINARY_THRESH_DEFAULT = -1;
var BINARY_THRESH_MIN = -1;
var BINARY_THRESH_MAX = 255;
var BINARY_THRESH_STEPSIZE = 1;

var IMAGE_REMOVAL_DILATION_X_DEFAULT = 1;
var IMAGE_REMOVAL_DILATION_X_MIN = 0;
var IMAGE_REMOVAL_DILATION_X_MAX = 100;
var IMAGE_REMOVAL_DILATION_X_STEPSIZE = 1;

var IMAGE_REMOVAL_DILATION_Y_DEFAULT = 1;
var IMAGE_REMOVAL_DILATION_Y_MIN = 0;
var IMAGE_REMOVAL_DILATION_Y_MAX = 100;
var IMAGE_REMOVAL_DILATION_Y_STEPSIZE = 1;

var TEXT_REMOVAL_DILATION_X_DEFAULT = 20;
var TEXT_REMOVAL_DILATION_X_MIN = 1;
var TEXT_REMOVAL_DILATION_X_MAX = 100;
var TEXT_REMOVAL_DILATION_X_STEPSIZE = 1;

var TEXT_REMOVAL_DILATION_Y_DEFAULT = 15;
var TEXT_REMOVAL_DILATION_Y_MIN = 1;
var TEXT_REMOVAL_DILATION_Y_MAX = 100;
var TEXT_REMOVAL_DILATION_Y_STEPSIZE = 1;

// DEFAULT Region Parameters
var IMAGE_MIN_SIZE_DEFAULT = 3000;
var IMAGE_MIN_SIZE_MIN = 1;
var IMAGE_MIN_SIZE_MAX = 999000;
var IMAGE_MIN_SIZE_STEPSIZE = 100;

var PARAGRAPH_MIN_SIZE_DEFAULT = 2000;
var PARAGRAPH_MIN_SIZE_MIN = 1;
var PARAGRAPH_MIN_SIZE_MAX = 999000;
var PARAGRAPH_MIN_SIZE_STEPSIZE = 100;

var MARGINALIA_MIN_SIZE_DEFAULT = 2000;
var MARGINALIA_MIN_SIZE_MIN = 1;
var MARGINALIA_MIN_SIZE_MAX = 999000;
var MARGINALIA_MIN_SIZE_STEPSIZE = 100;
var MARGINALIA_LEFT_RIGHT_PERCENTAGE = 25;

var PAGE_NUMBER_MIN_SIZE_DEFAULT = 1500;
var PAGE_NUMBER_MIN_SIZE_MIN = 1;
var PAGE_NUMBER_MIN_SIZE_MAX = 999000;
var PAGE_NUMBER_MIN_SIZE_STEPSIZE = 50;
var PAGE_NUMBER_TOP_BOTTOM_PERCENTAGE = 15;

module.exports.getImageHeightDefault = function() {
    return IMAGE_HEIGHT_DEFAULT;
}

module.exports.getImageHeightMin = function() {
    return IMAGE_HEIGHT_MIN;
}

module.exports.getImageHeightMax = function() {
    return IMAGE_HEIGHT_MAX;
}

module.exports.getImageHeightStepsize = function() {
    return IMAGE_HEIGHT_STEPSIZE;
}

module.exports.getBinaryThreshDefault = function() {
    return BINARY_THRESH_DEFAULT;
}

module.exports.getBinaryThreshMin = function() {
    return BINARY_THRESH_MIN;
}

module.exports.getBinaryThreshMax = function() {
    return BINARY_THRESH_MAX;
}

module.exports.getBinaryThreshStepsize = function() {
    return BINARY_THRESH_STEPSIZE;
}

module.exports.getImageRemovalDilationXDefault = function() {
    return IMAGE_REMOVAL_DILATION_X_DEFAULT;
}

module.exports.getImageRemovalDilationXMin = function() {
    return IMAGE_REMOVAL_DILATION_X_MIN;
}

module.exports.getImageRemovalDilationXMax = function() {
    return IMAGE_REMOVAL_DILATION_X_MAX;
}

module.exports.getImageRemovalDilationXStepsize = function() {
    return IMAGE_REMOVAL_DILATION_X_STEPSIZE;
}

module.exports.getImageRemovalDilationYDefault = function() {
    return IMAGE_REMOVAL_DILATION_Y_DEFAULT;
}

module.exports.getImageRemovalDilationYMin = function() {
    return IMAGE_REMOVAL_DILATION_Y_MIN;
}

module.exports.getImageRemovalDilationYMax = function() {
    return IMAGE_REMOVAL_DILATION_Y_MAX;
}

module.exports.getImageRemovalDilationYStepsize = function() {
    return IMAGE_REMOVAL_DILATION_Y_STEPSIZE;
}

module.exports.getTextRemovalDilationXDefault = function() {
    return TEXT_REMOVAL_DILATION_X_DEFAULT;
}

module.exports.getTextRemovalDilationXMin = function() {
    return TEXT_REMOVAL_DILATION_X_MIN;
}

module.exports.getTextRemovalDilationXMax = function() {
    return TEXT_REMOVAL_DILATION_X_MAX;
}

module.exports.getTextRemovalDilationXStepsize = function() {
    return TEXT_REMOVAL_DILATION_X_STEPSIZE;
}

module.exports.getTextRemovalDilationYDefault = function() {
    return TEXT_REMOVAL_DILATION_Y_DEFAULT;
}

module.exports.getTextRemovalDilationYMin = function() {
    return TEXT_REMOVAL_DILATION_Y_MIN;
}

module.exports.getTextRemovalDilationYMax = function() {
    return TEXT_REMOVAL_DILATION_Y_MAX;
}

module.exports.getTextRemovalDilationYStepsize = function() {
    return TEXT_REMOVAL_DILATION_Y_STEPSIZE;
}

module.exports.getImageMinSizeDefault = function() {
    return IMAGE_MIN_SIZE_DEFAULT;
}

module.exports.getImageMinSizeMin = function() {
    return IMAGE_MIN_SIZE_MIN;
}

module.exports.getImageMinSizeMax = function() {
    return IMAGE_MIN_SIZE_MAX;
}

module.exports.getImageMinSizeStepsize = function() {
    return IMAGE_MIN_SIZE_STEPSIZE;
}

module.exports.getParagraphMinSizeDefault = function() {
    return PARAGRAPH_MIN_SIZE_DEFAULT;
}

module.exports.getParagraphMinSizeMin = function() {
    return PARAGRAPH_MIN_SIZE_MIN;
}

module.exports.getParagraphMinSizeMax = function() {
    return PARAGRAPH_MIN_SIZE_MAX;
}

module.exports.getParagraphMinSizeStepsize = function() {
    return PARAGRAPH_MIN_SIZE_STEPSIZE;
}

module.exports.getMarginaliaMinSizeDefault = function() {
    return MARGINALIA_MIN_SIZE_DEFAULT;
}

module.exports.getMarginaliaMinSizeMin = function() {
    return MARGINALIA_MIN_SIZE_MIN;
}

module.exports.getMarginaliaMinSizeMax = function() {
    return MARGINALIA_MIN_SIZE_MAX;
}

module.exports.getMarginaliaMinSizeStepsize = function() {
    return MARGINALIA_MIN_SIZE_STEPSIZE;
}

module.exports.getMarginaliaLeftRightPercentage = function() {
    return MARGINALIA_LEFT_RIGHT_PERCENTAGE;
}

module.exports.getPageNumberMinSizeDefault = function() {
    return PAGE_NUMBER_MIN_SIZE_DEFAULT;
}

module.exports.getPageNumberMinSizeMin = function() {
    return PAGE_NUMBER_MIN_SIZE_MIN;
}

module.exports.getPageNumberMinSizeMax = function() {
    return PAGE_NUMBER_MIN_SIZE_MAX;
}

module.exports.getPageNumberMinSizeStepsize = function() {
    return PAGE_NUMBER_MIN_SIZE_STEPSIZE;
}

module.exports.getPageNumberTopBottomPercentage = function() {
    return PAGE_NUMBER_TOP_BOTTOM_PERCENTAGE;
}
