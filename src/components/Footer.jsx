import { FaFacebook, FaInstagram, FaPhoneAlt } from "react-icons/fa";
import { IoMailOutline } from "react-icons/io5";
import styles from "./footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <h2>Kundeservice</h2>
      <ul className={styles.mail}>
        <li>
          <IoMailOutline />
        </li>
        <li>
          <p>kontakt@legekrogen.dk</p>
        </li>
      </ul>
      <ul className={styles.phone}>
        <li>
          <FaPhoneAlt />
        </li>
        <li>
          <p>+45 23 45 67 89</p>
        </li>
      </ul>
      <h3>Følg os</h3>
      <ul className={styles.socials}>
        {" "}
        <li>
          <a href="https://www.facebook.com/?locale=da_DK">
            <FaFacebook />
          </a>
        </li>
        <li>
          <a href="https://www.instagram.com/ ">
            <FaInstagram />
          </a>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
