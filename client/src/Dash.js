// Global Constants
const API_KEY = '55cbc13ab085a4e63cc2241e374000db'; // API key for TMDB
const BASE_URL = `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}`; // Base URL for trending movies
const searchInput = document.getElementById('searchInput');
const SEARCH_API = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=`;
const moviesContainer = document.querySelector('.trending_movies_cards'); // Container for trending movies
const paginationContainer = document.querySelector('.pagination'); // Container for pagination buttons
const modal = document.getElementById('movieModal'); // Modal for displaying movie details
const movieTitle = document.getElementById('movieTitle'); // Element for movie title in modal
const moviePoster = document.getElementById('moviePoster'); // Element for movie poster in modal
const movieOverview = document.getElementById('movieOverview'); // Element for movie overview in modal
const movieReleaseDate = document.getElementById('movieReleaseDate'); // Element for movie release date in modal
const movieRating = document.getElementById('movieRating'); // Element for movie rating in modal
const topSection = document.querySelector(".top_section");
const headText = document.querySelector(".head_text_container h2");
const paragraphText = document.querySelector(".head_text_container p");
const detailsButton = document.getElementById("details-button");

// Global Variables
let currentPage = 1; // Current page for pagination
let currNumOfMovies = 0;

// Fetch trending movies from TMDB API
function fetchTrendingMovies(page = 1) {
  const xhr = new XMLHttpRequest(); // Create a new XMLHttpRequest object
  const API_URL = `${BASE_URL}&page=${page}`; // API URL with page number

  xhr.open('GET', API_URL, true); // Initialize the request

  xhr.onload = function () {
    if (xhr.status === 200) { // If the request is successful
      const data = JSON.parse(xhr.responseText); // Parse the response JSON
      displayMovies(data.results); // Display the movies
      // setupPagination(page, data.total_pages); // Set up pagination
    } else {
      console.error('Error fetching trending movies:', xhr.statusText); // Log error if request fails
    }
  };

  xhr.onerror = function () {
    console.error('Network error while fetching trending movies.'); // Log network errors
  };

  xhr.send(); // Send the request
}

function fetchAndReturnMovies(page = 1, callback) {
  const xhr = new XMLHttpRequest(); // Create a new XMLHttpRequest object
  const API_URL = `${BASE_URL}&page=${page}`; // API URL with page number
  xhr.open('GET', API_URL, true); // Initialize the request
  xhr.onload = function () {
    if (xhr.status === 200) { // If the request is successful
      const data = JSON.parse(xhr.responseText); // Parse the response JSON
      callback(data.results)
    } else {
      console.error('Error fetching trending movies:', xhr.statusText); // Log error if request fails
      callback([])
    }
  };
  xhr.onerror = function () {
    console.error('Network error while fetching trending movies.'); // Log network errors
  };
  xhr.send(); // Send the request
}

// Display movies in the movies container
function displayMovies(movies) {
  movieData = movies[0]
  const backdropPath = movieData.backdrop_path;
  const backdropUrl = `https://image.tmdb.org/t/p/original${backdropPath}`;
  // // console.log('Backdrop URL:', backdropUrl);
  //
  // // Use the backdrop URL (e.g., set it as a background image)
  topSection.style.backgroundImage = `linear-gradient(to top, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0)), url(${backdropUrl})`
  paragraphText.innerHTML = movieData.overview
  headText.innerHTML = movieData.original_title
  detailsButton.setAttribute("movieId", movies[0].id)

  currNumOfMovies = movies.length;
  moviesContainer.innerHTML = movies.map(movie => `
    <div class="movie_card min-w-[200px] rounded-[12px] overflow-hidden cursor-pointer transition-all duration-300 ease-in-out hover:scale-[1.03] active:scale-[0.97]" movieId="${movie.id}">
    
      <img src="https://image.tmdb.org/t/p/w500${movie.poster_path} class="w-full block" alt="${movie.title}">
    </div>
  `).join(''); // Map through movies and create HTML for each movie card
}

// Show detailed information about a movie in a modal
function showMovieDetails(movieId) {
  const xhr = new XMLHttpRequest(); // Create a new XMLHttpRequest object
  const MOVIE_URL = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`; // API URL for movie details

  xhr.open('GET', MOVIE_URL, true); // Initialize the request

  xhr.onload = function () {
    if (xhr.status === 200) { // If the request is successful
      const movie = JSON.parse(xhr.responseText); // Parse the response JSON
      movieTitle.textContent = movie.title; // Set movie title in modal
      moviePoster.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`; // Set movie poster in modal
      moviePoster.alt = movie.title; // Set alt text for poster
      movieOverview.textContent = movie.overview; // Set movie overview in modal
      movieReleaseDate.textContent = `${movie.release_date}`; // Set release date in modal
      movieRating.textContent = `${movie.vote_average}`; // Set movie rating in modal
      modal.style.display="flex"; // Show the modal
    } else {
      console.error('Error fetching movie details:', xhr.statusText); // Log error if request fails
    }
  };

  xhr.onerror = function () {
    console.error('Network error while fetching movie details.'); // Log network errors
  };

  xhr.send(); // Send the request
}

