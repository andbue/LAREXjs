var cv = require('../../opencv/opencv.js');

/**
 * Contourextractor to get all contours in an image
 */

/**
 * Find all contours on a binary copy of the source image
 * 
 * @param source Source image to search contours in
 * @return Collection of contours that are present in a binary copy of the
 *         source image
 */
exports.fromSource = function(source){
    let inverted = null;
    if (source.type() != cv.CV_8UC1) {
        let tempInverted = new cv.Mat(source.rows, source.cols, source.type());
        cv.cvtColor(source, tempInverted, cv.COLOR_BGR2GRAY);

        inverted = new cv.Mat(source.rows, source.cols, source.type());
        cv.threshold(tempInverted, inverted, 0, 255, cv.THRESH_OTSU);

        tempInverted.delete();
        cv.bitwise_not(inverted, inverted);
    } else {
        inverted = source.clone();
    }
    
    contours = this.fromInverted(inverted);
    inverted.delete();

    return contours;
}

/**
 * Find all contours on an inverted binary image
 * 
 * @param invertedBinary Image to search contours in
 * @return Collection of contours that are present in the image
 */
exports.fromInverted = function(invertedBinary){
    let contours = new cv.MatVector();
    let hierarchy = new cv.Mat();
    cv.findContours(invertedBinary, contours, hierarchy, cv.RETR_EXTERNAL, cv.CHAIN_APPROX_SIMPLE);
    hierarchy.delete();
    return contours
}

