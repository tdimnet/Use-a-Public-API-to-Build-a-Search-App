/*************** Targeting the elements already present inside the page ***************/
const searchForm = document.querySelector('.search-form');
const searchInput = document.getElementById('search');



/*************** Creating the html element to display ***************/



/*************** The AJAX function ***************/
function makeAJAXRequest(searchingText) {
  let xhr = new XMLHttpRequest();

  xhr.onreadystatechange = () => {
    if(xhr.readyState === 4) {
      console.log('connected');
      if (xhr.status === 200) {
        let responseText = JSON.parse(xhr.responseText);
        let albumsArray = responseText.albums.items;

        for (let i = 0; i < albumsArray.length; i++) {

        }

        console.log(albumsArray);
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
