console.log('this is loaded');

exports.spotify = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
};

var axios = require('axios');
var fs = require('fs');
var moment = require('moment');
var Spotify = require('node-spotify-api');
var keys = require("./keys.js");


var askLiri = function () {
  // divider will be used as a spacer between the data we print in log.txt
  var divider = "\n------------------------------------------------------------\n\n";
  
  // findMovie takes in the name of a movie and searches the OMDB API
  this.findMovie = function (movie) {
    if (!movie) {
      console.log("Need a movie recommendation? Check this one out on Netflix!")
      movie = "Mr Nobody";
    };
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
      // Append movieData and the divider to log.txt, print movieData to the console
      fs.appendFile("log.txt", movieData + divider, function (err) {
        if (err) throw err;
        console.log("\n----- log.txt was updated with Movie info! -----\n")
        console.log(movieData);
      });
    });
  };

  //findConcert takes in the name of a band and searches the Bands in Town Artist Events API
  this.findConcert = function (artist) {
    if (!artist) {
      console.log("Can't think of any concerts? Check out this boy band - they're dope!")
      artist = "Backstreet Boys";
    };
    var URL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
    axios.get(URL).then(function (response) {
      var jsonData = response.data[0];
      var concertData = [
        "Artist: " + artist,
        "Venue Name: " + jsonData.venue.name,
        "Venue Location: " + jsonData.venue.city + ", " + jsonData.venue.region,
        "Date of Event: " + moment(jsonData.datetime).format('l'),
      ].join("\n\n");
      fs.appendFile("log.txt", concertData + divider, function (err) {
        if (err) throw err;
        console.log("\n----- log.txt was updated with Concert info! -----\n")
        console.log(concertData);
      });
    });
  };

  //findSong takes in the name of a song and searches Spotify API
  this.findSong = function (song) {
    // If there is no song name, set the song to Ace of Base "The Sign"
    if (!song) {
      console.log("Need a song? Check out this throwback!")
      song = "The Sign (Ace of Base)";
    }
    var spotify = new Spotify(keys.spotify);
    spotify.search({ type: 'track', query: song }, function (err, data) {
      if (err) {
        console.log('Error occurred: ' + err);
        return;
      } else {
        var trackData = data.tracks.items[0];
        var songData = [
          "Artist(s): " + trackData.album.artists[0].name,
          "Song Name: " + song,
          "Song Preview: " + trackData.album.external_urls.spotify,
          "Album: " + trackData.album.name,
        ].join("\n\n");

        //   Append songData and the divider to log.txt, print songData to the console
        fs.appendFile("log.txt", songData + divider, function (err) {
          if (err) throw err;
             console.log("\n----- log.txt was updated with Song info! -----\n")
          console.log(songData);
        });
      };
    });
  };

};
  module.exports = askLiri; //module.exports with askLiri function as an object with data/variables to access in liri.js file using the 'require' keyword.