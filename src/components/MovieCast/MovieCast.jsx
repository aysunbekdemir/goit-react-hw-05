import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './MovieCast.module.css';

function MovieCast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!movieId) return;
    const url = `https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`;
    const options = {
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlOGNlZGNmYmY0NWIwNGRlYjFhMGM3ZDJiYTQ2NmMwNSIsIm5iZiI6MTc1MDQwMzMzOS4wNjYsInN1YiI6IjY4NTUwOTBiM2NlMmJmZWM2M2RjMzhjZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.XyoaO827aJ4KdCTCPnn90VtJbg9ER33C7nzsCE9DlyA',
      },
    };

    fetch(url, options)
      .then(res => res.json())
      .then(data => {
        setCast(data.cast || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [movieId]);

  if (loading) return <div className={styles.loading}>Loading...</div>;
  if (!cast.length) return <div className={styles.error}>Oyuncu bilgisi bulunamadı.</div>;

  return (
    <ul className={styles.castList}>
      {cast.map(actor => (
        <li key={actor.cast_id} className={styles.castItem}>
          <img
            src={
              actor.profile_path
                ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                : 'https://via.placeholder.com/80x120?text=No+Image'
            }
            alt={actor.name}
            className={styles.castImg}
          />
          <div>
            <strong>{actor.name}</strong>
            <div className={styles.character}>as {actor.character}</div>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default MovieCast;
