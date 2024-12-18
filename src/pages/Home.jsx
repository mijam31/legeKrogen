import ProductCard from "../components/productCard/productCard";
import PageHeader from "../components/pageHeader/PageHeader";
import headerImg from "../assets/heros/forsiden.jpg";
import useFetchProducts from "../hooks/useFetchProducts";
import styles from "./home.module.css";
import Reviews from "../components/reviews/Reviews";
import ClubTeaser from "../components/clubTeaser/ClubTeaser";

const Home = () => {
  // her henter vi data fra vores custom hook
  const { recommended } = useFetchProducts();

  return (
    <section>
      <PageHeader
        landingPageTitle="At lege er at leve"
        landingPageText="Her hos os har vi et stort udvalg af legetøj i høj kvalitet"
        headerImg={headerImg}
      />
      <div className={styles.text}>
        <h1>Et udpluk af vores</h1>
        <h2>LEGETØJ</h2>
      </div>

      <div className={styles.home}>
        {recommended.map((product) => (
          <ProductCard product={product} key={product._id} />
        ))}
      </div>
      <Reviews />
      <ClubTeaser />
    </section>
  );
};

export default Home;
