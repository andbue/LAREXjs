var cv = require('../../opencv/opencv.js');

module.exports.erode = function(binary, kernelSize) {
    let result = new cv.Mat();
    let kernel = cv.Mat.ones(kernelSize, cv.CV_8U);
    cv.erode(binary, result, kernel);
    this.releaseAll(kernel);

    return result;
}

module.exports.dilate = function(binary, kernelSize) {
    let result = new cv.Mat();
    let kernel = cv.Mat.ones(kernelSize, cv.CV_8U);
    cv.dilate(binary, result, kernel);
    this.releaseAll(kernel);

    return result;
}

module.exports.calcEdges = function(gray, threshLow, threshHigh) {
    let edges = new cv.Mat();
    cv.Canny(gray, edges, threshLow, threshHigh);

    return edges;
}

module.exports.calcEdgesAfterBlurring = function(gray, threshLow, threshHigh, kernel) {
    let blurred = new cv.Mat();
    cv.medianBlur(gray, blurred, kernel);

    let edges = new cv.Mat();
    cv.Canny(blurred, edges, threshLow, threshHigh);
    this.releaseAll(blurred);

    return edges;
}

module.exports.invertImage = function(binary) {
    let inverted = new cv.Mat(binary.rows, binary.cols, binary.type(), new cv.Scalar(255));
    cv.subtract(inverted, binary, inverted);

    return inverted;
}

module.exports.histEqual = function(gray) {
    let result = new cv.Mat();
    cv.equalizeHist(gray, result);

    return result;
}

module.exports.blurrImage = function(gray, kernelSize) {
    let result = new cv.Mat();
    cv.medianBlur(gray, result, kernelSize);

    return result;
}

module.exports.calcGray = function(source) {
    let gray = new cv.Mat();
    cv.cvtColor(source, gray, cv.COLOR_BGR2GRAY);

    return gray;
}

module.exports.calcBinary = function(gray) {
    let binary = new cv.Mat();
    cv.threshold(gray, binary, 0, 255, cv.THRESH_OTSU);

    return binary;
}

module.exports.calcBinaryFromThresh = function(gray, thresh) {
    let binary = new cv.Mat();
    cv.threshold(gray, binary, thresh, 255, cv.THRESH_BINARY);

    return binary;
}

//module.exports.calcBinaryFromTopAndBottom(source, percentage) {
    // do we need this?
//}

module.exports.resize = function(source, desiredHeight) {
    if (desiredHeight == -1){
        return source;
    }

    let result = new cv.Mat();

    let scaleFactor = source.rows / desiredHeight;
    cv.resize(source, result, new cv.Size(source.cols / scaleFactor, desiredHeight));

    return result;
}

//module.exports.img2Mat(BufferedImage in) {
    // do we need this?
//}

//public static BufferedImage mat2Img(Mat in) {
    // do we need this?
//}

module.exports.calcCenterOfGravity = function(points) {
    //Point[] points = input.toArray();

    let sumX = 0;
    let sumY = 0;

    for (let i = 0; i < points.length; i++) {
        sumX += points[i].x;
        sumY += points[i].y;
    }

    let avgX = sumX / points.length;
    let avgY = sumY / points.length;

    return new cv.Point(avgX, avgY);
}

// {tl, tr, br, bl}
//public static Point[] findLinePointOrder(MatOfPoint input) {
    // do we need this?
//}

//public static double[] calcAverageBackground(Mat original) {
    // do we need this?
//}

//public static double[] calcAverageBackgroundGray(Mat gray) {
    // do we need this?
//}

module.exports.releaseAll = function(...mats) {
    for(let mat of mats) {
        if (mat != null) {
            mat.delete();
            mat = null;
        }
    }
}


module.exports.calcCenterOfGravityOCV = function(points, forceCogInContour) {
    //Point[] points = input.toArray();

    let sumX = 0;
    let sumY = 0;

    for (let i = 0; i < points.length; i++) {
        sumX += points[i].x;
        sumY += points[i].y;
    }

    let avgX = sumX / points.length;
    let avgY = sumY / points.length;

    let cog = new cv.Point(Math.round(avgX), Math.round(avgY));

    if (forceCogInContour) {
        if (cv.pointPolygonTest(points, cog, false) < 0) {
            candidates = new Array();

            for (let point of points) {
                if (point.x == cog.x || point.y == cog.y) {
                    candidates.push(point);
                }
            }

            let minDist = Number.MAX_VALUE;

            for (let candidate of candidates) {
                let dist = Math.pow(cog.x - candidate.x, 2)
                         + Math.pow(cog.y - candidate.y, 2);

                if (dist < minDist) {
                    minDist = dist;
                    cog = candidate;
                }
            }
        }
    }

    return cog;
}