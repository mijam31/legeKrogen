import { useState, useEffect } from "react";
import styles from "./reviews.module.css";

const Reviews = () => {
  const [reviews, setReviews] = useState([]); // State til at gemme listen af anmeldelser hentet fra API'et.

  const fetchReviews = async () => {
    // Funktion til at hente anmeldelser fra API'et.
    const response = await fetch("https://legekrogen.webmcdm.dk/reviews"); // Gør et GET-kald til API-endpointet.
    const data = await response.json(); // Konverterer API-svaret fra JSON.
    setReviews(data); // Gemmer de hentede anmeldelser i `reviews` state.
  };

  useEffect(() => {
    fetchReviews(); // Kører `fetchReviews` én gang, når komponenten renderes første gang.
  }, []); // Tom afhængighedsarray sikrer, at `useEffect` kun kører én gang.

  return (
    <section className={styles.reviews}>
      <h1>Vores kunder</h1>
      <h2>UDTALER</h2>
      <div className={styles.reviewContent}>
        {reviews.map((review, index) => (
          <div
            key={review._id}
            className={`${styles.review} ${styles[`review${index + 1}`]}`}
          >
            <p>"{review.description}"</p>
            <h3>{review.name}</h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Reviews;
