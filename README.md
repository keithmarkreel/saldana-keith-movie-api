# saldana-keith-movie-api

## Run the API

```bash
npm install
npm start
```

Open `http://localhost:3000` to use the movie collection form.

### Endpoints

- `GET /api/movies` returns all movies.
- `GET /api/movies/:id` returns one movie by ID.
- `POST /api/movies` adds a movie from a JSON body containing `title`, `genre`, and `year`.