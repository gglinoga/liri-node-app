require("dotenv").config();
var axios = require("axios");
var keys = require("./keys.js");
var moment = require("moment");
var fs = require("fs");
var x = process.argv[2];
var arr = [];
for (var i = 3; i < process.argv.length; i++) {
    arr.push(process.argv[i])
}
var text

concert = function () {
    text = arr.join("");
    var queryURL = "http://rest.bandsintown.com/artists/" + text + "/events?app_id=codingbootcamp&limit=5"
    console.log(queryURL);
    axios
        .get(queryURL)
        .then(function (response) {
            for (var i = 0; i < response.data.length; i++) {
                var date = (moment(response.data[i].datetime).format('MM/DD/YYYY'));
                console.log("Venue: " + response.data[i].venue.name, "\nCity: " + response.data[i].venue.city, "\nDate: " + date + "\n")
            }
        })
        .catch(function (error) {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log("Error", error.message);
            }
            console.log(error.config);
        })
};

spotifySearch = function () {
    text = arr.join("+");
    var Spotify = require('node-spotify-api');
    var spotify = new Spotify({
        id: keys.spotify.id,
        secret: keys.spotify.secret
    })
    if (text === "") {
        text = "ace of base the sign";
    }
    spotify.search({
            type: 'track',
            query: text,
            limit: 1
        }).then(function (response) {
            var artist = (response.tracks.items[0].album.artists[0].name);
            var song = (response.tracks.items[0].name);
            var pLink = (response.tracks.items[0].preview_url)
            var album = (response.tracks.items[0].album.name)
            console.log(`Artist: ${artist}\nSong: ${song}\nPreview Link: ${pLink}\nAlbum: ${album}`);
        })
        .catch(function (error) {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log("Error", error.message);
            }
            console.log(error.config);
        });
}

movies = function () {
    text = arr.join("+");
    if (text === "") {
        text = "mr+nobody";
    }
    var queryURL = "http://www.omdbapi.com/?t=" + text + "&type=movie&y=&plot=short&apikey=trilogy";
    console.log(queryURL);
    console.log(text);
    axios
        .get(queryURL)
        .then(function (response) {
            console.log("Title: " + response.data.Title, "\nYear: " + response.data.Year, "\nIMDB Rating " + response.data.imdbRating, "\nRotten Tomatoes Rating: " + response.data.Ratings[1].Value, "\nLanguage: " + response.data.Language, "\nPlot: " + response.data.Plot, "\nCast: " + response.data.Actors);
        })
        .catch(function (error) {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log("Error", error.message);
            }
            console.log(error.config);
        });
}

doWhatItSays = function () {
    var text;
    fs.readFile('./random.txt', "utf8", function read(err, data) {
        if (err) {
            throw err;
        }
        text = data;
        var dataArr = data.split(",");
        x=dataArr[1];
        x=x.split(" ")
        arr=x;
        console.log(x);
        if (dataArr[0]==="spotify-this-song") {
            spotifySearch();
        }
        if (dataArr[0]==="concert-this") {
            concert();
        }
        if (dataArr[0]==="movie-this") {
            movies();
        }
    })
    
}

switch (x) {
    case 'concert-this':
        concert();
        break;
    case 'spotify-this-song':
        spotifySearch();
        break;
    case 'movie-this':
        movies();
        break;
    case 'do-what-it-says':
        doWhatItSays();
        break;

}