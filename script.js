// let fakeMoviesAPI = {
//     "dates": {
//         "maximum": "2023-06-05",
//         "minimum": "2023-04-18"
//     },
//     "page": 1,
//     "results": [
//         {
//             "adult": false,
//             "backdrop_path": "/9n2tJBplPbgR2ca05hS5CKXwP2c.jpg",
//             "genre_ids": [
//                 16,
//                 10751,
//                 12,
//                 14,
//                 35
//             ],
//             "id": 502356,
//             "original_language": "en",
//             "original_title": "The Super Mario Bros. Movie",
//             "overview": "While working underground to fix a water main, Brooklyn plumbers—and brothers—Mario and Luigi are transported down a mysterious pipe and wander into a magical new world. But when the brothers are separated, Mario embarks on an epic quest to find Luigi.",
//             "popularity": 3392.2,
//             "poster_path": "/qNBAXBIQlnOThrVvA6mA2B5ggV6.jpg",
//             "release_date": "2023-04-05",
//             "title": "The Super Mario Bros. Movie",
//             "video": false,
//             "vote_average": 7.8,
//             "vote_count": 4327
//         },
//         {
//             "adult": false,
//             "backdrop_path": "/2I5eBh98Q4aPq8WdQrHdTC8ARhY.jpg",
//             "genre_ids": [
//                 28,
//                 12,
//                 16,
//                 878
//             ],
//             "id": 569094,
//             "original_language": "en",
//             "original_title": "Spider-Man: Across the Spider-Verse",
//             "overview": "After reuniting with Gwen Stacy, Brooklyn’s full-time, friendly neighborhood Spider-Man is catapulted across the Multiverse, where he encounters the Spider Society, a team of Spider-People charged with protecting the Multiverse’s very existence. But when the heroes clash on how to handle a new threat, Miles finds himself pitted against the other Spiders and must set out on his own to save those he loves most.",
//             "popularity": 2921.844,
//             "poster_path": "/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg",
//             "release_date": "2023-05-31",
//             "title": "Spider-Man: Across the Spider-Verse",
//             "video": false,
//             "vote_average": 8.8,
//             "vote_count": 739
//         },
//         {
//             "adult": false,
//             "backdrop_path": "/4t0oBFrJyweYPt0hocW6RUa0b6H.jpg",
//             "genre_ids": [
//                 28,
//                 80,
//                 53
//             ],
//             "id": 385687,
//             "original_language": "en",
//             "original_title": "Fast X",
//             "overview": "Over many missions and against impossible odds, Dom Toretto and his family have outsmarted, out-nerved and outdriven every foe in their path. Now, they confront the most lethal opponent they've ever faced: A terrifying threat emerging from the shadows of the past who's fueled by blood revenge, and who is determined to shatter this family and destroy everything—and everyone—that Dom loves, forever.",
//             "popularity": 2334.66,
//             "poster_path": "/1E5baAaEse26fej7uHcjOgEE2t2.jpg",
//             "release_date": "2023-05-17",
//             "title": "Fast X",
//             "video": false,
//             "vote_average": 7.1,
//             "vote_count": 854
//         },
//     ],
//     "total_pages": 98,
//     "total_results": 1951
// } 

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
- FIX SEARCH BUTTON
- MORE ACCESSIBILITY FEATURES
- CLOSE-SEARCH-BTN
- WALKTHROUGH VID
- REFLECTION QUESTIONS

- FIX MOVIE DETAILS BUTTON --> POPUP?
- MOVIE TRAILERS PREVIEW?
- DEPLOY USING GITHUB PAGES

*/



const searchForm = document.createElement("form");
searchForm.id = "search-form";
searchForm.classList.add("search-form");
searchForm.innerHTML = "Enter your search here: ";
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

// console.log(searchInput);
// console.log(searchInput.value);

// /**
//  * Make the actual `fetch` request to the Movie API
//  * and appropriately handle the response.
//  *
//  * @param {String} searchTerm - The user input text used as the search query
//  *
//  */
// async function getMovieApiResults(searchTerm) {
//     // YOUR CODE HERE
//     const response = await fetch(createMovieEndpointUrl(searchTerm, limit)) // await bc async function
//     const jsonResponse = await response.json() // await bc async function
//     console.log(jsonResponse);
//     return jsonResponse;
//     // console.log(jsonResponse.data)
//     // return jsonResponse.data // async function
//   }

/**
 * The function responsible for handling all form submission events.
 *
 * @param {SubmitEvent} event - The SubmitEvent triggered when submitting the form
 *
 */
async function handleFormSubmit(event) {
    // console.log("submission corrrect??") // failed
    // YOUR CODE HERE
   
  
    event.preventDefault()
    // disables the default handling of the form submission event, which will cause the page to reload
    
    // reset results display section
    // state.pageID = 1;
    console.log("REACHED FORM SUBMIT");
    state.searchTerm = searchInput.value;
    // console.log(state.searchTerm);
    // console.log(searchInput.value);
    // const results = await getMovieApiResults(state.searchTerm) // await bc async function
    
    allMoviesContainer.innerHTML = "";


    const results = await getResponse(state.searchTerm);
    // displayResults(results) /// fix
    searchInput.id = "searchInput";
    // searchInput.ariaLabel = "hello"; // for accessibility
    searchInput.value = "";
    console.log(searchInput.value);
    console.log(state.searchTerm);
    
    showMoreButton.classList?.remove?.("hidden");
  
  }


// console.log(createMovieEndpointUrl(searchTerm, limit));
//searchInput.value = "";


// searchButton.addEventListener("click", () => {
//     console.log("testing the button press"); // need to change
//     // generateCards(moviesObject) // generate the same thing? change to generate more things
//   });

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
    state.pageID += 1;
    console.log(state.pageID);
    const results = await getResponse(state.searchTerm);
    // displayResults(results)

  }
  
function getResponse(searchTerm){    
    // const searchTerm = searchInput.value;
    console.log(searchTerm);
    // console.log(state.pageID);
    if (state.originalRender == 1){
        linkToFetch = originalCreateMovieEndpointUrl(state.pageID);
    } else {
        linkToFetch = createMovieEndpointUrl(searchTerm, state.pageID);
    }

    // fetch(createMovieEndpointUrl(searchTerm, state.pageID))
    fetch(linkToFetch)
    .then(response => {return response.json()})
    .then(response => {
        // console.log(response)
        console.log(response.results);
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
    movieImage.src = "https://image.tmdb.org/t/p/w342" + movieObject.poster_path;
    // document.body.insertBefore(image, averageContainer);

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


// generateCards(fakeMoviesAPI);

getResponse(state.searchTerm); // move to onload?
state.originalRender=0;
const showMoreButton = document.createElement("BUTTON");
showMoreButton.id = "load-more-movies-btn";
showMoreButton.classList.add("load-more-movies-btn");
showMoreButton.innerHTML = "Load More!";
document.body.appendChild(showMoreButton); // should be at bottom - fix


window.onload = function () {
    
    searchForm.addEventListener("submit", handleFormSubmit);
    // console.log(searchForm) 
    showMoreButton.addEventListener("click", handleShowMore);
    // console.log("hi")
  }
