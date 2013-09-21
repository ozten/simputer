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

/**
 * Input A is connected to XOR 0 and AND 0
 * Input B is connected to XOR 0 and AND 0
 * Carry In is connectd to XOR 1 and AND 1
 * XOR 0 output connected to XOR 1
 * AND 0 output connected to OR
 * XOR 1 output connected to Signal
 * AND 1 output connected to OR
 * OR output connected to Carry-Over
 */
window.FullAdder = function() {
    var that = this;
    var xorGate0 = new XOrGate();
    var xorGate1 = new XOrGate();
    that._xorGate0InputAFn = xorGate0.getInputAFn();
    that._xorGate0InputBFn = xorGate0.getInputBFn();
    that._xorGate1InputAFn = xorGate1.getInputAFn();
    that._xorGate1InputBFn = xorGate1.getInputBFn();

    var andGate0 = new AndGate();
    var andGate1 = new AndGate();
    that._andGate0InputAFn = andGate0.getInputAFn();
    that._andGate0InputBFn = andGate0.getInputBFn();
    that._andGate1InputAFn = andGate1.getInputAFn();
    that._andGate1InputBFn = andGate1.getInputBFn();

    var orGate = new OrGate();
    that._orGateInputAFn = orGate.getInputAFn();
    that._orGateInputBFn = orGate.getInputBFn();

    xorGate0.setOutputFn(function(signal) {
        that._xorGate1InputAFn(signal);
        that._andGate1InputAFn(signal);
    });

    andGate1.setOutputFn(function(signal){
        that._orGateInputAFn(signal);
    });
    andGate0.setOutputFn(function(signal) {
        that._orGateInputBFn(signal);
    });
    /**
     * Get an input callback function for first bit to add
     */
    that.getInputAFn = function(signal) {
        that._xorGate0InputAFn(signal);
        that._andGate0InputAFn(signal);
    };

    /**
     * Get an input callback function for second bit to add
     */
    that.getInputBFn = function(signal) {
        that._xorGate0InputBFn(signal);
        that._andGate0InputBFn(signal);
    };

    /**
     * Get an input callback function for Carry over input
     */
    that.getInputCFn = function(signal) {
        that._xorGate1InputBFn(signal);
        that._andGate1InputBFn(signal);
    };

    /**
     * Connect an output callback function to the Sum output
     */
    that.setOutputSFn = function(output) {
        if ('function' !== typeof output) {
                throw new Error('Invalid output, expected function');
        }
        xorGate1.setOutputFn(output);
    };

    /**
     * Connect an output callback function to the Carry-over output
     */
    that.setOutputCFn = function(output) {
        if ('function' !== typeof output) {
                throw new Error('Invalid output, expected function');
        }
        orGate.setOutputFn(output);
    };
    return that;
};

/**
 * 4 bit adder - roughly follows naming convensions of the 4008 chip
 */
window.FourBitAdder = function() {
    var that = this;
    that.fullAdder0 = new FullAdder();
    that.a0 = that.fullAdder0.getInputAFn;
    that.b0 = that.fullAdder0.getInputBFn;
    that.cIn = that.fullAdder0.getInputCFn;

    that.fullAdder1 = new FullAdder();
    that.a1 = that.fullAdder1.getInputAFn;
    that.b1 = that.fullAdder1.getInputBFn;

    that.fullAdder2 = new FullAdder();
    that.a2 = that.fullAdder2.getInputAFn;
    that.b2 = that.fullAdder2.getInputBFn;

    that.fullAdder3 = new FullAdder();
    that.a3 = that.fullAdder3.getInputAFn;
    that.b3 = that.fullAdder3.getInputBFn;

    that.fullAdder0.setOutputCFn(that.fullAdder1.getInputCFn);
    that.fullAdder1.setOutputCFn(that.fullAdder2.getInputCFn);
    that.fullAdder2.setOutputCFn(that.fullAdder3.getInputCFn);

    that.setOutputCFn = that.fullAdder3.setOutputCFn;

    that.setOutputS0Fn = that.fullAdder0.setOutputSFn;
    that.setOutputS1Fn = that.fullAdder1.setOutputSFn;
    that.setOutputS2Fn = that.fullAdder2.setOutputSFn;
    that.setOutputS3Fn = that.fullAdder3.setOutputSFn;
};


})();