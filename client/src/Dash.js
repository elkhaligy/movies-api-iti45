// Global Constants
const API_KEY = '55cbc13ab085a4e63cc2241e374000db'; // API key for TMDB
const BASE_URL = `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}`; // Base URL for trending movies
const moviesContainer = document.querySelector('.trending_movies_cards'); // Container for trending movies
const paginationContainer = document.querySelector('.pagination'); // Container for pagination buttons
const modal = document.getElementById('movieModal'); // Modal for displaying movie details
const movieTitle = document.getElementById('movieTitle'); // Element for movie title in modal
const moviePoster = document.getElementById('moviePoster'); // Element for movie poster in modal
const movieOverview = document.getElementById('movieOverview'); // Element for movie overview in modal
const movieReleaseDate = document.getElementById('movieReleaseDate'); // Element for movie release date in modal
const movieRating = document.getElementById('movieRating'); // Element for movie rating in modal
let currNumOfMovies = 0;
// Global Variables
let currentPage = 1; // Current page for pagination

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
  currNumOfMovies = movies.length;
  moviesContainer.innerHTML = movies.map(movie => `
    <div class="movie_card" onclick="showMovieDetails(${movie.id})">
      <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
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
      movieReleaseDate.textContent = `Release Date: ${movie.release_date}`; // Set release date in modal
      movieRating.textContent = `Rating: ${movie.vote_average}`; // Set movie rating in modal
      modal.classList.add('show'); // Show the modal
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
function closeModal() {
  modal.classList.remove('show'); // Hide the modal
}

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
    <div class="movie_card" onclick="showMovieDetails(${movie.id})">
      <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
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
  currOffset2 += 220; // Move to the previous slide
  filteredMoviesContainer.style.transform = `translateX(${currOffset2}px)`; // Apply the transformation
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