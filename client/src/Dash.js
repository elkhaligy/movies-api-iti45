const API_KEY = '55cbc13ab085a4e63cc2241e374000db';
const BASE_URL = `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}`;


const moviesContainer = document.querySelector('.movies');
const paginationContainer = document.querySelector('.pagination');
const modal = document.getElementById('movieModal');
const movieTitle = document.getElementById('movieTitle');
const moviePoster = document.getElementById('moviePoster');
const movieOverview = document.getElementById('movieOverview');
const movieReleaseDate = document.getElementById('movieReleaseDate');
const movieRating = document.getElementById('movieRating');

let currentPage = 1;

// Fetch trending movies
function fetchTrendingMovies(page = 1) {
  const xhr = new XMLHttpRequest();
  const API_URL = `${BASE_URL}&page=${page}`;

  xhr.open('GET', API_URL, true);

  xhr.onload = function () {
    if (xhr.status === 200) {
      const data = JSON.parse(xhr.responseText);
      displayMovies(data.results);
      setupPagination(page, data.total_pages);
    } else {
      console.error('Error fetching trending movies:', xhr.statusText);
    }
  };

  xhr.onerror = function () {
    console.error('Network error while fetching trending movies.');
  };

  xhr.send();
}

// Display movies
function displayMovies(movies) {
  moviesContainer.innerHTML = movies.map(movie => `
    <div class="movie" onclick="showMovieDetails(${movie.id})">
      <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
      <h3>${movie.title}</h3>
    </div>
  `).join('');
}

// Show movie details
function showMovieDetails(movieId) {
  const xhr = new XMLHttpRequest();
  const MOVIE_URL = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`;

  xhr.open('GET', MOVIE_URL, true);

  xhr.onload = function () {
    if (xhr.status === 200) {
      const movie = JSON.parse(xhr.responseText);
      movieTitle.textContent = movie.title;
      moviePoster.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
      moviePoster.alt = movie.title;
      movieOverview.textContent = movie.overview;
      movieReleaseDate.textContent = `Release Date: ${movie.release_date}`;
      movieRating.textContent = `Rating: ${movie.vote_average}`;
      modal.classList.add('show');
    } else {
      console.error('Error fetching movie details:', xhr.statusText);
    }
  };

  xhr.onerror = function () {
    console.error('Network error while fetching movie details.');
  };

  xhr.send();
}

// Setup pagination
function setupPagination(current, total) {
  paginationContainer.innerHTML = '';

  if (current > 1) {
    paginationContainer.innerHTML += `<button onclick="changePage(${current - 1})">Previous</button>`;
  }

  paginationContainer.innerHTML += `<span>Page ${current} of ${total}</span>`;

  if (current < total) {
    paginationContainer.innerHTML += `<button onclick="changePage(${current + 1})">Next</button>`;
  }
}

// Change page
function changePage(page) {
  currentPage = page;
  fetchTrendingMovies(currentPage);
}

// Close modal
function closeModal() {
  modal.classList.remove('show');
}

// Fetch initial trending movies
fetchTrendingMovies(currentPage);


// Check if the user is logged in
window.addEventListener('load', () => {

    if(!(localStorage.getItem('isLoggedIn')) && !(localStorage.getItem('isSignedIn')))
  {
    window.location.href = 'index.html'; // Redirect to login page
  }
  });

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
