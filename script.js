// Global Constants
const ORIGINAL_MOVIES_API_BASE_URL = "https://api.themoviedb.org/3/movie/now_playing?language=en-US";
const MOVIES_API_BASE_URL = "https://api.themoviedb.org/3/search/movie?"

// const limit = 9;
const apiKey="28152e8bb4f19448c4ceb9613f74ffb0";
// add page incrementng
// https://api.themoviedb.org/3/search/movie?query=zz&api_key=28152e8bb4f19448c4ceb9613f74ffb0

// personalized url for user input term
const createMovieEndpointUrl = (searchTerm, pageID) => `${MOVIES_API_BASE_URL}page=${pageID}&query=${searchTerm}&api_key=${apiKey}`
// https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=3&api_key=28152e8bb4f19448c4ceb9613f74ffb0
const originalCreateMovieEndpointUrl = (pageID) => `${ORIGINAL_MOVIES_API_BASE_URL}&page=${pageID}&api_key=${apiKey}`
// resets to page 1 if over page limit - new feature to make page tabs instead of reloading
const state = {
    searchTerm: "",
    pageID:1,
    originalRender:1, // boolean for first time loading it
    popup:""
}

/*
Extra features:
- MOVIE DETAILS BUTTON --> POPUP?
- DEPLOY USING GITHUB PAGES?
- GENERATE IMAGES AS YOU TYPE INSTEAD OF PRESSING BUTTON?
- DROPDOWN FEATURE AS WE TYPE?
*/

 // create pageTitle
 let pageTitle = document.createElement("span");
 pageTitle.classList.add("title");
 let pageTitleContent = document.createTextNode("🍿 Flixster");
 pageTitle.appendChild(pageTitleContent);
 document.body.appendChild(pageTitle);

const searchForm = document.createElement("form");
searchForm.id = "search-form";
searchForm.classList.add("search-form");
searchForm.innerHTML = "Enter your search here:    ";
document.body.appendChild(searchForm);

const searchInput = document.createElement("INPUT");
searchInput.id = "search-input";
searchInput.innerHTML = "Search Here!!";
// state.searchTerm = searchInput.value;
const searchDropdown = document.createElement("emoji-picker");
searchForm.appendChild(searchDropdown);
searchForm.appendChild(searchInput);

const searchButton = document.createElement("BUTTON");
// searchButton.value = "Search";
searchButton.id = "search-button";
searchButton.classList.add("search-button");
searchButton.innerHTML = "Generate Search";
searchForm.appendChild(searchButton);

//  let allMoviesContainer = document.createElement("div");
 let allMoviesContainer = document.getElementById("newcontainerformovies");
 allMoviesContainer.classList.add("movies-grid");

 const closeSearchButton = document.createElement("BUTTON");
// searchButton.value = "Search";
closeSearchButton.id = "close-search-btn";
closeSearchButton.classList.add("close-search-btn");
closeSearchButton.innerHTML = "Close Search";

const togglePagesContainer = document.createElement("div");
togglePagesContainer.id = "toggle-pages";
togglePagesContainer.classList.add("toggle-pages");
togglePagesContainer.innerHTML = "Toggle through pages here:    ";

const showMoreButton = document.createElement("BUTTON");
showMoreButton.id = "load-more-movies-btn";
showMoreButton.classList.add("load-more-movies-btn");
showMoreButton.innerHTML = "Next Page >> ";

const previousPageButton = document.createElement("BUTTON");
previousPageButton.id = "load-more-movies-btn";
previousPageButton.classList.add("load-more-movies-btn");
previousPageButton.innerHTML = "<< Previous Page";
togglePagesContainer.appendChild(previousPageButton);
togglePagesContainer.appendChild(showMoreButton);
document.body.appendChild(togglePagesContainer);
 
