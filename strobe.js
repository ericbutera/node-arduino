var five = require("johnny-five");
var board = new five.Board();

board.on("ready", function() {

    //().strobe();
    var bot = new five.Led(11);
    var x = 0;
    bot.brightness(25);

    sleep(1000, function() {
        console.log('changing brightness %o', x);
        if (x == 100) {
            x = 0;
        }
        bot.brightness(x);
        x++;
    });

});

function sleep(time, callback) {
    console.log('sleep called');
    var stop = new Date().getTime();
    while (new Date().getTime() < stop + time) {
        ;
    }
    callback();
}












