var five = require("johnny-five");
var board = new five.Board();

var stdin = process.stdin;
stdin.setRawMode(true);
stdin.resume();

board.on("ready", function() {
    (new five.Led(8)).strobe();
    var wheels = {
        left: new five.Servo({
            pin: 9,
            type: 'continuous'
        }),
        right: new five.Servo({
            pin: 10,
            type: 'continuous'
        }),
        stop: function() {
            wheels.left.center();
            wheels.right.center();
        },
        forward: function() {
            wheels.left.ccw();
            wheels.right.cw();
            console.log("goForward");
        },
        pivotLeft: function() {
            wheels.left.cw();
            wheels.right.cw();
            console.log("turnLeft");
        },
        pivotRight: function() {
            wheels.left.ccw();
            wheels.right.ccw();
            console.log("turnRight");
        },
        back: function() {
            wheels.left.cw();
            wheels.right.ccw();
        }
    };

    wheels.stop();
    console.log("Use the cursor keys or ASWD to move your bot. Hit escape or the spacebar to stop.");

    stdin.on('keyup', function(chunk, key) {
        console.log('let up on key %o', arguments);
    });

    stdin.on("keypress", function(chunk, key) {
        console.log('key %o', arguments);
        var key = key && key.name ? key.name : null;
        switch (key) {
            case 'up':
            case 'w':
                wheels.forward();
                break;

            case 'down':
            case 's':
                wheels.back();
                break;

            case 'left':
            case 'a':
                wheels.pivotLeft();
                break;

            case 'right':
            case 'd':
                wheels.pivotRight();
                break;

            case 'space':
            case 'escape':
                wheels.stop();
                break;
        }
    });
});










