const dotenv = require("dotenv").config();
var axios = require("axios");
var keys = require("./keys.js");
var moment = require('moment');
moment().format();
var spotify = require('node-spotify-api');
var command = process.argv[2];
var userInput = process.argv[3];
var omdb = require("omdb");
var fs = require("fs");


var nodeArgs = process.argv;

switch (command) {
    case "movie-this":
        omdbInfo();
        break;
    case "readFile":
        run();
        break;
    default:
        console.log("Error: please type in command again.");
        break;
}

function omdbInfo() {
    console.log('one');

    // Run a request to the OMDB API with the movie specified
    axios.get("http://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&apikey=trilogy")
        .then(function (response, error) {
            console.log(response.data);

            // If the request is successful (i.e. if the response status code is 200)
            if (!error && response.status === 200) {
                console.log('two');
                console.log("Title " + response.data.Title);
                // Parse the body of the site and recover the title, year, IMBD rating, Rotten Tomatoes rating, Country, Language, Plot and Actors from the movie
                console.log("Title of the Movie: " + response.data.Title +
                    "\nYear: " + response.data.Year +
                    "\nIMBD Rating: " + response.data.imdbRating +
                    "\nRotten Tomatoes Rating: " + response.data.Ratings[1] +
                    "\nCountry: " + response.data.Country +
                    "\nLanguage: " + response.data.Language +
                    "\nPlot: " + response.data.Plot +
                    "\nActors: " + response.data.Actors +
                    "\n---------------------------------------------------------\n");

            }


        })

        .catch(function (error) {

            fs.readFile("random.txt", "utf8", function (error, data, ) {

                // If the code experiences any errors it will log the error to the console.
                if (error) {
                    return console.log(error);
                }

                // Split the data by commas 
                var dataArr = data.split(",");


                axios.get("http://www.omdbapi.com/?i=&y=&plot=short&apikey=trilogy").then(
                    function (response) {
                        if ((dataArr[0] === "movie-this")) {

                            userInput = dataArr[1].slice(1, -1);
                            omdbInfo();
                        }

                    });

            });
        })

}














//   * Title of the movie.
//* Year the movie came out.
//* IMDB Rating of the movie.
//* Rotten Tomatoes Rating of the movie.
//* Country where the movie was produced.
//* Language of the movie.
//* Plot of the movie.
//* Actors in the movie.
