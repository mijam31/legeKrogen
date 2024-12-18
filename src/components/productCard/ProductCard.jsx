import styles from "./productCard.module.css";

const ProductCard = ({ product }) => {
  return (
    <figure className={styles.productCard}>
      <div className={styles.imageContainer}>
        <img src={product.image} />
        {product.discountInPercent > 0 && (
          <h2 className={styles.discountBadge}>
            {`${product.discountInPercent}%`}
          </h2>
        )}
      </div>

      <figcaption className={styles.content}>
        <h2>{product.title}</h2>
        <h3>{product.description}</h3>
        <p>{product.price} kr</p>
        <div></div>
      </figcaption>
    </figure>
  );
};

export default ProductCard;
