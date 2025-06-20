import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './MovieReviews.module.css';

function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!movieId) return;
    const url = `https://api.themoviedb.org/3/movie/${movieId}/reviews?language=en-US`;
    const options = {
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlOGNlZGNmYmY0NWIwNGRlYjFhMGM3ZDJiYTQ2NmMwNSIsIm5iZiI6MTc1MDQwMzMzOS4wNjYsInN1YiI6IjY4NTUwOTBiM2NlMmJmZWM2M2RjMzhjZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.XyoaO827aJ4KdCTCPnn90VtJbg9ER33C7nzsCE9DlyA',
      },
    };

    fetch(url, options)
      .then(res => res.json())
      .then(data => {
        setReviews(data.results || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [movieId]);

  if (loading) return <div className={styles.loading}>Loading...</div>;
  if (!reviews.length) return <div className={styles.error}>İnceleme bulunamadı.</div>;

  return (
    <ul className={styles.reviewList}>
      {reviews.map(review => (
        <li key={review.id} className={styles.reviewItem}>
          <strong>{review.author}</strong>
          <p>{review.content}</p>
        </li>
      ))}
    </ul>
  );
}

export default MovieReviews;
