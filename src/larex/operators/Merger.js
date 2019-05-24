var cv = require('../../opencv/opencv.js');
var Contourextractor = require('./Contourextractor.js');
var RegionSegment = require('../geometry/regions/RegionSegment.js');

var remove = (array, toRemove) => array.filter((value) => value != toRemove);

/**
 * Combine contours in a source image via smearing with x and y growth factors
 * to potentially speed up on contours with a large distance inbetween
 * 
 * @param contours Contours to combine
 * @param source   Source image that includes the contours
 * @param growthY  Vertical growth factor that is applied every time a smearing
 *                 iteration does not change the combined contour count
 * @param growthX  Horizontal growth factor that is applied every time a
 *                 smearing iteration does not change the combined contour count
 * @return MatOfPoint contour that includes all contours
 */
module.exports.smearMerge = function(contours, source,
                                     growthY=2.5, growthX=1.5 , maxIterations=10) {
    throw "Merger.smearMerge not implemented."

    // if (contours.size() < 1)
    //     throw "Can't combine 0 contours.";

    // List<MatOfPoint> workingContours = new ArrayList<>(contours);

    // Mat resultImage = new Mat(source.rows(), source.cols(), CvType.CV_8UC1, new Scalar(0));
    // Imgproc.drawContours(resultImage, new ArrayList<>(workingContours), -1, new Scalar(255), -1);
    // Mat workImage = resultImage.clone();

    // double growingX = 1;
    // double growingY = 1;
    // int previousContourCount = contours.size();

    // final int cols = resultImage.cols();
    // final int rows = resultImage.rows();

    // int top = rows;
    // int bottom = 0;
    // int left = cols;
    // int right = 0;
    // int it = 0;
    // while (workingContours.size() > 1 ) {
    //     // Smear Contours to combine them
    //     // Calc center x and y via moments
    //     final List<Integer> heights = new ArrayList<>();
    //     final List<Integer> widths = new ArrayList<>();
    //     for (MatOfPoint contour : workingContours) {
    //         final Rect bounds = Imgproc.boundingRect(contour);

    //         top = bounds.y <= top ? bounds.y - 1 : top;
    //         bottom = bounds.br().y >= bottom ? (int) bounds.br().y + 1 : bottom;
    //         left = bounds.x <= left ? bounds.x - 1 : left;
    //         right = bounds.br().x >= right ? (int) bounds.br().x + 1 : right;

    //         heights.add(bounds.height);
    //         widths.add(bounds.width);
    //     }

    //     // Find median widths of contours
    //     widths.sort(COMP_DOUBLE);
    //     heights.sort(COMP_DOUBLE);

    //     final double medianDistanceX = widths.get(widths.size() / 2) * growingX;
    //     final double medianDistanceY = heights.get(heights.size() / 2) * growingY;

    //     // Smearing
    //     int[] currentGapsX = new int[rows];
    //     Arrays.fill(currentGapsX, ((int) medianDistanceX) + 1);
    //     for (int x = left; x <= right; x++) {
    //         int currentGapY = ((int) medianDistanceY) + 1;
    //         for (int y = top; y <= bottom; y++) {
    //             double value = workImage.get(y, x)[0];
    //             if (value > 0) {
    //                 // Entered Contour
    //                 final int currentGapX = currentGapsX[y];

    //                 if (currentGapY < medianDistanceY) {
    //                     // Draw over
    //                     for (int i = 1; i <= currentGapY; i++)
    //                         resultImage.put(y - i, x, new double[] { 255 });
    //                 }

    //                 if (currentGapX < medianDistanceX) {
    //                     if (currentGapX > 0)
    //                         // Draw over
    //                         for (int i = 1; i <= currentGapX; i++)
    //                             resultImage.put(y, x - i, new double[] { 255 });
    //                 }

    //                 currentGapY = 0;
    //                 currentGapsX[y] = 0;
    //             } else {
    //                 // Entered/Still in Gap
    //                 currentGapY++;
    //                 currentGapsX[y]++;
    //             }
    //         }
    //     }

    //     workingContours = new ArrayList<>(Contourextractor.fromSource(resultImage));
    //     int contourCount = workingContours.size();

    //     if (previousContourCount == contourCount) {
    //         growingX = growingX * growthX;
    //         growingY = growingY * growthY;
    //     } else {
    //         growingX = 1;
    //         growingY = 1;
    //     }

    //     // Copy current to temp
    //     for (int x = left; x <= right; x++)
    //         for (int y = top; y <= bottom; y++)
    //             if (resultImage.get(y, x)[0] > 0)
    //                 workImage.put(y, x, new double[] { 255 });
    //             else
    //                 workImage.put(y, x, new byte[] { 0 });

    //     previousContourCount = contourCount;
        
            
    //     // Fallback convex hull
    //     if(it++ > maxIterations) {
    //         MatOfInt hull = new MatOfInt();
    //         MatOfPoint contour_points = new MatOfPoint(workingContours.stream().flatMap(c -> c.toList().stream()).toArray(Point[]::new));
    //         Imgproc.convexHull(contour_points, hull);
            
    //         MatOfPoint contour_hull = new MatOfPoint();
            
    //         contour_hull.create((int) hull.size().height,1,CvType.CV_32SC2);

    //         for(int i = 0; i < hull.size().height ; i++) {
    //             int index = (int)hull.get(i, 0)[0];
    //             double[] point = new double[] {
    //                 contour_points.get(index, 0)[0], contour_points.get(index, 0)[1]
    //             };
    //             contour_hull.put(i, 0, point);
    //         } 
    //         return contour_hull;
    //     }
    // }

    // // Draw small border to account for shrinking
    // Imgproc.drawContours(resultImage, new ArrayList<>(workingContours), -1, new Scalar(255), 2);
    // workingContours = new ArrayList<>(Contourextractor.fromSource(resultImage));
    // resultImage.release();
    // workImage.release();
    // System.gc();
    // return workingContours.get(0);
}

