# Movie App 🎬

A web application that allows users to explore trending movies and TV shows, register, log in, and view details about their favorite content. Built using **HTML**, **Tailwind CSS**, **Vanilla JavaScript**, and the **TMDB API**, with a mock backend powered by **JSON Server**.

---

## **Project Structure**

```
movie-app/
├── client/                     # Frontend code
│   ├── public/                 # HTML files
│   │   ├── index.html          # Main page
│   │   ├── login.html          # Login page
│   │   ├── register.html       # Registration page
│   │   ├── home.html           # Home page (trending movies/TV shows)
│   │   └── details.html        # Details page for a movie/TV show
│   └── src/
│       ├── styles/             # CSS files
│       │   ├── input.css       # Tailwind source CSS file
│       │   └── output.css      # Compiled Tailwind CSS file
│       └── js/                 # JavaScript files
│           ├── auth.js         # Authentication logic
│           ├── movies.js       # Movie/TV show logic
│           └── details.js      # Details page logic
├── server/                     # Backend mock data
│   └── db.json                 # JSON Server database
├── package.json                # npm project configuration
├── package-lock.json           # npm lock file
├── tailwind.config.js          # Tailwind configuration file
└── README.md                   # Project documentation
```

---

## **Features**

- **User Authentication**:
    - Register a new account.
    - Log in with an existing account.
- **Trending Movies/TV Shows**:
    - Browse trending movies, TV shows, and people.
    - Pagination support for browsing through results.
- **Details Page**:
    - View detailed information about a specific movie or TV show.
- **Responsive Design**:
    - Built with **Tailwind CSS** for a clean and responsive UI.

---

## **Technologies Used**

- **Frontend**:
    - HTML
    - Tailwind CSS
    - Vanilla JavaScript
- **Backend**:
    - JSON Server (mock backend)
- **APIs**:
    - [The Movie Database (TMDB) API](https://developer.themoviedb.org/reference/intro/getting-started)

---

## **Setup Instructions**

### **1. Clone the Repository**
```bash
git clone https://github.com/elkhaligy/movies-api-iti45
cd movies-api-iti45
```

### **2. Install Dependencies**
Make sure you have **Node.js** and **npm** installed. Then run:
```bash
npm install
```

### **3. Start JSON Server**
Run the JSON Server to mock the backend:
```bash
npx json-server --watch server/db.json --port 3000
```
The server will be available at `http://localhost:3000`.

### **4. Build Tailwind CSS**
Run the Tailwind CSS build process to generate the `output.css` file:
```bash
npx tailwindcss -i ./client/src/styles/input.css -o ./client/src/styles/output.css --watch
```

### **5. Open the Project**
- Open the `client/public/index.html` file in your browser to view the application.
- Use a live server (e.g., VS Code Live Server) for a better development experience.

---

## **Commands Summary**

| Command                                                                 | Description                                      |
|-------------------------------------------------------------------------|--------------------------------------------------|
| `npx json-server --watch server/db.json --port 3000`                   | Start JSON Server for mock backend.             |
| `npx tailwindcss -i ./client/src/styles/input.css -o ./client/src/styles/output.css --watch` | Build Tailwind CSS and watch for changes. |

---

## **How to Use**

1. **Register**:
    - Navigate to the registration page (`register.html`).
    - Enter a username and password to create an account.

2. **Login**:
    - Navigate to the login page (`login.html`).
    - Enter your credentials to log in.

3. **Browse Trending Content**:
    - On the home page (`home.html`), browse trending movies, TV shows, or people.
    - Use the dropdown to switch between categories.

4. **View Details**:
    - Click on a movie or TV show to view its details on the `details.html` page.

---



## **License**

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## **Acknowledgments**

- [The Movie Database (TMDB)](https://www.themoviedb.org/) for providing the API.
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework.
- [JSON Server](https://github.com/typicode/json-server) for the mock backend.

---
