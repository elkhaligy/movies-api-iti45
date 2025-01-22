//
/////////////////Login
//

const login = document.getElementById("login-box");
const reg_link = document.getElementById("reg-link");
const log_btn = document.getElementById('nav-login-btn');

const register = document.getElementById('register-box');


const close_log = document.getElementById("close-log");


log_btn.addEventListener("click", () => {
    login.classList.remove('hidden','opacity-0');
    login.classList.add('flex');
});

reg_link.addEventListener("click", () => {
    login.classList.add('hidden');
    login.classList.remove('flex');

    register.classList.add('flex');
    register.classList.remove('hidden','opacity-0');

    var log_form = document.getElementById('log-form');
    log_form.reset();
    document.getElementById('log-err-message').textContent = "";

    var box = document.getElementsByClassName('border-b');
    reset_colors(box);
});


// ////////validations

function ValidateEmail(InputElement, box) {
    InputElement.addEventListener("input", function () {
        const regex = /[a-zA-Z]+@[a-zA-Z0-9]+\.[a-z]{2,3}/;
        box.classList.remove("border-b-[rgb(120,122,120)]");

        if (regex.test(InputElement.value)) {
            box.classList.add("border-b-[rgb(17,176,17)]");
            box.classList.remove("border-b-red-500");
        } else {
            box.classList.add("border-b-red-500");
            box.classList.remove("border-b-[rgb(17,176,17)]");
        }
    });
}

function ValidateInputLength(InputElement, box) {
    InputElement.addEventListener("input", function () {
        var regex = /^.{4,}$/;
        box.classList.remove("border-b-[rgb(120,122,120)]");
        if (regex.test(InputElement.value)) {
            box.classList.add("border-b-[rgb(17,176,17)]");
            box.classList.remove("border-b-red-500");
        } else {
            box.classList.add("border-b-red-500");
            box.classList.remove("border-b-[rgb(17,176,17)]");
        }
    });
}

const log_email = document.getElementById('log-email');
const log_pass = document.getElementById('log-password');

const log_e_box = document.getElementById('log-e-box');
const log_p_box = document.getElementById('log-p-box');

ValidateEmail(log_email, log_e_box);
ValidateInputLength(log_pass, log_p_box);

function reset_colors(box) {
    for (let i = 0; i < box.length; i++) {
        if (box[i].classList.contains("border-b-[rgb(17,176,17)]")) {
            box[i].classList.remove("border-b-[rgb(17,176,17)]");
            box[i].classList.add("border-b-[rgb(120,122,120)]");
        } else if (box[i].classList.contains("border-b-red-500")) {
            box[i].classList.remove("border-b-red-500");
            box[i].classList.add("border-b-[rgb(120,122,120)]");
        }
    }

}

close_log.addEventListener("click", () => {
    login.classList.add('opacity-0');
    login.classList.remove('flex');
    login.addEventListener('transitionend', function() {
        login.classList.add('hidden');
    },{ once: true });

    var box = document.getElementsByClassName('border-b');
    reset_colors(box);
    var log_form = document.getElementById('log-form');
    log_form.reset();
    document.getElementById('reg-err-message').textContent = "";
    document.getElementById('log-err-message').textContent = "";
});


//
/////////////////registration
//


const close_reg = document.getElementById("close-reg");
const log_link = document.getElementById("login-link");


log_link.addEventListener("click", () => {
    register.classList.add('hidden');
    register.classList.remove('flex');
    login.classList.remove('hidden');
    login.classList.add('flex');
    var reg_form = document.getElementById('reg-form');
    reg_form.reset();
    document.getElementById('reg-err-message').textContent = "";
    var box = document.getElementsByClassName('border-b');
    reset_colors(box);
});
close_reg.addEventListener("click", () => {
    register.classList.add('opacity-0');
    register.classList.remove('flex');
    register.addEventListener('transitionend', function() {
        register.classList.add('hidden');
    },{ once: true });
    var reg_form = document.getElementById('reg-form');
    reg_form.reset();
    document.getElementById('reg-err-message').textContent = "";
    document.getElementById('log-err-message').textContent = "";

    var box = document.getElementsByClassName('border-b');
    reset_colors(box);
});

////////validations

const reg_email = document.getElementById('reg-email');
const reg_pass = document.getElementById('reg-password');

const reg_e_box = document.getElementById('reg-e-box');
const reg_p_box = document.getElementById('reg-p-box');
ValidateEmail(reg_email, reg_e_box);
ValidateInputLength(reg_pass, reg_p_box);


//
// json server
//

////////////////////////////////////////////////////

//
// login form
//

document.getElementById('log-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('log-email').value;
    const password = document.getElementById('log-password').value;

    try {
        const response = await fetch('http://localhost:3000/users');
        const users = await response.json();

        const user = users.find((user) => user.email === email && user.password === password);

        const message = document.getElementById('log-err-message');

        if (user) {
            // Store login status in localStorage
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('LoggedName', user.username);
            // Redirect to dashboard
            // loader.classList.remove('invisible');
            // loader.classList.add('visible');
            // setTimeout(() => {
                window.location.href = 'dashboard.html';
            // },3000); // Redirect after 1 second
        } else {
            message.textContent = 'Invalid username or password.';
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('log-err-message').textContent = 'An error occurred. Please try again.';

    }
});


// Prevent access to login page if already logged in
window.addEventListener('load', () => {
    if (localStorage.getItem('isLoggedIn') === 'true' || localStorage.getItem('isSignedIn') === 'true') {
        window.location.href = 'dashboard.html';
    }
});


//
// Register form
//

async function addNewUser(username, email, password) {

    try {
        const res = await fetch('http://localhost:3000/users');
        const users = await res.json();
        const user = users.find((user) => user.email === email);

        if (user) {
            document.getElementById('reg-err-message').textContent = 'Email is already exists';

        } else {
            const newUser = {
                username: username,
                email: email,
                password: password,
            };
            const response = await fetch('http://localhost:3000/users',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newUser),
                });

            if (response.ok) {
                console.log('User added successfully!');
                // Store signin status in localStorage
                localStorage.setItem('isSignedIn', 'true');
                localStorage.setItem('SignedName', username);

                // Redirect to dashboard
                window.location.href = 'dashboard.html';
            } else {
                console.error('Failed to add user:', response.statusText);
            }
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

document.getElementById('reg-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('reg-username').value;
    const email = document.getElementById('reg-email').value;
    const password = document.getElementById('reg-password').value;

    if (reg_e_box.classList.contains("border-b-[rgb(17,176,17)]")) {
        addNewUser(username, email, password);
    } else {
        document.getElementById('reg-err-message').textContent = 'Invalid Email format';
    }
});
  
