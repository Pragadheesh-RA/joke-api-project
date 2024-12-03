const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const port = 3000;

// Serve static files like CSS
app.use(express.static(path.join(__dirname, 'public')));

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Home route (GET request)
app.get('/', async (req, res) => {
    try {
        // Make an Axios request to JokeAPI
        const response = await axios.get('https://v2.jokeapi.dev/joke/Any?type=single');

        // Render the joke on the home page
        res.render('index', {
            joke: response.data.joke || 'No joke available.'
        });
    } catch (error) {
        console.error('Error fetching joke:', error);
        res.render('index', { joke: 'Failed to fetch a joke. Please try again.' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
