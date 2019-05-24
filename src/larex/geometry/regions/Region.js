var PriorityPosition = require('../positions/PriorityPosition.js');
var RelativePosition = require('../positions/RelativePosition.js');
var RegionType = require('./type/RegionType');
var RegionSubType = require('./type/RegionSubType');


module.exports = function(type, minSize, maxOccurances, priorityPosition, positions = null) {

    this.type = type;
    this.minSize = minSize;
    this.maxOccurances = maxOccurances;
    this.priorityPosition = priorityPosition;

	this.calcPriorityPosition = function(maxOccurances, priorityString) {
		if (maxOccurances == 1) {
			if (priorityString.equals("top")) {
				return PriorityPosition.top;
			} else if (priorityString.equals("bottom")) {
				return PriorityPosition.bottom;
			} else if (priorityString.equals("left")) {
				return PriorityPosition.left;
			} else if (priorityString.equals("right")) {
				return PriorityPosition.right;
			}
		}
		return null;
	}

	this.calcPositionRects = function(image=null) {
		if (image == null){
			image = this.activeMat;
		}
		if (image != null){
			this.setActiveMat(image);

			for (position of this.positions) {
				let rect = position.calcRect(image);
				position.updateRect(rect, this.activeMat);
			}
		}
	}

	this.initRegions = function() {
		let positions = [];

		if(this.type.getType() == RegionType.TextRegion) {
			if (this.type.getSubtype() == RegionSubType.paragraph) {
				let position = new RelativePosition(0, 0, 1, 1);
				positions.push(position);
			} else if (this.type.getSubtype() == RegionSubType.marginalia) {
				let leftPosition = new RelativePosition(0, 0, 0.25, 1);
				let rightPosition = new RelativePosition(0.75, 0, 1, 1);
				positions.push(leftPosition);
				positions.push(rightPosition);
			} else if (this.type.getSubtype() == RegionSubType.page_number) {
				let topPosition = new RelativePosition(0, 0, 1, 0.2);
				positions.push(topPosition);
			} else if (this.type.getSubtype() == RegionSubType.header || this.type.getSubtype() == RegionSubType.heading) {
				let bottomPosition = new RelativePosition(0, 0, 1, 0.2);
				positions.push(bottomPosition);
			} else if (this.type.getSubtype() == RegionSubType.footer || type.getSubtype() == RegionSubType.footnote
					|| type.getSubtype() == RegionSubType.footnote_continued) {
				let bottomPosition = new RelativePosition(0, 0.8, 1, 1);
				positions.push(bottomPosition);
			} else if (this.type.getSubtype() != RegionSubType.ignore) {
				let defaultPosition = new RelativePosition(0.2, 0.2, 0.8, 0.8);
				positions.push(defaultPosition);
			}
		} else if(type.getType() != RegionType.ImageRegion) {
			let defaultPosition = new RelativePosition(0.2, 0.2, 0.8, 0.8);
			positions.push(defaultPosition);
		}

		this.setPositions(positions);
	}

	this.pushPosition = function(position) {
		this.positions.push(position);
		this.position.calcPercentages(this.activeMat);
		this.calcPositionRects();
	}

	this.getType = function() {
		return this.type;
	}

	this.getPageXmlIdentifier = function() {
		return this.type.toString();
	}

	this.getMinSize = function() {
		return this.minSize;
	}

	this.setMinSize = function(minSize) {
		this.minSize = minSize;
	}

	this.getPositions = function() {
		return this.positions;
	}

	this.setPositions = function(positions) {
		this.positions = positions;
	}

	this.getMaxOccurances = function() {
		return this.maxOccurances;
	}

	this.setMaxOccurances = function(maxOccurances) {
		this.maxOccurances = maxOccurances;
	}

	this.getPriorityPosition = function() {
		return this.priorityPosition;
	}

	this.getActiveMat = function() {
		return this.activeMat;
	}

	this.setActiveMat = function(activeMat) {
		this.activeMat = activeMat;
    }
    

    if (positions == null) {
        this.initRegions();
        this.calcPositionRects();
    } else {
        this.setPositions(positions);
    }

}