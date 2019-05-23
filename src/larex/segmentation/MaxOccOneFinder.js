var PriorityPosition = require('../geometry/positions/PriorityPosition.js');

var area = rect => rect.height * rect.width;

module.exports.isWithinRegion = function(toCheck, region) {
    for (position of region.getPositions()) {
        let openCVRect = position.getOpenCVRect();
        if (openCVRect.x <= toCheck.x && openCVRect.y <= toCheck.y  &&
            openCVRect.width <= toCheck.width && openCVRect.height <= toCheck.height) {
            return true;
        }
    }

    return false;
}

module.exports.checkPositions = function(candidates, region) {
    let withinPosition = [];

    for(candidate of candidates) {
        if(this.isWithinRegion(candidate.getBoundingRect(), region)) {
            withinPosition.push(candidate);
        }
    }
    
    return withinPosition;
}

module.exports.findMaxOccOne = function(candidates, region) {
    //TODO Remove because rarely used
    candidates = this.checkPositions(candidates, region);
    
    let minSize = region.getMinSize();
    let priorityPosition = region.getPriorityPosition();
    
    if (priorityPosition == PriorityPosition.top) {
        return this.calcTopRect(candidates, minSize);
    } else if (priorityPosition == PriorityPosition.bottom) {
        return this.calcBottomRect(candidates, minSize);
    } else if (priorityPosition == PriorityPosition.left) {
        return this.calcLeftRect(candidates, minSize);
    } else if (priorityPosition == PriorityPosition.right) {
        return this.calcRightRect(candidates, minSize);
    }

    return this.calcTopRect(candidates, minSize);
}

module.exports.calcTopRect = function(candidates, minSize) {
    let topCandidate = null;
    let bottomPixelY = Number.MAX_VALUE;

    for (candidate of candidates) {
        let rect = candidate.getBoundingRect();

        if (area(rect) > minSize && rect.y + rect.height < bottomPixelY) {
            bottomPixelY = rect.y + rect.height;
            topCandidate = candidate;
        }
    }

    return topCandidate;
}

module.exports.calcBottomRect = function(candidates, minSize) {
    let bottomCandidate = null;
    let bottomPixelY = -1;

    for (candidate of candidates) {
        let rect = candidate.getBoundingRect();

        if (area(rect) > minSize && rect.y > bottomPixelY) {
            bottomPixelY = rect.y;
            bottomCandidate = candidate;
        }
    }

    return bottomCandidate;
}

module.exports.calcLeftRect = function(candidates, minSize) {
    let leftCandidate = null;
    let leftPixelX = Number.MAX_VALUE;

    for (candidate of candidates) {
        let rect = candidate.getBoundingRect();

        if (area(rect) > minSize && rect.x + rect.width < leftPixelX) {
            leftPixelX = rect.x + rect.width;
            leftCandidate = candidate;
        }
    }

    return leftCandidate;
}

module.exports.calcRightRect = function(candidates, minSize) {
    let rightCandidate = null;
    let rightPixelX = -1;

    for (candidate of candidates) {
        let rect = candidate.getBoundingRect();

        if (area(rect) > minSize && rect.x > rightPixelX) {
            rightPixelX = rect.x;
            rightCandidate = candidate;
        }
    }

    return rightCandidate;
}