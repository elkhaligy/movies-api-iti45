// Register
if (document.getElementById('registerForm')) {
    document.getElementById('registerForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = document.getElementById('regUsername').value;
        const password = document.getElementById('regPassword').value;

        const response = await fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({username, password}),
        });

        if (response.ok) {
            alert('Registration successful!');
            window.location.href = 'login.html';
        } else {
            alert('Registration failed!');
        }
    });
}

// Login
if (document.getElementById('loginForm')) {
    document.getElementById('loginForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = document.getElementById('logUsername').value;
        const password = document.getElementById('logPassword').value;
        const response = await fetch(`http://localhost:3000/users/?username=${username}&password=${password}`, {});
        const users = await response.json();
        console.log(users);
        if (users.length > 0) {
            localStorage.setItem('isLoggedIn', 'true');
            alert("Successfully logged in");
            // window.location.href = 'home.html';
        } else {
            alert('Invalid credentials!');
        }
    });
}