require("dotenv").config();
var askLiri = require("./keys.js");

var event = new askLiri();

// Grab search command line argument
var search = process.argv[2];
// Joining the remaining arguments since request may contain spaces
var term = process.argv.slice(3).join(" ");

// Print searching for a movie & print the term as well
if (search === "movie-this"){
    console.log("Searching for Movie");
    event.findMovie(term);
} if (!term) {
    console.log("Movie not found, but here's something better!");
    term = "Mr. Nobody";
    event.findMovie(term);
}

// Print searching for a concert & print the term as well
if (search === "concert-this") {
    console.log("Searching for Concert");
    event.findConcert(term);
}
