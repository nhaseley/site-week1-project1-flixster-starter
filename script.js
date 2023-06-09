// Global Constants
const ORIGINAL_MOVIES_API_BASE_URL = "https://api.themoviedb.org/3/movie/now_playing?language=en-US";
const MOVIES_API_BASE_URL = "https://api.themoviedb.org/3/search/movie?"

// const limit = 9;
const apiKey="28152e8bb4f19448c4ceb9613f74ffb0";
// add page incrementng
// https://api.themoviedb.org/3/search/movie?query=zz&api_key=28152e8bb4f19448c4ceb9613f74ffb0

// personalized url for user input term
const createMovieEndpointUrl = (searchTerm, pageID) => `${MOVIES_API_BASE_URL}page=${pageID}&query=${searchTerm}&api_key=${apiKey}`

const originalCreateMovieEndpointUrl = (pageID) => `${ORIGINAL_MOVIES_API_BASE_URL}page=${pageID}&api_key=${apiKey}`
// resets to page 1 if over page limit - new feature to make page tabs instead of reloading
const state = {
    searchTerm: "",
    pageID:1,
    originalRender:1 // boolean for first time loading it
}
/*
TODO:
- FIX 404 ERROR MESSAGE
- MORE ACCESSIBILITY FEATURES
- WALKTHROUGH VID
- REFLECTION QUESTIONS

- FIX MOVIE DETAILS BUTTON --> POPUP?
- MOVIE TRAILERS PREVIEW?
- DEPLOY USING GITHUB PAGES
- GENERATE IMAGES AS YOU TYPE INSTEAD OF PRESSING BUTTON?
- DROPDOWN FEATURE AS WE TYPE
*/


const searchForm = document.createElement("form");
searchForm.id = "search-form";
searchForm.classList.add("search-form");
searchForm.innerHTML = "Enter your search here:    ";
document.body.appendChild(searchForm);


const searchInput = document.createElement("INPUT");
searchInput.id = "search-input";
searchInput.innerHTML = "Search Here!!";
// state.searchTerm = searchInput.value;
searchForm.appendChild(searchInput);

const searchButton = document.createElement("BUTTON");
// searchButton.value = "Search";
searchButton.id = "search-button";
searchButton.classList.add("search-button");
searchButton.innerHTML = "Generate Search";
searchForm.appendChild(searchButton);

 // create pageTitle
 let pageTitle = document.createElement("span");
 pageTitle.classList.add("title");
 let pageTitleContent = document.createTextNode("🍿 Flixster");
 pageTitle.appendChild(pageTitleContent);
 document.body.appendChild(pageTitle);


 let allMoviesContainer = document.createElement("div");
 allMoviesContainer.classList.add("movies-grid");
 
 const closeSearchButton = document.createElement("BUTTON");
// searchButton.value = "Search";
closeSearchButton.id = "close-search-btn";
closeSearchButton.classList.add("close-search-btn");
closeSearchButton.innerHTML = "Close Search";

const showMoreButton = document.createElement("BUTTON");
showMoreButton.id = "load-more-movies-btn";
showMoreButton.classList.add("load-more-movies-btn");
showMoreButton.innerHTML = "Load More!";


 /**
 * The function responsible for handling all close form submission events.
 *
 * @param {SubmitEvent} event - The SubmitEvent triggered when submitting the form
 *
 */
 async function handleCloseForm(event){
    // console.log("closing??");
    console.log(state.searchTerm);

    state.searchTerm = "";
    console.log(state.searchTerm);
    state.originalRender = 1;
    // state.searchTerm = "";
    // closeSearchButton.innerHTML = "".
    const results = await getResponse(state.searchTerm);
    // remove load more button
    showMoreButton.style.display = "none";
    closeSearchButton.style.display = "none";
    // showMoreButton.classList?.remove?.("hidden");

 }


/**
 * The function responsible for handling all form submission events.
 *
 * @param {SubmitEvent} event - The SubmitEvent triggered when submitting the form
 *
 */
async function handleFormSubmit(event) {
   
    document.body.appendChild(closeSearchButton);
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

    document.body.appendChild(showMoreButton); // should be at bottom - TODO: fix
    showMoreButton.classList?.remove?.("hidden");
  }
// searchButton.addEventListener("submit", handleFormSubmit);

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
    if (state.originalRender == 1){
        linkToFetch = originalCreateMovieEndpointUrl(state.pageID);
        console.log(linkToFetch);
        console.log("link looks good!");

    } else {
        linkToFetch = createMovieEndpointUrl(searchTerm, state.pageID);
        console.log(linkToFetch);
    }
    allMoviesContainer.innerHTML = ""; // remove previous results

    console.log("about to regenerate")
    // fetch(createMovieEndpointUrl(searchTerm, state.pageID))
    fetch(linkToFetch)
    .then(response => {return response.json()})
    .then(response => {
        // console.log(response)
        // console.log(response.results);
        // responseHERE = response;
        let all_movies = response.results;

        // console.log(all_movies);
        // remove everything from movie grid!!
        // if (allMoviesContainer.hasChildNodes){
        //     while (allMoviesContainer.hasChildNodes){
        //         allMoviesContainer.removeChild(allMoviesContainer.firstChild)
        //     }
        // }

        // for all movies do this
        all_movies.forEach((newMovie) => {    

            // console.log("about to call generateOne card")
            allMoviesContainer.appendChild(generateOneCard(newMovie));
            document.body.appendChild(allMoviesContainer);
        })
        
        
        // showMoreButton.addEventListener("click", handleShowMore);

        // showMoreButton.addEventListener("click", () => {
            
        //     console.log("hi"); // need to change
        //     // generateCards(moviesObject) // generate the same thing? change to generate more things
        //   });

        // return response 
        
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
    movieImage.classList.add("movie-poster");
    // console.log(movieObject.poster_path);
    // TODO: ERROR CHECK FOR NONEXISTENT PATHS?

    movieImage.src = "https://image.tmdb.org/t/p/w342" + movieObject.poster_path;
    // document.body.insertBefore(image, averageContainer);

    let movieDescription = document.createElement("div");
    movieDescription.classList.add("movie-description");
    movieDescription.innerText = movieImage.overview;
    // TODO: POPUP FOR EVERY MOVIE

    // create title
    let movieTitle = document.createElement("div");
    movieTitle.classList.add("movie-title");
    movieTitle.innerText = movieObject.original_title;
    // document.body.insertBefore(movieTitle, averageContainer);

    const movieButton = document.createElement("BUTTON");
    movieButton.id = "movie-button";
    movieButton.classList.add("movie-button");
    movieButton.innerHTML = "Click for movie details!";
    // document.body.appendChild(movieButton);


    let movie = document.createElement("section");
    movie.classList.add("movie-card")
    movie.appendChild(movieImage);
    movie.appendChild(averageContainer);
    movie.appendChild(movieTitle);
    movie.appendChild(movieButton);
    return movie;
    // document.body.appendChild(movie);
   
}

getResponse(state.searchTerm);
state.originalRender=0;

window.onload = function () {
    closeSearchButton.addEventListener("click", handleCloseForm);
    searchForm.addEventListener("submit", handleFormSubmit);
    // console.log(searchForm) 
    showMoreButton.addEventListener("click", handleShowMore);
    // console.log("hi")
  }
