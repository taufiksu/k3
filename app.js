var serialport = require("serialport");
const Readline = serialport.parsers.Readline;
const fs = require('fs');

var port = new serialport("/dev/ttyUSB0", {
        baudRate: 115200
});

port.on("open", function () {
        console.log('open');

        const parser = new Readline();
        port.pipe(parser);

        var counter = 0;
        parser.on('data', function(data){
                counter = counter+1;
                if(data.includes('weak')){
                        var temperature = parseFloat(data.substr(9,5)).toFixed(1);
                        console.log(temperature);
                        fs.writeFileSync('temperature.txt', temperature);
                }
        });
});
