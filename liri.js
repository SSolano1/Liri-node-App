require("dotenv").config();

var keys = require("./keys");
var Twitter = require("twitter");
var Spotify = require('node-spotify-api');
var request = require("request");

var siteStatement = process.argv[3];
var searchTerm = process.argv;
var search = "";

for (var i = 2; i < searchTerm.length; i++) {
  if (i > 2 && i < searchTerm.length) {
    search = search + "+" + searchTerm[i];
  }
  else {
    search += searchTerm[i];
  };
}

function twitter() {
    var client = new Twitter(keys.twitter);
    var param ={q:'chenne7', count:20}

    client.get('search/tweets', param, searchedData);
     function searchedData(error, twitter, response) {
         console.log(data);
                }
}
     twitter.data();
  

function spotify() {
    var spotify = new Spotify(keys.spotify)
      search = search || "The Sign Ace Base";
      spotify.search({ type: 'track', query: search, limit: 1 }, function (err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
     
      for (var i = 0; i < data.tracks.items.length; i++) {
          console.log("Artist: " + data.tracks.items[i].artists[0].name);
          console.log("Song name: " + data.tracks.items[i].name);
          console.log("Album name: " + data.tracks.items[i].album.name);
          console.log("Preview Link: " + data.tracks.items[i].preview_url);
        }
      });
    }

    switch (siteStatement) {
        case "my-tweets":
            twitter();
            break;        
                
        case "spotify-this-song":
            spotify();
            break;
      
        case "do-what-it-says":
            doWhatItSays();
            break;
      
        case "movie-this":
            omdb();
            break;
      
      }

      function doWhatItSays() {
        var fs = require("fs");
            fs.readFile("./rondom.txt", "utf8", function (error, data) {
                if (error) {
                return console.log(error);

            }
      
        var random = data.split(",");
            siteStatement = random[0];
            search = random[1];
            spotify();
        });
      } 
      


function omdb() {
    search = search || "Mr. Nobody"
  
    var queryUrl = "http://www.omdbapi.com/?t=" + search + "&y=&plot=short&apikey=fb9989ab";
       
    request(queryUrl, function (error, response, body) {
        if (!error && response.statusCode === 200) {
  
        console.log("Title: " + JSON.parse(body).Title);
        console.log("Release Year: " + JSON.parse(body).Year);
        console.log("Rated: " + JSON.parse(body).Rated);
        console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value + " Fresh");
        console.log("Produced in: " + JSON.parse(body).Country);
        console.log("Language(s): " + JSON.parse(body).Language);
        console.log("Plot: " + JSON.parse(body).Plot);
        console.log("Starring: " + JSON.parse(body).Actors);
        }
      else {
          return console.log('Error occurred: ' + err);
      }
    })

  }      

