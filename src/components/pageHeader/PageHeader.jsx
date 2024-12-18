import styles from "./PageHeader.module.css";

const Pageheader = ({ landingPageTitle, headerImg, landingPageText }) => {
  return (
    <header
      className={styles.header}
      style={{ backgroundImage: `url(${headerImg})` }}
    >
      <div className={styles.contentLandingpage}>
        {/* Jeg har styling til 2 forskellige forsider siden det er forskelligt fra forside og alle andre siders header*/}
        <h1>{landingPageTitle}</h1>
        <p>{landingPageText}</p>
      </div>
    </header>
  );
};

export default Pageheader;
