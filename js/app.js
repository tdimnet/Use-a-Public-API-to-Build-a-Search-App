/*************** Targeting the elements already present inside the page ***************/
const searchForm = document.querySelector('.search-form');
const searchInput = document.getElementById('search');



/*************** The AJAX function ***************/
function makeAJAXRequest(searchingText) {
  let xhr = new XMLHttpRequest();

  xhr.onreadystatechange = () => {
    if(xhr.readyState === 4) {
      console.log('connected');
      if (xhr.status === 200) {
        let responseText = JSON.parse(xhr.responseText);
        console.log(responseText);
      } else {
        console.log('An error occured, sorry :/');
      }
    }

  }

  xhr.open('GET', "https://api.spotify.com/v1/search?q=" + searchingText + "&type=album", true);
  xhr.send(null);
}




/*************** Adding the event handlers ***************/
searchForm.addEventListener('submit', (event) => {
    // Prevent the default behavior of the browser and start searching
    event.preventDefault();
    let searchingValue = searchInput.value;
    console.log(searchingValue);

    makeAJAXRequest(searchingValue);
});
