var RegionType = require('./RegionType.js');
var RegionSubType = require('./RegionSubType.js');

let PAGERegionType = function(type, subtype = null) {
    this.type = type;
    this.subtype = subtype;

    this.getPoints = function(){
        return this.points;
    }

    this.getType = function() {
        return this.type;
    }

    this.getSubtype = function() {
        return this.subtype;
    }

    this.toString = function() {
		if(subtype == null){
			return this.type;
		} else {
			return this.subtype;
		}
    }
    
    this.values = function() {
        regionTypes = [];
        for(type of Object.values(RegionType)) {
            if (type == RegionType.TextRegion) {
                for(subtype of Object.values(RegionSubType)) {
                    regionTypes.push(new PAGERegionType(type,subtype));
                }
            } else {
                regionTypes.push(new PAGERegionType(type,null));
            }
        }
        return regionTypes;
    }
}

module.exports = PAGERegionType;