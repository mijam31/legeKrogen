import styles from "./modal.module.css";
import { NavLink } from "react-router-dom";

const Modal = ({ children, onClose }) => {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.content}>
        {children}
        <p>Vi er så glade for at du vil være en del af vores kundeklub</p>
        <p>
          Tag et kig på din indbakke. Vi har givet dig fri fragt på din næste
          ordre.
        </p>
        <button onClick={onClose}>
          <NavLink to="/Home">TIL FORSIDEN </NavLink>
        </button>
      </div>
    </div>
  );
};

export default Modal;
