import { IoClose } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import { useState, useEffect } from "react";
import { useLocation } from "react-router";
import styles from "./_navigation.module.css";
import { NavLink } from "react-router-dom";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const pathname = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <nav className={styles.navbar}>
      <div>
        <img src="src/assets/logo/legekrogen_logo.png" alt="" />
      </div>
      <ul>
        <div className={styles.computerNav}>
          <ul>
            {" "}
            <li>
              <NavLink to="/Home">Forside</NavLink>
            </li>
            <li>
              <NavLink to="/products">Produkter</NavLink>
            </li>
            <li>
              <NavLink to="/Faq">FAQ</NavLink>
            </li>
            <li>
              <NavLink to="/Customerclub">Kundeklubben</NavLink>
            </li>
            <li>
              <a href="">Backoffice</a>
            </li>
          </ul>
        </div>
        <li>
          <RxHamburgerMenu onClick={() => setIsOpen(true)} />
        </li>

        <div
          className={`${styles.menu} ${
            isOpen ? styles.menuShown : styles.menuHidden
          }`}
        >
          <IoClose onClick={() => setIsOpen(false)} />
          <ul>
            <li>
              <NavLink to="/Home">Forside</NavLink>
            </li>

            <li>
              <NavLink to="/products">Produkter</NavLink>
            </li>
            <li>
              <NavLink to="/Faq">FAQ</NavLink>
            </li>
            <li>
              <NavLink to="/Customerclub">Kundeklubben</NavLink>
            </li>
            <li>
              <a href="">Backoffice</a>
            </li>
          </ul>
        </div>
      </ul>
    </nav>
  );
};

export default Navigation;
