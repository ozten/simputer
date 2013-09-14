(function(){
/*
Toggle Switch - a class of electrical switches
that are manually actuated by a mechanical lever, handle,
or rocking mechanism.

https://en.wikipedia.org/wiki/Toggle_switch#Toggle_switch

Simulation Notes:
Input is not simulated, assumed to be the same state
State - On or Off
State Change - DOM click event or programs calling `toggle`
Output is a callback function which is replaced by another component


*/
window.ToggleSwitch = function(options) {
    var that = this;
    if ('boolean' !== typeof options.state) {
        throw new Error('Invalid input, expected boolean');
    }
    that._state = options.state;
    if ('string' !== typeof options.domId) {
        throw new Error('Invalid domId ' + options.domId);
    }
    that._domId = options.domId;

    // NO-OP
    that._outputFn = function() { return that._state; };

    /**
     * Connect an output callback function to this toggle switch
     */
    that.setOutputFn = function(output) {
        if ('function' !== typeof output) {
                throw new Error('Invalid output, expected function');
        }
        that._outputFn = output;
    };

    /**
     * Programmatically switches the state of the toggle switch
     */
    that.toggle = function() {
        that._state = ! that._state;
        console.log('Calling output Fn with ', that._state);
        that._outputFn(that._state);
    };

    /**
     * Initialize this toggle switch
     */
    that.init = function() {
        var label = that._state ? 'On' : 'Off';
        $('#' + that._domId).append('<a href="">' + label + '</a>');
        $('#' + that._domId + ' a').click(function(e) {
            e.preventDefault();
            that.toggle();
            var newLabel = that._state ? 'On' : 'Off';
            $('#' + that._domId + ' a').text(newLabel);
            return false;
        });
    };
    that.init();

    return that;
};
})();