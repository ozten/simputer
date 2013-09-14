(function() {
01234567890123456789012345678901234567890123456789012345678901234567890123456789
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
*/

window.Transistor = function(state) {
    if ('boolean' !== typeof state) {
        throw new Error('Invalid input, expected boolean');
    }
    var that = this;
    that.state = state;
    return that;
};

})();