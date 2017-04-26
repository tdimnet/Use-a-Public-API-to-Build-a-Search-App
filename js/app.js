/*************** Targeting the elements already present inside the page ***************/
const searchForm = document.querySelector('.search-form');
const searchInput = document.getElementById('search');
const mainContent = document.getElementById('main-content');



/*************** The AJAX function ***************/
// If there is no album to show
const noAlbumFound = (text) => {
  let responseHTML = "<li class='no-albums desc'>";
  responseHTML += "<i class='material-icons icon-help'>help_outline</i>No albums found that match: ";
  responseHTML += text;
  responseHTML += '</li>';
  return responseHTML;
};

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
    albumHTML += '</li>';
  }
  albumHTML += '</ul>';
  return albumHTML;
};

// The Ajax request which calls: the two functions above
const makeAJAXRequest = (searchingText) => {
  let xhr = new XMLHttpRequest();

  xhr.onreadystatechange = () => {
    if(xhr.readyState === 4) {

      if (xhr.status === 200) {

        let albumSearched = searchingText;
        let responseText = JSON.parse(xhr.responseText);
        let albumsArray = responseText.albums.items;

        if (albumsArray.length === 0) {
          let responseHTML = noAlbumFound(albumSearched);
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
    makeAJAXRequest(searchingValue);
});
