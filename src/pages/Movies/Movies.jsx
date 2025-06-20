import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import MovieList from '../../components/MovieList/MovieList';
import styles from './Movies.module.css';

function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  useEffect(() => {
    if (!query) {
      setMovies([]);
      return;
    }
    setLoading(true);
    const url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&language=en-US&page=1&include_adult=false`;
    const options = {
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlOGNlZGNmYmY0NWIwNGRlYjFhMGM3ZDJiYTQ2NmMwNSIsIm5iZiI6MTc1MDQwMzMzOS4wNjYsInN1YiI6IjY4NTUwOTBiM2NlMmJmZWM2M2RjMzhjZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.XyoaO827aJ4KdCTCPnn90VtJbg9ER33C7nzsCE9DlyA',
      },
    };
    axios
      .get(url, options)
      .then(res => {
        setMovies(res.data.results || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [query]);

  const handleSubmit = e => {
    e.preventDefault();
    const value = e.target.elements.search.value.trim();
    setSearchParams(value ? { query: value } : {});
  };

  return (
    <div className={styles.container}>
      <h1>Film Ara</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          name="search"
          placeholder="Film adı girin..."
          defaultValue={query}
          className={styles.input}
        />
        <button type="submit" className={styles.button}>Ara</button>
      </form>
      {loading && <p>Yükleniyor...</p>}
      {movies.length > 0 && <MovieList movies={movies} />}
      {!loading && query && movies.length === 0 && (
        <p>Sonuç bulunamadı.</p>
      )}
    </div>
  );
}

export default MoviesPage;
