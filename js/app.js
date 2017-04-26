/*************** Targeting the elements already present inside the page ***************/
const searchForm = document.querySelector('.search-form');
const searchInput = document.getElementById('search');

const mainContent = document.getElementById('main-content');

/*************** Creating the html element to display ***************/



/*************** The AJAX function ***************/
const noAlbumFound = (searchingText) => {
  let responseHTML = "<li class='no-albums desc'>";
  responseHTML += "<i class='material-icons icon-help'>help_outline</i>No albums found that match: ";
  responseHTML += searchingText;
  responseHTML += '</li>';
  return responseHTML;
};

// <li class='no-albums desc'>
//   <i class='material-icons icon-help'>help_outline</i>No albums found that match: [search form value].
// </li>

function makeAJAXRequest(searchingText) {
  let xhr = new XMLHttpRequest();

  xhr.onreadystatechange = () => {
    if(xhr.readyState === 4) {
      console.log('connected');
      if (xhr.status === 200) {
        let responseText = JSON.parse(xhr.responseText);
        let albumsArray = responseText.albums.items;
        if (albumsArray.length === 0) {
          let responseHTML = noAlbumFound(searchingText);
          mainContent.innerHTML = responseHTML;
        } else {
          let albumHTML = '<ul id="albums" class="album-list">';
          for (let i = 0; i < albumsArray.length; i++) {
            albumHTML += '<li>';
                albumHTML += '<div class="album-wrap">';
                  albumHTML += '<img class="album-art"';
                    albumHTML += 'src="' + albumsArray[i].images[1].url + '"';
                  albumHTML += '>';
                albumHTML += '</div>';
              albumHTML += '<span class="album-title">';
                albumHTML += albumsArray[i].name;
              albumHTML += '</span>';
            albumHTML += '</li>';
          }
          albumHTML += '</ul>';

          // Add the end, append the albumHTML to the test div
          mainContent.innerHTML = albumHTML;
        }



      } else {
        console.log('An error occured, sorry :/');
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