// Set up pagination buttons
// function setupPagination(current, total) {
//   paginationContainer.innerHTML = ''; // Clear existing pagination buttons
//
//   if (current > 1) { // If not on the first page, add a "Previous" button
//     paginationContainer.innerHTML += `<button onclick="changePage(${current - 1})">Previous</button>`;
//   }
//
//   paginationContainer.innerHTML += `<span>Page ${current} of ${total}</span>`; // Display current page and total pages
//
//   if (current < total) { // If not on the last page, add a "Next" button
//     paginationContainer.innerHTML += `<button onclick="changePage(${current + 1})">Next</button>`;
//   }
// }

// Change the current page and fetch movies for the new page
function changePage(page) {
  currentPage = page; // Update the current page
  fetchTrendingMovies(currentPage); // Fetch movies for the new page
}

// Close the movie details modal
var close=document.querySelector("#close");
    close.addEventListener('click',function(){
      modal.style.display="none"; 
       });

// Fetch initial trending movies when the page loads
fetchTrendingMovies(currentPage);

// Check if the user is logged in when the page loads
window.addEventListener('load', () => {
  if (!(localStorage.getItem('isLoggedIn')) && !(localStorage.getItem('isSignedIn'))) {
    window.location.href = 'index.html'; // Redirect to login page if not logged in
  }
});

// Slider functionality for trending movies
let currOffset = 0; // Current offset for sliding

function nextSlide() {
  currNumOfMovies -= 1;
  console.log(`left movies: ${currNumOfMovies}`);
  if (currNumOfMovies <= 7) {
    currentPage += 1
    // Fetch and append new movies
    fetchAndReturnMovies(currentPage, (moviesArr) => {
      console.log(moviesArr);
      currNumOfMovies += moviesArr.length;
      moviesContainer.innerHTML += moviesArr.map(movie => `
    <div class="movie_card min-w-[200px] rounded-[12px] overflow-hidden cursor-pointer transition-all duration-300 ease-in-out hover:scale-[1.03] active:scale-[0.97]" movieId="${movie.id}">
    
      <img src="https://image.tmdb.org/t/p/w500${movie.poster_path} class="w-full block" alt="${movie.title}">
    </div>
  `).join('');
    })

  }
  currOffset -= 220; // Move to the next slide
  moviesContainer.style.transform = `translateX(${currOffset}px)`; // Apply the transformation
}

function prevSlide() {

  if (currOffset !== 0) {
    currNumOfMovies += 1;
    currOffset += 220; // Move to the previous slide
    moviesContainer.style.transform = `translateX(${currOffset}px)`; // Apply the transformation
  }
}

// Slider functionality for filtered movies
let currOffset2 = 0; // Current offset for sliding filtered movies
const filteredMoviesContainer = document.querySelector(".filtered_movies_cards"); // Container for filtered movies

function nextSlide2() {
    currOffset2 -= 220; // Move to the next slide
    filteredMoviesContainer.style.transform = `translateX(${currOffset2}px)`; // Apply the transformation
  
}

function prevSlide2() {
  if (currOffset2 !== 0) {

    currOffset2 += 220; // Move to the previous slide
    filteredMoviesContainer.style.transform = `translateX(${currOffset2}px)`; // Apply the transformation
  }
}

// Logout functionality

document.getElementById('logout').addEventListener('click', () => {
  if((localStorage.getItem('isSignedIn') === 'true'))
  {
    localStorage.removeItem('isSignedIn'); // Clear login status
    localStorage.removeItem("SignedName");
  }
  else if((localStorage.getItem('isLoggedIn') === 'true'))
  {
    localStorage.removeItem('isLoggedIn'); // Clear login status
    localStorage.removeItem("LoggedName");
  }
  window.location.href = 'index.html'; // Redirect to login page
});

var profile=document.getElementById("prof-name");
if((localStorage.getItem('isSignedIn') === 'true'))
{
  profile.innerHTML=localStorage.getItem("SignedName")
}
else if((localStorage.getItem('isLoggedIn') === 'true'))
{
  profile.innerHTML=localStorage.getItem("LoggedName");
}

console.log(topSection)

moviesContainer.addEventListener('click', (event) => {
  movieId = event.target.closest(".movie_card").getAttribute("movieId")
  const xhr = new XMLHttpRequest();
  const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`;
  xhr.open('GET', url, true);
  xhr.onload = function () {
    if (xhr.status === 200) {
      // Parse the response JSON
      const movieData = JSON.parse(xhr.responseText);
      console.dir(movieData)
      // Get the backdrop path
      const backdropPath = movieData.backdrop_path;
      const backdropUrl = `https://image.tmdb.org/t/p/original${backdropPath}`;
      // console.log('Backdrop URL:', backdropUrl);

      // Use the backdrop URL (e.g., set it as a background image)
      topSection.style.backgroundImage = `linear-gradient(to top, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0)), url(${backdropUrl})`
      paragraphText.innerHTML = movieData.overview
      headText.innerHTML = movieData.original_title
      detailsButton.setAttribute("movieId", movieId)
    } else {
      console.error('Error fetching movie details:', xhr.statusText);
    }
  };
  xhr.onerror = function () {
    console.error('Network error while fetching movie details.');
  };
  xhr.send();

})