// create subtitle
 let pageSubtitle = document.createElement("span");
 pageSubtitle.classList.add("subtitle");
 let pageSubtitleContent = document.createTextNode("Now Playing...");
 pageSubtitle.appendChild(pageSubtitleContent);
 document.body.appendChild(pageSubtitle);

/**
 * The function responsible for handling all close form submission events.
 *
 * @param {SubmitEvent} event - The SubmitEvent triggered when submitting the form
 *
 */
 async function handleCloseForm(event){
    console.log(state.searchTerm);

    state.searchTerm = "";
    console.log(state.searchTerm);
    state.pageID = 1
    state.originalRender = 1;
    // state.searchTerm = "";
    // closeSearchButton.innerHTML = "".
    const results = await getResponse(state.searchTerm);
    // remove load more button
    // showMoreButton.style.display = "none";
    closeSearchButton.style.display = "none";
 }


/**
 * The function responsible for handling all form submission events.
 *
 * @param {SubmitEvent} event - The SubmitEvent triggered when submitting the form
 *
 */
async function handleFormSubmit(event) {
    // closeSearButton.style.display = "block"; // brring cancel button back
    state.originalRender = 0;
    state.pageID = 1;
    document.body.appendChild(closeSearchButton);
    closeSearchButton.style.display = "block";
    event.preventDefault()
    // disables the default handling of the form submission event, which will cause the page to reload
    
    // reset results display section
    // console.log("REACHED FORM SUBMIT");
    state.searchTerm = searchInput.value;
    // const results = await getMovieApiResults(state.searchTerm) // await bc async function
    
    allMoviesContainer.innerHTML = "";

    const results = await getResponse(state.searchTerm);
    // displayResults(results) /// fix
    searchInput.id = "searchInput";
    // searchInput.ariaLabel = "hello"; // for accessibility
    searchInput.value = "";

    // document.body.appendChild(showMoreButton); // should be at bottom - TODO: fix

    // document.body.appendChild(previousPageButton); // should be at bottom - TODO: fix
    // make a container in htmp and append in javascript
    showMoreButton.classList?.remove?.("hidden");
    previousPageButton.classList?.remove?.("hidden");
  }
// searchButton.addEventListener("submit", handleFormSubmit);


/**
 * Handle fetching the previous set of results from the Giphy API
 * using the same search term from the previous query.
 *
 * @param {MouseEvent} event - The 'click' MouseEvent triggered by clicking the 'Show more' button
 *
 */
async function handleShowPrevious(event){
        allMoviesContainer.innerHTML = ""; // remove previous results
        state.pageID -= 1;
        console.log(state.pageID);
        const results = await getResponse(state.searchTerm);
}

/**
 * Handle fetching the next set of results from the Giphy API
 * using the same search term from the previous query.
 *
 * @param {MouseEvent} event - The 'click' MouseEvent triggered by clicking the 'Show more' button
 *
 */
async function handleShowMore(event) {
    // YOUR CODE HERE
    // const results = await getMovieApiResults(state.searchTerm) // await bc async function
    allMoviesContainer.innerHTML = ""; // remove previous results
    state.pageID += 1;
    console.log(state.pageID);
   
    const results = await getResponse(state.searchTerm);
    // displayResults(results)
  }
  
function getResponse(searchTerm){    
    // const searchTerm = searchInput.value;
    // console.log(searchTerm);
    // console.log(state.pageID);
    if (state.originalRender == 1){ // not the original render
        linkToFetch = originalCreateMovieEndpointUrl(state.pageID);
    } else {
        linkToFetch = createMovieEndpointUrl(searchTerm, state.pageID);
        console.log(linkToFetch);
    }
    allMoviesContainer.innerHTML = ""; // remove previous results
    // fetch(createMovieEndpointUrl(searchTerm, state.pageID))
    fetch(linkToFetch)
    .then(response => {return response.json()})
    .then(response => {
        // console.log(response)
        console.log(response.results);
        // responseHERE = response;
        let all_movies = response.results;

        // for all movies do this
        all_movies.forEach((newMovie) => {    

            // console.log("about to call generateOne card")
            allMoviesContainer.appendChild(generateOneCard(newMovie));
            document.body.appendChild(allMoviesContainer);
        })
        
    })
}


