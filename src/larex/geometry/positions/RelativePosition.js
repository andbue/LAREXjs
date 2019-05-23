var cv = require('../../../opencv/opencv.js');


module.exports = function(topLeftXPercentage, topLeftYPercentage, bottomRightXPercentage, 
    bottomRightYPercentage) {

	this.updateRect = function(rect, image) {
		this.openCVRect = rect;
		this.calcPercentages(image);
	}

	this.calcPercentages = function(image) {
		if (this.openCVRect != null) {
			let topLeftX = this.openCVRect.x;
			let topLeftY = this.openCVRect.y;
			let bottomRightX = this.openCVRect.x + this.openCVRect.width;
			let bottomRightY = this.openCVRect.y + this.openCVRect.height;

			let tempTopLeftXPerc = topLeftX / image.cols;
			let tempTopLeftYPerc = topLeftY / image.rows;
			let tempBottomRightXPerc = bottomRightX / image.cols;
			let tempBottomRightYPerc = bottomRightY / image.rows;

			if (Math.abs(tempTopLeftXPerc - topLeftXPercentage) > 0.01) {
				setTopLeftXPercentage(tempTopLeftXPerc);
			}
			if (Math.abs(tempTopLeftYPerc - topLeftYPercentage) > 0.01) {
				setTopLeftYPercentage(tempTopLeftYPerc);
			}
			if (Math.abs(tempBottomRightXPerc - bottomRightXPercentage) > 0.01) {
				setBottomRightXPercentage(tempBottomRightXPerc);
			}
			if (Math.abs(tempBottomRightYPerc - bottomRightYPercentage) > 0.01) {
				setBottomRightYPercentage(tempBottomRightYPerc);
			}
		}
	}

	this.calcRect = function(image) {
		let tempTopLeftX = image.cols * topLeftXPercentage;
		let tempTopLeftY = image.rows * topLeftYPercentage;
		let tempBottomRightX = image.cols * bottomRightXPercentage;
		let tempBottomRightY = image.rows * bottomRightYPercentage;

		let topLeftX = image.cols * topLeftXPercentage;
		let topLeftY = image.rows* topLeftYPercentage;
		let bottomRightX = image.cols * bottomRightXPercentage;
		let bottomRightY = image.rows * bottomRightYPercentage;

		if (this.roundedUpTopLeftX) {
			this.roundedUpTopLeftX = false;
		} else {
			topLeftX = (tempTopLeftX + 1);

			if (topLeftX > image.cols - 1) {
				topLeftX = image.cols - 1;
			}

			this.roundedUpTopLeftX = true;
		}

		if (this.roundedUpTopLeftY) {
			this.roundedUpTopLeftY = false;
		} else {
			topLeftY = tempTopLeftY + 1;

			if (topLeftY > image.rows - 1) {
				topLeftY = image.rows - 1;
			}

			this.roundedUpTopLeftY = true;
		}

		if (this.roundedUpBottomRightX) {
			this.roundedUpBottomRightX = false;
		} else {
			bottomRightX = tempBottomRightX + 1;

			if (bottomRightX > image.cols - 1) {
				bottomRightX = image.cols - 1;
			}

			this.roundedUpBottomRightX = true;
		}

		if (this.roundedUpBottomRightY) {
			this.roundedUpBottomRightY = false;
		} else {
			bottomRightY = tempBottomRightY + 1;

			if (bottomRightY > image.rows - 1) {
				bottomRightY = image.rows - 1;
			}

			this.roundedUpBottomRightY = true;
		}

		// even out rounding errors at the outer border of the image
		if (topLeftX == 1) {
			topLeftX = 0;
		}

		if (topLeftY == 1) {
			topLeftY = 0;
		}

		if (bottomRightX == image.cols - 2) {
			bottomRightX = image.cols - 1;
		}

		if (bottomRightY == image.rows - 2) {
			bottomRightY = image.rows - 1;
		}

		// argh
		if (topLeftXPercentage < 0.05) {
			topLeftXPercentage = 0;
		}
		
		if (topLeftYPercentage < 0.05) {
			topLeftYPercentage = 0;
		}
		
		if (bottomRightXPercentage > 0.95) {
			bottomRightXPercentage = 1;
		}
		
		if (bottomRightYPercentage > 0.95) {
			bottomRightYPercentage = 1;
		}
		
		let rect = new cv.Rect(topLeftX, topLeftY, bottomRightX - topLeftX, bottomRightY - topLeftY);

		return rect;
	}

	this.getTopLeftXPercentage = function() {
		return this.topLeftXPercentage;
	}

	this.setTopLeftXPercentage = function(topLeftXPercentage) {
		this.topLeftXPercentage = topLeftXPercentage;
	}

	this.getTopLeftYPercentage = function() {
		return this.topLeftYPercentage;
	}

	this.setTopLeftYPercentage = function(topLeftYPercentage) {
		this.topLeftYPercentage = topLeftYPercentage;
	}

	this.getBottomRightXPercentage = function() {
		return this.bottomRightXPercentage;
	}

	this.setBottomRightXPercentage = function(bottomRightXPercentage) {
		this.bottomRightXPercentage = bottomRightXPercentage;
	}

	this.getBottomRightYPercentage = function() {
		return this.bottomRightYPercentage;
	}

	this.setBottomRightYPercentage = function(bottomRightYPercentage) {
		this.bottomRightYPercentage = bottomRightYPercentage;
	}

	this.isFixed = function(){
		return this.isFixxed;
	}

	this.setFixed = function(isFixed) {
		this.isFixxed = isFixed;
	}

	this.getOpenCVRect = function(){
		return this.openCVRect;
    }
    
    this.setTopLeftXPercentage(topLeftXPercentage);
    this.setTopLeftYPercentage(topLeftYPercentage);
    this.setBottomRightXPercentage(bottomRightXPercentage);
    this.setBottomRightYPercentage(bottomRightYPercentage);

    this.isFixxed = false;
	this.roundedUpTopLeftX = false;
	this.roundedUpTopLeftY = false;
	this.roundedUpBottomRightX = false;
	this.roundedUpBottomRightY = false;
}