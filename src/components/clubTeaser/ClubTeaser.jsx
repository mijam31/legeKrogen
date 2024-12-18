import styles from "./clubTeaser.module.css";
import { Link } from "react-router-dom";

const ClubTeaser = () => {
  return (
    <section className={styles.teaser}>
      <p>Kunne du også tænke dig at blive medlem af vores</p>
      <h2>Kundeklub?</h2>
      <Link to={`/Customerclub`}>BLIV MEDLEM NU!</Link>
    </section>
  );
};

export default ClubTeaser;
