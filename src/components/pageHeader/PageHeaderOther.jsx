import styles from "./pageHeaderOther.module.css";

const PageheaderOther = ({ headerImg, title, subTitle, text }) => {
  return (
    <header
      className={styles.header}
      style={{ backgroundImage: `url(${headerImg})` }}
    >
      {/* det her er de andres headers */}
      <div className={styles.content}>
        <h2>{title}</h2>
        <h1>{subTitle}</h1>
        <p>{text}</p>
      </div>
    </header>
  );
};

export default PageheaderOther;
