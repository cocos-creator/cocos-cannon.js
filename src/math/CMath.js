

var rad2ang = 180 / Math.PI;
function radian2angle (rad) {
    return rad * rad2ang;
}

var sinArr = {};
function calculateSinByDigit (digit) {
    if (sinArr.digit == digit) return;
    var step = 1 / Math.pow(10, digit);
    for (var i = 0; i <= 90; i += step) {
        sinArr[i.toFixed(digit)] = Math.sin(i / rad2ang);
    }
    sinArr.digit = digit;
}

function sin360 (angle, digit) {
    if (angle <= 90) {
        return sinArr[angle.toFixed(digit)];
    } else if (angle <= 180) {
        angle = 180 - angle;
        return sinArr[angle.toFixed(digit)];
    } else if (angle <= 270) {
        angle = angle - 180;
        return -sinArr[angle.toFixed(digit)];
    } else {
        angle = 360 - angle;
        return -sinArr[angle.toFixed(digit)];
    }
}

function sin (rad) {
    var angle = radian2angle(rad) % 360;
    if (angle < 0) { angle += 360; }
    return sin360(angle, CMath._digit);
}

function cos (rad) {
    var angle = (radian2angle(rad) + 90) % 360;
    if (angle < 0) { angle += 360; }
    return sin360(angle, CMath._digit);
}

function sinNative (rad) {
    return Math.sin(rad).toFixed(CMath.digit);
}

function cosNative (rad) {
    return Math.cos(rad).toFixed(CMath.digit);
}

var CMath = {
    sin: Math.sin,
    cos: Math.cos,
    atan2: Math.atan2,
}

CMath._sin = sin;
CMath._cos = cos;
CMath._sinArr = sinArr;
CMath._sin360 = sin360;
CMath._sinNative = sinNative;
CMath._cosNative = cosNative;
CMath._radian2angle = radian2angle;
CMath._calculateSinByDigit = calculateSinByDigit;

CMath._digit = 1;
Object.defineProperty(CMath, 'digit', {
    'get': function () { return this._digit; },
    'set': function (v) {
        this._digit = v;
        if (this._mode == 1) calculateSinByDigit(v);
    }
});

CMath._mode = 0;
Object.defineProperty(CMath, 'mode', {
    'get': function () { return this._mode; },
    'set': function (v) {
        if (this._mode != v) {
            this._mode = v;
            if (v == 0) {
                CMath.sin = Math.sin;
                CMath.cos = Math.cos;
            } else if (v == 1) {
                CMath.digit = CMath._digit;
                CMath.sin = sin;
                CMath.cos = cos;
            } else if (v == 2) {
                CMath.sin = sinNative;
                CMath.cos = cosNative;
            }
        }
    }
});

module.exports = CMath;
