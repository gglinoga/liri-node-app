require("dotenv").config();
var axios = require("axios");
var keys = require("./keys.js");


var spotify = new Spotify(keys.spotify);
var x = process.argv[2];
var arr = [];
for (var i = 3; i < process.argv.length; i++) {
    arr.push(process.argv[i])
}
console.log(arr);
var text = arr.toString();
console.log(text);

concert = function () {
    var queryURL = "http://rest.bandsintown.com/artists/" + text + "/events?app_id=codingbootcamp"
    axios
        .get(queryURL)
        .then(function (response) {
            // console.log((response))
            for (var i = 0; i < response.data.length; i++)
                console.log("Venue: " + response.data[i].venue.name, "\nCity: " + response.data[i].venue.city, "\nDate: " + response.data[i].datetime + "\n")
        })
        .catch(function (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an object that comes back with details pertaining to the error that occurred.
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error", error.message);
            }
            console.log(error.config);
        })
};

Spotify = function () {
    var queryURL = "";
    console.log(queryURL)
    axios
        .get(queryURL)
        .then(function (response) {
            console.log("spotify stuff")
        })
        .catch(function (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an object that comes back with details pertaining to the error that occurred.
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error", error.message);
            }
            console.log(error.config);
        })

};

movies = function () {
    var queryURL = "http://www.omdbapi.com/?t=" + text + "&y=&plot=short&apikey=trilogy";
    axios
        .get(queryURL)
        .then(function (response) {
            console.log("Title: " + response.data.Title, "\nYear: " + response.data.Year, "\nIMDB Rating " + response.data.imdbRating, "\nRotten Tomatoes Rating: " + response.data.Ratings[1].Value, "\nLanguage: " + response.data.Language, "\nPlot: " + response.data.Plot, "\nCast: " + response.data.Actors);
        })
        .catch(function (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an object that comes back with details pertaining to the error that occurred.
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error", error.message);
            }
            console.log(error.config);
        });
}

switch (x) {
    case 'concert-this':
        concert();
        break;
    case 'spotify-this-song':
        console.log("spotify")
        Spotify();
        //artist spotify.artists
        //song name spotify.name
        //preview link spotify.preview_url
        //album  spotify.album
        //
        break;
    case 'movie-this':
        movies();
        break;
    case 'do-what-it-says':

        //use fs to take text inside random.txt to call LIRI commands.......
        //run spotify-this-song for "I want it that way" from random.txt
        console.log("dooooooooooooo")
        break;

}