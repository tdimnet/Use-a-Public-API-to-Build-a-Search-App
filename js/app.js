/*************** Targeting the elements already present inside the page ***************/
const searchForm = document.querySelector('.search-form');
const searchInput = document.getElementById('search');



/*************** The AJAX function ***************/
function makeTheAJAXRequest(searchingText) {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
        checkTheResponse(xhr);
    };
    xhr.open('GET', "https://api.spotify.com/v1/search?q=" + searchingText + "&type=album", true);
    xhr.send(null);
}

function checkTheResponse(httpRequest) {
    if (httpRequest.readyState === 4) {
        if (httpRequest.status === 200) {
            // console.log(httpRequest.responseText);
        } else {
            console.log('Something went wrong');
        }
    }
}




/*************** Adding the event handlers ***************/
searchForm.addEventListener('submit', (event) => {
    // Prevent the default behavior of the browser and start searching
    event.preventDefault();
    let searchingValue = searchInput.value;

    console.log(searchingValue);

    makeTheAJAXRequest(searchingValue);
});