/*************** Targeting the elements already present inside the page ***************/
const searchForm = document.querySelector('.search-form');
const searchInput = document.getElementById('search');

const albumsDiv = document.getElementById('albums');

const testDiv = document.querySelector('.test');


/*************** Creating the html element to display ***************/



/*************** The AJAX function ***************/
function makeAJAXRequest(searchingText) {
  let xhr = new XMLHttpRequest();

  // <li>
  //   <div class="album-wrap">
  //     <img class="album-art" src="https://i.scdn.co/image/23837f31d4791981db85588e57a86cf2ce5b88e3">
  //   </div>
  //   <span class="album-title">Luck of the Draw</span>
  //   <span class="album-artist">Bonnie Raitt</span>
  // </li>

  xhr.onreadystatechange = () => {
    if(xhr.readyState === 4) {
      console.log('connected');
      if (xhr.status === 200) {
        let responseText = JSON.parse(xhr.responseText);
        let albumsArray = responseText.albums.items;
        let albumHTML;
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
        // albumHTML += '</ul>';

        // Add the end, append the albumHTML to the test div
        albumsDiv.innerHTML = albumHTML;
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
    console.log(searchingValue);

    makeAJAXRequest(searchingValue);
});
