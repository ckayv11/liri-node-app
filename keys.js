console.log('this is loaded');

exports.spotify = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
};

var axios = require("axios");
var fs = require("fs");

var askLiri = function () {
    // divider will be used as a spacer between the data we print in log.txt
    var divider = "\n------------------------------------------------------------\n\n";

    // findMovie takes in the name of a movie and searches the OMDB API
    this.findMovie = function (movie) {
        var URL = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";
    
        axios.get(URL).then(function (response) {
          // Place the response.data into a variable, jsonData.
          var jsonData = response.data;
          // movieData ends up being the string containing the movie data we will print to the console
          var movieData = [
            "Movie Title: " + jsonData.Title,
            "Release Year: " + jsonData.Year,
            "IMDB Rating: " + jsonData.Ratings[0].Value,
            "Rotten Tomatoes Rating: " + jsonData.Ratings[1].Value,
            "Country: " + jsonData.Country,
            "Language: " + jsonData.Language,
            "Plot: " + jsonData.Plot,
            "Actors: " + jsonData.Actors,
          ].join("\n\n");
    
          // Append concertData and the divider to log.txt, print concertData to the console
          fs.appendFile("log.txt", movieData + divider, function (err) {
            if (err) throw err;
            console.log(movieData);
          });
        });
      };
}
module.exports = askLiri;