let fakeMoviesAPI = {
    "dates": {
        "maximum": "2023-06-05",
        "minimum": "2023-04-18"
    },
    "page": 1,
    "results": [
        {
            "adult": false,
            "backdrop_path": "/9n2tJBplPbgR2ca05hS5CKXwP2c.jpg",
            "genre_ids": [
                16,
                10751,
                12,
                14,
                35
            ],
            "id": 502356,
            "original_language": "en",
            "original_title": "The Super Mario Bros. Movie",
            "overview": "While working underground to fix a water main, Brooklyn plumbers—and brothers—Mario and Luigi are transported down a mysterious pipe and wander into a magical new world. But when the brothers are separated, Mario embarks on an epic quest to find Luigi.",
            "popularity": 3392.2,
            "poster_path": "/qNBAXBIQlnOThrVvA6mA2B5ggV6.jpg",
            "release_date": "2023-04-05",
            "title": "The Super Mario Bros. Movie",
            "video": false,
            "vote_average": 7.8,
            "vote_count": 4327
        },
        {
            "adult": false,
            "backdrop_path": "/2I5eBh98Q4aPq8WdQrHdTC8ARhY.jpg",
            "genre_ids": [
                28,
                12,
                16,
                878
            ],
            "id": 569094,
            "original_language": "en",
            "original_title": "Spider-Man: Across the Spider-Verse",
            "overview": "After reuniting with Gwen Stacy, Brooklyn’s full-time, friendly neighborhood Spider-Man is catapulted across the Multiverse, where he encounters the Spider Society, a team of Spider-People charged with protecting the Multiverse’s very existence. But when the heroes clash on how to handle a new threat, Miles finds himself pitted against the other Spiders and must set out on his own to save those he loves most.",
            "popularity": 2921.844,
            "poster_path": "/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg",
            "release_date": "2023-05-31",
            "title": "Spider-Man: Across the Spider-Verse",
            "video": false,
            "vote_average": 8.8,
            "vote_count": 739
        },
        {
            "adult": false,
            "backdrop_path": "/4t0oBFrJyweYPt0hocW6RUa0b6H.jpg",
            "genre_ids": [
                28,
                80,
                53
            ],
            "id": 385687,
            "original_language": "en",
            "original_title": "Fast X",
            "overview": "Over many missions and against impossible odds, Dom Toretto and his family have outsmarted, out-nerved and outdriven every foe in their path. Now, they confront the most lethal opponent they've ever faced: A terrifying threat emerging from the shadows of the past who's fueled by blood revenge, and who is determined to shatter this family and destroy everything—and everyone—that Dom loves, forever.",
            "popularity": 2334.66,
            "poster_path": "/1E5baAaEse26fej7uHcjOgEE2t2.jpg",
            "release_date": "2023-05-17",
            "title": "Fast X",
            "video": false,
            "vote_average": 7.1,
            "vote_count": 854
        },
    ],
    "total_pages": 98,
    "total_results": 1951
}

// const options = {
//     method: 'GET',
//     headers: {
//       accept: 'application/json',
//       Authorization: "RXqwRIzTKNCuE32A6fSJFG4kiYoob3hv"
//     }
//   };
  

// fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', options)
// .then(response => {return response.json()})
// .then(response => {
//     // console.log(response)
//     return response
// })
// .then(console.log("hi")) // fix?


// Global Constants
const apiKey = "RXqwRIzTKNCuE32A6fSJFG4kiYoob3hv"

const GIPHY_API_BASE_URL = `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1`

const createMoviesEndpointUrl = () =>
  `${GIPHY_API_BASE_URL}?api_key=${apiKey}`

/**
 * Make the actual `fetch` request to the Movies API
 * and appropriately handle the response.
 *
 * 
 *
 */
async function getMoviesApiResults() {
    // YOUR CODE HERE
    const response = await fetch(createMoviesEndpointUrl()) // await bc async function
    const jsonResponse = await response.json() // await bc async function
    console.log(jsonResponse.data)
    return jsonResponse.data // async function
}


// let firstMovie = fakeMoviesAPI.results[0]
// console.log(fakeMoviesAPI.results[0])


function generateOneCard(movieObject){
  
    // create star
    let star = document.createElement("span");
    star.classList.add("star");
    let starContent = document.createTextNode("⭐");
    star.appendChild(starContent);
    // document.body.appendChild(star);

    // create rating
    let rating = document.createElement("span");
    let ratingContent = document.createTextNode(movieObject.vote_average);
    // console.log(movieObject.vote_average);
    rating.classList.add("rating");
    rating.appendChild(ratingContent);
    // document.body.appendChild(rating);

    // create average container
    let averageContainer = document.createElement("div");
    averageContainer.classList.add("average");
    averageContainer.appendChild(star);
    averageContainer.appendChild(rating);
    // document.body.appendChild(averageContainer);
    // console.log(averageContainer);
    

    // create image
    let movieImage = document.createElement("img");
    // console.log(movieObject.poster_path);
    movieImage.src = "https://image.tmdb.org/t/p/w342" + movieObject.poster_path;
    // document.body.insertBefore(image, averageContainer);

    // create title
    let movieTitle = document.createElement("div");
    movieTitle.classList.add("movieTitle");
    movieTitle.innerText = movieObject.original_title;
    // document.body.insertBefore(movieTitle, averageContainer);

    let movie = document.createElement("section");
    movie.classList.add("movieClass")
    movie.appendChild(movieImage);
    movie.appendChild(averageContainer);
    movie.appendChild(movieTitle);
    document.body.appendChild(movie);
}

function generateCards(moviesObject){
  
    // for every movie, do this:

    // const movieObject = fakeMoviesAPI;
    movies = moviesObject.results;
    movies.forEach((movie) => {
        generateOneCard(movie)
    })

    const button = document.createElement("BUTTON");
    button.innerHTML = "Load More";
    document.body.appendChild(button);

    button.addEventListener("click", () => {
        // fetch(`/wp-json/blog-posts/all-posts`)
        //   .then((response) => response.json())
        //   .then((data) => {
        //     // NEXT JS CODE WILL GO HERE
        //   })
        //   .catch((err) => {
        //     console.log("Something went wrong!", err);
        //   });
        generateCards(moviesObject) // generate the same thing?
      });
    
}

  // create pageTitle
  let pageTitle = document.createElement("span");
  pageTitle.classList.add("title");
  let pageTitleContent = document.createTextNode("🍿 Flixster");
  pageTitle.appendChild(pageTitleContent);
  document.body.appendChild(pageTitle);


// generateOneCard(fakeMoviesAPI.results[0]);
generateCards(fakeMoviesAPI);

// document.body.addEventListener("click", handleShowMore)
