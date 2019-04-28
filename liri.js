require("dotenv").config();
var keys = require("./keys.js");
var fs = require('fs');
// var spotify = new Spotify(keys.spotify);

var event = new keys();

// Grab search command line argument
var search = process.argv[2];
// Joining the remaining arguments since request may contain spaces
var term = process.argv.slice(3).join(" ");

// Print movie info
if (search === "movie-this"){
    console.log("Searching for Movie");
    event.findMovie(term);
};

// Print concert info
if (search === "concert-this") {
    console.log("Searching for Concert");
    event.findConcert(term);
};

// Print song info
if (search === "spotify-this-song"){
    console.log("Searching for Song");
    event.findSong(term);
};


//doWhatItSays function where LIRI takes the text inside of random.txt and then use it to call one of LIRI's commands.
function doWhatItSays () {
    //Reads the random.txt file and calls Spotify function
    fs.readFile("random.txt", "utf8", function(err, data) {
        // If the code experiences any errors it will log the error to the console.
        if (err) {
        return console.log(err);
        };
        console.log(data);
        // event.findMovie(data);
    });
};
// Print whatever is in do-what-it-says
if (search === "do-what-it-says"){
console.log("Searching...");
doWhatItSays();
};

