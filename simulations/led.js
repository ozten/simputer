(function(){
/*
LED - A light-emitting diode (LED) is a semiconductor light source.
LEDs are used as indicator lamps in many devices and are increasingly
used for general lighting.

Appearing as practical electronic components in 1962, early LEDs emitted
low-intensity red light, but modern versions are available across the visible,
ultraviolet, and infrared wavelengths, with very high brightness.

https://en.wikipedia.org/wiki/Led

Mainly used in simulations to give visual feedback.

Usage:

    var led1 = new LED({domId: 'led1', color:'red'});
    var in = led1.getInputFn();
    in(1);
    in(0);

Simulation Notes:
Input is modeled as a function which is hooked up as a callback.

This will create a new LED, which will start rendering itself
*/

window.LED = function(options) {
    var that = this;
    that._signal = 0;
    that._inputFn = function(signal) {
        if ('number' !== typeof signal) {
                throw new Error('Invalid input, expected number signal');
        }
        that._signal = signal;
        that.draw();
    };

    /**
     * Get an input callback function from this transistor
     */
    that.getInputFn = function() { return that._inputFn; };

    /**
     * Draw the LED into the Browser
     */
    that.draw = function() {
        var label = that._signal ? 'Light' : 'Dark';
        console.log('Drawing LED ', label);
        $('#' + options.domId + ' div').text(label);
    };

    /**
     * Initialize this LED light
     */
    that.init = function() {
        var label = that._signal ? 'Light' : 'Dark';
        $('#' + options.domId).append(
            //'<canvas width="40" height="40"></canvas>');
            '<div>' + label + '</div>');

    };
    that.init();
    return that;
};

})();