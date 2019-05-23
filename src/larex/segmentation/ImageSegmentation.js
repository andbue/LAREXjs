var cv = require('../../opencv/opencv.js');
var Contourextractor = require('../operators/Contourextractor.js');
var ImageSegType = require('./parameters/ImageSegType.js');

var area = rect => rect.height * rect.width;

module.exports.combineContours = function(contours, image, type) {
    let binary = new cv.Mat(image.rows, image.cols, cv.CV_8U, new cv.Scalar(0));
    
    for (let i = 0; i < contours.size(); i++) {
        let contour = contours.get(i);
        if(type == ImageSegType.STRAIGHT_RECT) {
            let rect = cv.boundingRect(contour);
            cv.rectangle(binary, new cv.Point(rect.x, rect.y),
                                 new cv.Point(rect.x + rect.width, rect.y + rect.height),
                            new cv.Scalar(255), -1);
        } else if(type == ImageSegType.ROTATED_RECT) {
            let rect = cv.minAreaRect(contour);
            let points = cv.RotatedRect.points(rect);
            
            //fillConvexPoly not available in opencv.js...
            //cv.fillConvexPoly(binary, points, new cv.Scalar(255));
            for (let i = 0; i < 4; i++) {
                cv.line(binary, points[i], points[(i + 1) % 4], new cv.Scalar(255), 1, cv.LINE_8, 0);
            }
        }
        contour.delete();
    }
    results = Contourextractor.fromInverted(binary);

    binary.delete();
    return results;
}

module.exports.detectTextContours = function(binary, minSize) {
    let contours = Contourextractor.fromInverted(binary);
    let results = new cv.MatVector();

    for (let i = 0; i < contours.size(); i++) {
        let contour = contours.get(i);
        let rect = cv.boundingRect(contour);

        if (area(rect) > minSize) {
            results.push_back(contour);
        }
        contour.delete();
    }
    contours.delete();

    return results;
}

module.exports.detectImageContours = function(binary, minSize, type, combine) {
    let contours = Contourextractor.fromInverted(binary);
    let results = new cv.MatVector();

    for (let i = 0; i < contours.size(); i++) {
        let contour = contours.get(i);
        if(type == ImageSegType.STRAIGHT_RECT) {
            let rect = cv.boundingRect(contour);
            
            if (area(rect) > minSize) {
                let points = [
                    rect.x, rect.y,
                    rect.x + rect.width, rect.y,
                    rect.x + rect.width, rect.y + rect.height,
                    rect.x, rect.y + rect.height
                ];
                let resmat = cv.matFromArray(4, 1, contour.type(), points)
                results.push_back(resmat);
                resmat.delete();
            }
        } else if(type == ImageSegType.ROTATED_RECT) {
            let rect = cv.minAreaRect(contour);
            
            if (area(cv.RotatedRect.boundingRect(rect)) > minSize) {
                let resmat = cv.matFromArray(4, 1, contour.type(),
                    cv.RotatedRect.points(rect).map(x => [x.x, x.y]).flat());
                results.push_back(resmat);
                resmat.delete();
            }
        } else if(type == ImageSegType.CONTOUR_ONLY) {
            if(cv.contourArea(contour) > minSize) {
                results.push_back(contour);
            }
        }
        contour.delete();
    }


    if (combine) {
        if(type == ImageSegType.STRAIGHT_RECT || type == ImageSegType.ROTATED_RECT) {
            combinedResults = this.combineContours(results, binary, type);
            
            return combinedResults;
        }
    }

    return results;
}