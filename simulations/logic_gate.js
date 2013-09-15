(function(){
/*
Logic Gate - An idealized or physical device implementing a Boolean function,
that is, it performs a logical operation on one or more logical inputs,
and produces a single logical output.

https://en.wikipedia.org/wiki/Logic_gates
https://en.wikipedia.org/wiki/AND_gate
*/

var AND_GATE_MAP = [[0, 0],[0, 1]];
window.AndGate = function() {
    var that = this;
    that.super = new BaseGate(function(a, b) {
        return AND_GATE_MAP[a][b];
    });
    that.getInputAFn = function(o) { return super.getInputAFn(o); };
    that.getInputBFn = function(o) { return super.getInputBFn(o); };
    that.setOutputFn = function(o) { return super.setOutputFn(o); };
};

var OR_GATE_MAP = [[0, 1], [1,1]];
window.OrGate = function() {
    that.super = new BaseGate(function(a, b) {
        return AND_GATE_MAP[a][b];
    });
    that.getInputAFn = function(o) { return super.getInputAFn(o); };
    that.getInputBFn = function(o) { return super.getInputBFn(o); };
    that.setOutputFn = function(o) { return super.setOutputFn(o); };
};

window.NotGate = function() {
    var that = this;
    that.super = new BaseGate(function(a, b) {
        return AND_GATE_MAP[a][b] === 0 ? 1 : 0;
    });
    that.getInputAFn = function(o) { return super.getInputAFn(o); };
    that.getInputBFn = function(o) { return super.getInputBFn(o); };
    that.setOutputFn = function(o) { return super.setOutputFn(o); };
};

function BaseGate(evaluateInputsFn) {
    var that = this;
    // NO-OP
    that._outputFn = function() { return that._inputFn(); };

    /**
     * Get an input callback function from this transistor
     */
    that.getInputAFn = function() {
        return function(signal) {
            if ('boolean' !== typeof signal) {
                throw new Error('Invalid input, expected boolean signal');
            }
            that._signalA = signalA;
            if (that._outputFn) {
                that._outputFn(
                    evaluateInputsFn(that._signalA, that._signalB));
            }
        };
    };

    /**
     * Get an input callback function from this transistor
     */
    that.getInputBFn = function() {
        return function(signal) {
            if ('boolean' !== typeof signal) {
                throw new Error('Invalid input, expected boolean signal');
            }
            that._signalB = signalB;
            if (that._outputFn) {
                that._outputFn(
                    evaluateInputsFn(that._signalA, that._signalB));
            }
        };
    };

    /**
     * Connect an output callback function to this gate
     */
    that.setOutputFn = function(output) {
        if ('function' !== typeof output) {
                throw new Error('Invalid output, expected function');
        }
        that._outputFn = output;
    };
}


})();