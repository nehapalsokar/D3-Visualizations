'use strict';
//`d3` has already been "imported"

//Here is an array of objects representing the result of searching for music on iTunes.
var EXAMPLE_SEARCH_RESULTS = {results:[{
  artistName: "Queen",
  trackName: "Bohemian Rhapsody",
  previewUrl: "https://audio-ssl.itunes.apple.com/apple-assets-us-std-000001/Music3/v4/41/cc/ae/41ccae59-697a-414c-43b5-51bd4d88d535/mzaf_3150742134610995145.plus.aac.p.m4a",
  artworkUrl100: "http://is3.mzstatic.com/image/thumb/Music1/v4/94/92/a3/9492a374-e6e3-8e92-0630-a5761070b0f7/source/100x100bb.jpg",
}, {
  artistName: "David Bowie",
  trackName: "Starman (2012 Remastered Version)",
  previewUrl: "https://audio-ssl.itunes.apple.com/apple-assets-us-std-000001/AudioPreview71/v4/d2/68/ea/d268ea6a-9e8b-fc0b-f519-0e8b59fd9a18/mzaf_6387986799378989474.plus.aac.p.m4a",
  artworkUrl100: "http://is3.mzstatic.com/image/thumb/Music6/v4/ab/4e/d9/ab4ed977-4b96-4791-bcec-e02c94283332/source/100x100bb.jpg",
}, {
  artistName: "Beyoncé",
  trackName: "Formation",
  previewUrl: "https://audio-ssl.itunes.apple.com/apple-assets-us-std-000001/AudioPreview122/v4/5f/d7/5f/5fd75fd8-d0a5-ccb2-7822-bcaedee070fc/mzaf_3356445145838692600.plus.aac.p.m4a",
  artworkUrl100: "http://is1.mzstatic.com/image/thumb/Music20/v4/23/c1/9e/23c19e53-783f-ae47-7212-03cc9998bd84/source/100x100bb.jpg",
}]};


//Define a function `renderTracks()` that takes as a parameter an object with a
//`results` property containing an array of music tracks; similar to the above 
//`EXAMPLE_SEARCH_RESULTS` variable.
//For each item in the `results` array, this function should add a new `<div>` 
//element into the `#records` div representing that track. The new <div> should 
//have the following child elements:
//  - an <img> element whose `src` is the artwork url of the track
//  - a <p> element containing the name of the track
//  - an <audio> element whose `src` is the the preview url. Also give the 
//    element a `controls` attribute with a value of `true`
//You can test the function by calling it and passing it `EXAMPLE_SEARCH_RESULTS`.
function renderTracks(tracks) {
  var recordContainer = d3.select('#records');
  tracks.results.forEach(function(track) {
    var div = recordContainer.append('div');
    div.append('img').attr('src', track.artworkUrl100);
    div.append('p').text(track.artistName + ' - ' + track.trackName)
    div.append('audio').attr('src', track.previewUrl).attr('controls',true)
  })
}
//renderTracks(EXAMPLE_SEARCH_RESULTS)

//Create a variable `searchUri` that is the URI to search iTunes for songs.
//You will need to concatenate a URI string with the following components:
// - The endpoint is `https://itunes.apple.com/search`
// - Include query parameters (after a `?`):
//    - an `entity` of `song` (e.g., `entity=song`)
//    - a `term` that is a search term of your choosing.
//Log out the variable for testing.
var searchUri = "https://itunes.apple.com/search?entity=song&limit=25&term="+
                "bowie"; //search term
console.log(searchUri);

//Define a function `downloadTracks()` that sends an AJAX request to the 
//`searchUri`, and logs out the resulting data.
//Remember to make the function `async` and to `await` the download to finish.
//Call the function to test it.
async function downloadTracks() {
  var data = await d3.json(searchUri)
  console.log(data);
  renderTracks(data);
}
downloadTracks();

//Modify your `downloadTracks()` function so that it calls your `renderTracks()`
//function in order to display the live data! (Be sure to not show the example
//tracks)
