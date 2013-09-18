(function(){
/*
Adder - a digital circuit that performs addition of numbers.
In many computers and other kinds of processors, adders are used not only
in the arithmetic logic unit(s), but also in other parts of the processor,
where they are used to calculate addresses, table indices,
and similar operations.

https://en.wikipedia.org/wiki/Half_adder

For the first time, we're starting to take on some semantics
of the problem space (?).

*/
window.HalfAdder = function() {
    var that = this;
    var xorGate = new XOrGate();
    // Caching to avoid generating functions on each call
    that._xorGateInputAFn = xorGate.getInputAFn();
    that._xorGateInputBFn = xorGate.getInputBFn();

    var andGate = new AndGate();
    that._andGateInputAFn = andGate.getInputAFn();
    that._andGateInputBFn = andGate.getInputBFn();

    //Input A and Input B go into XOR Gate which outputs S
    //Input A and Input B go into AND Gate which outputs C

    /**
     * Get an input callback function for first bit to add
     */
    that.getInputAFn = function(signal) {
        that._xorGateInputAFn(signal);
        that._andGateInputAFn(signal);
    };

    /**
     * Get an input callback function for second bit to add
     */
    that.getInputBFn = function(signal) {
        that._xorGateInputBFn(signal);
        that._andGateInputBFn(signal);
    };

    /**
     * Connect an output callback function to the Sum output
     */
    that.setOutputSFn = function(output) {
        if ('function' !== typeof output) {
                throw new Error('Invalid output, expected function');
        }
        xorGate.setOutputFn(output);
    };

    /**
     * Connect an output callback function to the Carry-over output
     */
    that.setOutputCFn = function(output) {
        if ('function' !== typeof output) {
                throw new Error('Invalid output, expected function');
        }
        andGate.setOutputFn(output);
    };
    return that;
};
})();