import express from 'express';
import axios from 'axios';
import path from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';


const apiurl = 'https://api.themoviedb.org/3/';
const apiKey = 'da931faae7c1fc6a740fba11c09abbc5';
const yourBearerToken = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYTkzMWZhYWU3YzFmYzZhNzQwZmJhMTFjMDlhYmJjNSIsIm5iZiI6MTcyNjA3ODM0OC4yMzk5NjgsInN1YiI6IjY2ZTE2Y2Y2YTRhNjQ0NjIzNjA1MTgxMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2SdeYkFhzfsyJMA-FjVPNEuD-MYoLPsyxMP8VE-jErg';

const app = express();
const port = 3002;

// bodyparser to get data from the ejs file 
app.use(bodyParser.urlencoded({ extended: false }));


// Set up EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(path.dirname(fileURLToPath(import.meta.url)), 'views'));

// Serve static files from the 'public' directory
app.use(express.static(path.join(path.dirname(fileURLToPath(import.meta.url)), 'public')));


app.get('/', async (req, res) => {
    try {
        const response = await axios.get(`${apiurl}discover/movie`, {
            params: {
                api_key: apiKey,
                language: 'en-US',
                with_original_language: 'te', // Telugu language filter
                sort_by: 'popularity.desc',   // Sort by popularity
                page: 1,
            },
            headers: {
                Authorization: `Bearer ${yourBearerToken}`
            }
        });

        const result = response.data.results;
        const imageUrl = 'https://image.tmdb.org/t/p/w500'; // Correct base URL for images
        // console.log(result);
        res.render('index', { result, imageUrl });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('An error occurred while fetching data.');
    }
});

// searching api
app.get('/submit', async (req, res) => {
    const query = req.query.movie;
    console.log(query);
    if (!query) {
        return res.redirect('/');
    }
    
    try {
        const response = await axios.get(`${apiurl}search/movie`, {
            params: {
                api_key: apiKey,
                language: 'en-US',
                query: query,
                page: 1,
            }
        });

        const result = response.data.results;
        console.log(result);
        const imageUrl = 'https://image.tmdb.org/t/p/w500';
        res.render('index', { result, imageUrl });
    } catch (error) {
        console.error('Error searching data:', error);
        res.status(500).send('An error occurred while searching for movies.');
    }
});


app.listen(port, () => {
    console.log(`Successfully running on port ${port}`);
});
