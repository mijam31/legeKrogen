import { useState, useEffect } from "react";
import styles from "./reviews.module.css";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);

  const fetchReviews = async () => {
    const response = await fetch("https://legekrogen.webmcdm.dk/reviews");
    const data = await response.json();
    setReviews(data);
  };

  useEffect(() => {
    fetchReviews();
  }, []);

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