/**
 * Merge RegionSegments by combining overlapping and drawing lines between non
 * overlapping segments
 * 
 * @param segments   Segments to merge
 * @param binarySize Dimensions of the image the segments are coming from
 * @return
 */
module.exports.lineMerge = function(segments, binarySize) {
    if (segments.size() < 2) {
        return null;
    }

    let temp = new Mat(binarySize, cv.CV_8UC1, new cv.Scalar(0));
    let contours = new cv.MatVector();
    let cogs = [];
    let biggestArea = Number.MIN_VALUE;
    let biggestRegionType = segments[0].getType();

    for (region of segments) {
        let regionContour = region.getPoints();
        contours.push_back(regionContour);

        let cog = ImageProcessor.calcCenterOfGravityOCV(region.getPoints(), true);
        cogs.add(cog);
        
        let regionArea = cv.contourArea(regionContour);
        if(biggestArea < regionArea) {
            biggestArea = regionArea;
            biggestRegionType = region.getType();
        }
    }

    cv.drawContours(temp, contours, -1, new Scalar(255), -1);

    let remainingCogs = [];
    let assignedCogs = [];

    remainingCogs = remainingCogs.concat(cogs);
    assignedCogs.push(cogs[0]);
    remainingCogs = remove(remainingCogs, cogs[0]);

    while (remainingCogs.length > 0) {
        let assignedCogTemp = null;
        let remCogTemp = null;

        let minDist = Number.MAX_VALUE;

        for (assignedCog of assignedCogs) {
            for (remainingCog of remainingCogs) {
                let dist = Math.pow(remainingCog.x - assignedCog.x, 2)
                         + Math.pow(remainingCog.y - assignedCog.y, 2);

                if (dist < minDist) {
                    assignedCogTemp = assignedCog;
                    remCogTemp = remainingCog;
                    minDist = dist;
                }
            }
        }

        cv.line(temp, assignedCogTemp, remCogTemp, new cv.Scalar(255), 2);
        assignedCogs.push(remCogTemp);
        remainingCogs = remove(remainingCogs, remCogTemp);
    }

    let contours = Contourextractor.fromInverted(temp);

    temp.delete();
    
    let newResult = new RegionSegment(biggestRegionType, contours[0]);

    return newResult;
}