detailsButton.addEventListener('click', (event) => {
  showMovieDetails(event.target.getAttribute("movieId"));
})


//=====================================================================================
//filter section
//=====================================================================================
const urlForFelters = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=`



async function fetchFilteredMovies(genreId) {
  try {
      const response = await fetch(`${urlForFelters}${genreId}`);
      const data = await response.json();
      displayFilteredMovies(data.results);
  } catch (error) {
      console.error('Error fetching movies:', error);
  }
}

function displayFilteredMovies(movies) {
  const containerMoviesFiltered = document.querySelector(".filtered_movies_cards");
  containerMoviesFiltered.innerHTML = ''; // Clear previous movies

  movies.forEach(movie => {
    containerMoviesFiltered.innerHTML +=`
      <div class="movie_card min-w-[200px] rounded-[12px] overflow-hidden cursor-pointer transition-all duration-300 ease-in-out hover:scale-[1.03] active:scale-[0.97]" movieId="${movie.id}" onclick="showMovieDetails(${movie.id})">
    
      <img src="https://image.tmdb.org/t/p/w500${movie.poster_path} class="w-full block" alt="${movie.title}">
    </div>
    `
  });
}

// Add event listeners to buttons
const filteredMoviesHeader = document.querySelector(".filtered_movies_container h2");
const buttons = document.querySelectorAll('.movie_categories_container .categories button');
buttons.forEach(button => {
  button.addEventListener('click', () => {
    // Remove 'active_button' class from all buttons
    buttons.forEach(btn => btn.classList.remove('active_button'));
    let currentChosenCategory = button.innerHTML
    filteredMoviesHeader.innerHTML = currentChosenCategory
    // Add 'active_button' class to the clicked button
    button.classList.add('active_button');
      const genreId = button.getAttribute('data-genre');
      fetchFilteredMovies(genreId);
  });
});
function showMovieSearched(movieId) {
  const xhr = new XMLHttpRequest();
  const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`;
  xhr.open('GET', url, true);
  xhr.onload = function () {
    if (xhr.status === 200) {
      const movieData = JSON.parse(xhr.responseText);

      // Update background image
      const backdropPath = movieData.backdrop_path;
      const backdropUrl = `https://image.tmdb.org/t/p/original${backdropPath}`;
      topSection.style.backgroundImage = `linear-gradient(to top, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0)), url(${backdropUrl})`;

      // Update movie details
      paragraphText.innerHTML = movieData.overview;
      headText.innerHTML = movieData.original_title;
      detailsButton.setAttribute('movieId', movieId);
      searchInput.value = movieData.title; // Add this line
      // Clear search results and hide the list after selecting a movie
      searchResults.innerHTML = '';  // Clear the search results list
    } else {
      console.error('Error fetching movie details:', xhr.statusText);
    }
  };
  xhr.onerror = function () {
    console.error('Network error while fetching movie details.');
  };
  xhr.send();
}

// Function to fetch movies based on search query
async function searchMovies(query) {
  if (query.trim() === '') {
    searchResults.innerHTML = ''; // Clear results if input is empty
    return;
  }
  try {
    const response = await fetch(`${SEARCH_API}${query}`);
    const data = await response.json();
    // Display movie names styled as per the design
    searchResults.innerHTML = data.results
      .map(
        (movie) => `
          <div
            role="button"
          onclick="showMovieSearched(${movie.id})"
            class="text-slate-800 flex w-full items-center rounded-md p-3 transition-all hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100 cursor-pointer"
          >
            <div class="mr-4 grid place-items-center">
              <img
                alt="${movie.title}"
                src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
                class="relative inline-block h-12 w-12 !rounded-full object-cover object-center"
              />
            </div>
            <div>
              <h6 class="text-slate-800 font-medium">${movie.title}</h6>
              <p class="text-slate-500 text-sm">
                Release Date: ${movie.release_date || 'N/A'}
              </p>
            </div>
          </div>
        `
      )
      .join('');
  } catch (error) {
    console.error('Error fetching movies:', error);
  }
}
// Add event listener to hide the results when clicking outside the search list
document.addEventListener('mousedown', (e) => {
  if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
    searchResults.innerHTML = ''; // Clear results if clicked outside
  }
});


// Add event listener to input field for dynamic search
searchInput.addEventListener('input', (e) => {
  const query = e.target.value;
  searchMovies(query);
});


// Fetch and display movies for the default genre (Action)
fetchFilteredMovies(28);