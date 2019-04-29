// Using the require keyword lets us access all of the exports in our .env, key.js, fs files
require("dotenv").config();
var keys = require("./keys.js");
var fs = require('fs');
var event = new keys();

// Grab search command line argument
var search = process.argv[2];
// Joining the remaining arguments since request may contain spaces
var term = process.argv.slice(3).join(" ");

// Print movie info
if (search === "movie-this") {
    console.log("Searching for Movie");
    event.findMovie(term);
};

// Print concert info
if (search === "concert-this") {
    console.log("Searching for Concert");
    event.findConcert(term);
};

// Print song info
if (search === "spotify-this-song") {
    console.log("Searching for Song");
    event.findSong(term);
};


// doWhatItSays function where LIRI takes the text inside of random.txt and then use it to call one of LIRI's commands.
function doWhatItSays() {
    //Reads the random.txt file and calls Spotify function
    fs.readFile("random.txt", "utf8", function (err, data) {
        // If the code experiences any errors it will log the error to the console.
        if (err) {
            console.log(err);
        } else {
            var dataSplit = data.split(",");
            console.log(dataSplit[1]);
        }
        event.findSong(dataSplit[1]);
    });
     //Append songData and the divider to log.txt, print songData to the console
    //  fs.appendFile("log.txt", doWhatItSays + divider, function (err) {
    //     if (err) throw err;
    //     console.log("\n----- log.txt was updated with Song info! -----\n")
    //     console.log(doWhatItSays);
    //   });
};
// Print whatever is in do-what-it-says
if (search === "do-what-it-says") {
    console.log("Searching...");
    doWhatItSays();
};

