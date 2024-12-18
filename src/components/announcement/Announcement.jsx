import styles from "./announcement.module.css";
import { MdLocalShipping } from "react-icons/md";

const Announcement = () => {
  return (
    <section className={styles.announcements}>
      <MdLocalShipping />
      <p>Fri fragt ved køb over 499,-</p>
    </section>
  );
};

export default Announcement;
