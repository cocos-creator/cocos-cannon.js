module.exports = TupleDictionary;

/**
 * @class TupleDictionary
 * @constructor
 */
function TupleDictionary() {

    /**
     * The data storage
     * @property data
     * @type {Object}
     */
    this.data = { keys:[] };
}

/**
 * @method get
 * @param  {Number} i
 * @param  {Number} j
 * @return {Object}
 */
TupleDictionary.prototype.get = function(i, j) {
    if (i > j) {
        // swap
        var temp = j;
        j = i;
        i = temp;
    }
    return this.data[i+'-'+j];
};

/**
 * @method set
 * @param  {Number} i
 * @param  {Number} j
 * @param {Object} value
 */
TupleDictionary.prototype.set = function(i, j, value) {
    if (i > j) {
        var temp = j;
        j = i;
        i = temp;
    }
    var key = i+'-'+j;

    // Check if key already exists
    if(!this.get(i,j)){
        this.data.keys.push(key);
    }

    this.data[key] = value;
    return this.data[key];
};

/**
 * @method del
 * @param  {Number} i
 * @param  {Number} j
 * @returns {Boolean} is remove
 */
TupleDictionary.prototype.del = function(i, j) {
    if (i > j) {
        var temp = j;
        j = i;
        i = temp;
    }
    var key = i+'-'+j;
    var index = this.data.keys.indexOf(key);
    if (index >= 0) {
        this.data.keys.splice(index, 1);
        delete this.data[key];
        return true;
    }
    return false;
};

/**
 * @method reset
 */
TupleDictionary.prototype.reset = function() {
    this.data = { keys:[] };
};

/**
 * @method getLength
 */
TupleDictionary.prototype.getLength = function() {
    return  this.data.keys.length;
};

/**
 * @method getKeyByIndex
 * @param {Number} index
 */
TupleDictionary.prototype.getKeyByIndex = function(index) {
    return  this.data.keys[index];
};

/**
 * @method getDataByKey
 * @param {Number} Key
 */
TupleDictionary.prototype.getDataByKey = function(Key) {
    return  this.data[Key];
};