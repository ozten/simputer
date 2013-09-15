(function() {
/*
Transistor - A transistor is a semiconductor device used to amplify and switch
electronic signals and electrical power. It is composed of semiconductor
material with at least three terminals for connection to an external circuit.

A voltage or current applied to one pair of the transistor's terminals changes
the current through another pair of terminals. Because the controlled (output)
power can be higher than the controlling (input) power, a transistor can
amplify a signal. Today, some transistors are packaged individually, but many
more are found embedded in integrated circuits.

History:

* Vacuum Tube (Triode) - 1907
* Shockly Semiconductors - 1947
* Commercial Transistor Texas Instruments - 1954

Main Operations:

* Amplification
* Switching

https://en.wikipedia.org/wiki/Transistor

Simulation Notes:
Input is modeled as a function which is hooked up as a callback.
Output is a callback function which is replaced by another component
Ground is not simulated

*/

window.Transistor = function() {
    var that = this;
    // NO-OP
    that._outputFn = function() { return that._inputFn(); };

    that._inputFn = function(signal) {
        if ('number' !== typeof signal) {
            throw new Error('Invalid input, expected number signal');
        }
        that._signal = signal;
        if (that._outputFn) that._outputFn(that._signal);
    };

    /**
     * Get an input callback function from this transistor
     */
    that.getInputFn = function() {
        return that._inputFn;
    };

    /**
     * Connect an output callback function to this transistor
     */
    that.setOutputFn = function(output) {
        if ('function' !== typeof output) {
                throw new Error('Invalid output, expected function');
        }
        that._outputFn = output;
    };
    // setGround - not currently simulated
    return that;
};

})();