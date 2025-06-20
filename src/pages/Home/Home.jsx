import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './Home.module.css';
import MovieList from '../../components/MovieList/MovieList';

function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const url = 'https://api.themoviedb.org/3/trending/movie/day?language=en-US';
    const options = {
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlOGNlZGNmYmY0NWIwNGRlYjFhMGM3ZDJiYTQ2NmMwNSIsIm5iZiI6MTc1MDQwMzMzOS4wNjYsInN1YiI6IjY4NTUwOTBiM2NlMmJmZWM2M2RjMzhjZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.XyoaO827aJ4KdCTCPnn90VtJbg9ER33C7nzsCE9DlyA',
      },
    };

    axios
      .get(url, options)
      .then((response) => {
        setMovies(response.data.results);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className={styles.container}>
      <h1>Home Page</h1>
      {loading && <p>Loading...</p>}
      {movies.length > 0 && <MovieList movies={movies} />}
    </div>
  );
}


export default Home;
