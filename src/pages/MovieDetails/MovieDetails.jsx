import { useEffect, useState } from 'react';
import { useParams, Outlet, NavLink } from 'react-router-dom';
import styles from './MovieDetails.module.css';

function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!movieId) return;
    const url = `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`;
    const options = {
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlOGNlZGNmYmY0NWIwNGRlYjFhMGM3ZDJiYTQ2NmMwNSIsIm5iZiI6MTc1MDQwMzMzOS4wNjYsInN1YiI6IjY4NTUwOTBiM2NlMmJmZWM2M2RjMzhjZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.XyoaO827aJ4KdCTCPnn90VtJbg9ER33C7nzsCE9DlyA',
      },
    };

    fetch(url, options)
      .then(res => res.json())
      .then(data => {
        setMovie(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [movieId]);

  if (loading) return <div className={styles.loading}>Loading...</div>;
  if (!movie) return <div className={styles.error}>Film bulunamadı.</div>;

  return (
    <div className={styles.detailsContainer}>
      <div className={styles.header}>
        <img
          className={styles.poster}
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : 'https://via.placeholder.com/300x450?text=No+Image'
          }
          alt={movie.title}
        />
        <div className={styles.info}>
          <h1>{movie.title}</h1>
          <p><strong>Release Date:</strong> {movie.release_date}</p>
          <p><strong>Rating:</strong> {movie.vote_average} / 10</p>
          <p><strong>Genres:</strong> {movie.genres?.map(g => g.name).join(', ')}</p>
          <p className={styles.overview}>{movie.overview}</p>
          <div className={styles.links}>
            <NavLink to="cast" className={styles.link}>Cast</NavLink>
            <NavLink to="reviews" className={styles.link}>Reviews</NavLink>
          </div>
        </div>
      </div>
      <div className={styles.outlet}>
        <Outlet />
      </div>
    </div>
  );
}

export default MovieDetailsPage;
