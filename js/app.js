/*************** Targeting the elements already present inside the page ***************/
const searchForm  = document.querySelector('.search-form');
const searchInput = document.getElementById('search');
const mainContent = document.getElementById('main-content');
const overlay     = document.getElementById('overlay');



/*************** Adding the overlay to the web page ***************/



// Then append the overlay to the body



/*************** The AJAX function ***************/
// If there is no album to show
const noAlbumFound = (text) => {
  let responseHTML = "<li class='no-albums desc'>";
  responseHTML += "<i class='material-icons icon-help'>help_outline</i>No albums found that match: ";
  responseHTML += text;
  responseHTML += '</li>';
  return responseHTML;
}; // End: noAlbumFound

// If albums have been returned, display them
const displayResults = (albums) => {
  let albumHTML = '<ul id="albums" class="album-list">';
  for (let i = 0; i < albums.length; i++) {
    albumHTML += '<li>';
        albumHTML += '<div class="album-wrap">';
          albumHTML += '<a ';
            albumHTML += 'href="' + albums[i].external_urls.spotify +'" target="_blank"';
          albumHTML += '>';
            albumHTML += '<img class="album-art"';
              albumHTML += 'src="' + albums[i].images[1].url + '"';
            albumHTML += '>';
          albumHTML += '</a>';
        albumHTML += '</div>';
      albumHTML += '<span class="album-title">';
        albumHTML += albums[i].name;
      albumHTML += '</span>';
      albumHTML += '<span class="album-artist">';
        albumHTML += albums[i].artists[0].name;
      albumHTML += '</span>';
      albumHTML += '<a class="album-info"';
      albumHTML += 'onclick="showTheAlbum(event)"';
      albumHTML += 'href="' + albums[i].href + '"';
      albumHTML += '>';
      albumHTML += 'More info on the album';
      albumHTML += '</a>';
    albumHTML += '</li>';
  }
  albumHTML += '</ul>';
  return albumHTML;
}; // End displayResults

const displayTheAlbum = (album) => {
  console.log('Title: ' + album.release_date);
  console.log('Album name: ' + album.name);
  for (let i = 0; i < album.artists.length; i++) {
    console.log('Artist(s): ' + album.artists[i].name);
  }
  for (let i = 0; i < album.tracks.items.length; i++) {
    console.log('Track(s) name: ' + album.tracks.items[i].name);
  }
}; // End displayTheAlbum

const showTheAlbum = (event) => {
  event.preventDefault();
  let href = event.target.getAttribute('href');
  const album = getOneAlbumRequest(href);
  overlay.style.display = 'block';
}; // End: showTheAlbum

// The Ajax request when one album is clicked
const getOneAlbumRequest = (albumHref) => {

  let req = new XMLHttpRequest();
  req.open(
    'GET',
    albumHref,
    true
  );

  req.send(null);

  req.onreadystatechange = () => {
    if (req.readyState === 4) {
      if (req.status === 200) {
        let albumSelected = JSON.parse(req.responseText);
        displayTheAlbum(albumSelected);
      }
    }
  }

}; // End: getOneAlbumRequest

// The Ajax request which calls: the two functions above
const getAllAlbumsRequest = (searchingText) => {
  let xhr = new XMLHttpRequest();

  xhr.onreadystatechange = () => {
    if(xhr.readyState === 4) {
      if (xhr.status === 200) {
        let responseText = JSON.parse(xhr.responseText);
        let albumsArray = responseText.albums.items;

        if (albumsArray.length === 0) {
          let responseHTML = noAlbumFound(searchingText);
          mainContent.innerHTML = responseHTML;
        } else {
          let responseHTML = displayResults(albumsArray)
          mainContent.innerHTML = responseHTML;
        }

      } else {
        alert('Sorry, an error occurs with the server');
      } // End: xhr.status
    } // End: xhr.readyState
  } // End: onreadystatechange

  xhr.open(
    'GET',
    "https://api.spotify.com/v1/search?q=album:" + searchingText + "&type=album&limit=10", // Limit the number for ten results
    true
  );
  xhr.send(null);
} // End: makeAJAXRequest()



/*************** Adding the event handlers ***************/
searchForm.addEventListener('submit', (event) => {
    // Prevent the default behavior of the browser and start searching
    event.preventDefault();
    let searchingValue = searchInput.value;
    getAllAlbumsRequest(searchingValue);
});


overlay.addEventListener('click', () => {
  overlay.style.display = 'none';
});
