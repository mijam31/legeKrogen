import PageheaderOther from "../../components/pageHeader/PageHeaderOther";
import headerImg from "../../assets/heros/produkter.jpg";
import useFetchProducts from "../../hooks/useFetchProducts";
import ProductCard from "../../components/productCard/productCard";
import styles from "./products.module.css";
import ClubTeaser from "../../components/clubTeaser/ClubTeaser";
import Loading from "../../components/loading/Loading";

const Products = () => {
  // her henter vi data fra vores custom hook
  const { products, isLoading, discounted } = useFetchProducts();

  return (
    <section>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <PageheaderOther
            headerImg={headerImg}
            title="På udkig efter nyt "
            subTitle="LEGETØJ?"
          />
          <div className={styles.text}>
            <h1>Alt vores</h1>
            <h2>LEGETØJ</h2>
          </div>
          <div className={styles.products}>
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
          <ClubTeaser />
        </>
      )}
    </section>
  );
};

export default Products;
