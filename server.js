const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

let movies = [
  { id: 1, title: 'Interstellar', genre: 'Science Fiction', year: 2014 },
  { id: 2, title: 'Avengers: Endgame', genre: 'Action', year: 2019 },
  { id: 3, title: 'Coco', genre: 'Animation', year: 2017 }
];

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/movies', (req, res) => {
  res.json(movies);
});

app.get('/api/movies/:id', (req, res) => {
  const movie = movies.find((item) => item.id === Number(req.params.id));

  if (!movie) {
    return res.status(404).json({ error: 'Movie not found' });
  }

  res.json(movie);
});

app.post('/api/movies', (req, res) => {
  const { title, genre, year } = req.body;

  if (!title || !genre || year === undefined || year === '') {
    return res.status(400).json({ error: 'Title, genre, and year are required' });
  }

  const movie = {
    id: movies.length ? Math.max(...movies.map((item) => item.id)) + 1 : 1,
    title: String(title).trim(),
    genre: String(genre).trim(),
    year: Number(year)
  };

  if (!movie.title || !movie.genre || !Number.isInteger(movie.year)) {
    return res.status(400).json({ error: 'Title, genre, and a valid year are required' });
  }

  movies.push(movie);
  res.status(201).json(movie);
});

app.listen(port, () => {
  console.log(`Movie API running at http://localhost:${port}`);
});