require("dotenv").config();

var fs = require("fs");
var keys = require("./keys");
var Twitter = require("twitter");
var Spotify = require('node-spotify-api');
var request = require("request");

// // holds api keys
var client = new Twitter(keys.twitter);
var spotify = new Spotify(keys.spotify)

var siteStatement = process.argv[2];
var searchTerm = process.argv;
var userTerm = process.argv[3];
var search = "";

for (var i = 3; i < searchTerm.length; i++) {
  if (i > 3 && i < searchTerm.length) {
    search = search + "+" + searchTerm[i];
  }
  else {
    search += searchTerm[i];
  };
} 
console.log("search" + search);

// Twitter search
var twitterSearch = function(){
    var params = {screen_name: 'chenne7'}
    console.log(params);
   
    client.get('statuses/user_timeline', params, function (error, tweets, response){
    //    console.log(response);
    //    console.log(JSON.stringify(tweets));
    //    console.log(error);
    //    console.log(JSON.stringify(response));
        if(!error){
            for (i = 0; i < tweets.length; i++){
                console.log(tweets[i].created_at);
                console.log("");
                console.log(tweets[i].text);
                
            }
        } 
    });
}
   

function spotifyme() {
      console.log("spotify");  
      search = search || "The Sign Ace Base";
    // var search = "The Sign Ace Base"
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
            twitterSearch();
            break;        
                
        case "spotify-this-song":
            spotifyme();
            break;
      
        case "do-what-it-says":
            doWhatItSays();
            break;
      
        case "movie-this":
            omdb();
            break;
      
      }

      function doWhatItSays() {
        
            fs.readFile("./random.txt", "utf8", function (error, data) {
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
    console.log(`search`,search)
    if (userTerm === undefined) {userTerm = "Mr. Nobody"}
  
    var queryUrl = "http://www.omdbapi.com/?t=" + userTerm + "&y=&plot=short&apikey=fb9989ab";
    console.log(queryUrl);
       
    request(queryUrl, function (error, response, body) {
        if (!error && response.statusCode === 200) {
  
        console.log("Title: " + JSON.parse(body).Title);
        console.log("Release Year: " + JSON.parse(body).Year);
        console.log("Rated: " + JSON.parse(body).Rated);
        console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
        console.log("Produced in: " + JSON.parse(body).Country);
        console.log("Language(s): " + JSON.parse(body).Language);
        console.log("Plot: " + JSON.parse(body).Plot);
        console.log("Starring: " + JSON.parse(body).Actors);
        }
      else {
          return console.log('Error occurred: ' + error);
      }
    })

  }      