function generateOneCard(movieObject){

    // create star
    let star = document.createElement("span");
    star.classList.add("star");
    let starContent = document.createTextNode("⭐ ");
    star.appendChild(starContent);
    // document.body.appendChild(star);

    // create rating
    let rating = document.createElement("span");
    let ratingContent = document.createTextNode(movieObject.vote_average);
    // console.log(movieObject.vote_average);
    rating.classList.add("movie-votes");
    rating.appendChild(ratingContent);
    // document.body.appendChild(rating);

    // create average container (star + rating)
    let averageContainer = document.createElement("div");
    averageContainer.classList.add("average");
    averageContainer.appendChild(star);
    averageContainer.appendChild(rating);
    // document.body.appendChild(averageContainer);
    // console.log(averageContainer);
    

    // create image
    let movieImage = document.createElement("img");
    movieImage.id = "movie-id";
   
    movieImage.classList.add("movie-poster");
    // console.log(movieObject.poster_path);
    if (movieImage.poster_path != ""){ // poster is available on api
        movieImage.src = "https://image.tmdb.org/t/p/w342" + movieObject.poster_path;
    // document.body.insertBefore(image, averageContainer);
    } else {
        // make it a blank page
        movieImage.src = "/download.jpeg";
    }
    // let movieDescription = document.createElement("div");
    // movieDescription.classList.add("movie-description");
    // movieDescription.innerText = movieImage.overview;
    state.popup = movieImage.overview;
    // <div>
    //     state.popup;
    // </div>
    // TODO: POPUP FOR EVERY MOVIE
    

    // create title
    let movieTitle = document.createElement("div");
    movieTitle.classList.add("movie-title");
    movieTitle.innerText = movieObject.original_title;
    // document.body.insertBefore(movieTitle, averageContainer);

    const openPopupButton = document.createElement("BUTTON");
    openPopupButton.id = "movie-button";
    openPopupButton.classList.add("movie-button");
    openPopupButton.innerHTML = "Click for movie details!";
    // document.body.appendChild(movieButton);

    let movie = document.createElement("section");
    movie.classList.add("movie-card")
    movie.appendChild(movieImage);
    movie.appendChild(averageContainer);
    movie.appendChild(movieTitle);
    movie.appendChild(openPopupButton);
    openPopupButton.addEventListener("click", function(){
        popupContainer.style.display = "flex";
        window.scrollTo(0, 0); // bring you top of the page
        // console.log("popup opened!");

        const closePopupButton = document.getElementById("closePopup");
        closePopupButton.addEventListener("click", function(){
            console.log("popup closed");
            popupContainer.style.display = "none";
        });
    });
    return movie;
    // document.body.appendChild(movie);
   
}
// function generatePopUp(){
//     var popup = document.getElementById("popUpElement");
//     popup.classList.toggle("show");
//     console.log("hi popup");

// }

function generatePopUp() {
    var popup = document.getElementById("popUpElement");
    popup.classList.toggle("show");

}


getResponse(state.searchTerm);

window.onload = function () {
    popupContainer.style.display = "none";
    closeSearchButton.addEventListener("click", handleCloseForm);
    searchForm.addEventListener("submit", handleFormSubmit);
    // console.log(searchForm) 
    showMoreButton.addEventListener("click", handleShowMore);

    previousPageButton.addEventListener("click", handleShowPrevious);
    // movieButton.addEventListener("click", function(){
    //     console.log("opened popp");
    //     popupContainer.style.display = "flex";
    // });
    // closePopupButton.addEventListener("click", function(){
    //     popupContainer.style.display = "none";

    // });
// console.log("hi")

  }
  
