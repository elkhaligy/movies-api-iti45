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

      }  
    else if((localStorage.getItem('isLoggedIn') === 'true'))
      {
        localStorage.removeItem('isLoggedIn'); // Clear login status
      }
    window.location.href = 'index.html'; // Redirect to login page
  });