import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import { useState, useRef, useEffect } from "react";
import styles from "./accordion.module.css";

const Accordion = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef(null);

  // Kører en effekt hver gang `isOpen` ændrer sig.
  useEffect(() => {
    if (isOpen) {
      // Hvis "isOpen" er sand (true):
      contentRef.current.style.maxHeight = `${contentRef.current.scrollHeight}px`;
      // Sætter elementets maksimale højde til dets naturlige højde (udvider elementet).
      contentRef.current.style.opacity = "1";
      // Gør elementet synligt ved at sætte dets opacitet til 1.
    } else {
      // Hvis `isOpen` er falsk (false):
      contentRef.current.style.maxHeight = "0px";
      // Sætter elementets maksimale højde til 0 (kollapser elementet).
      contentRef.current.style.opacity = "0";
      // Gør elementet usynligt ved at sætte opaciteten til 0.
    }
  }, [isOpen]); // Afhængigheds-array: Effekten kører kun, når `isOpen` ændrer sig.

  return (
    <div className={styles.question}>
      <div className={styles.accordion}>
        <div className={styles.titleText}>
          <h2>{question}</h2>
          <div onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <FaAngleUp /> : <FaAngleDown />}
          </div>
        </div>
        <div className={isOpen ? styles.lineopen : styles.lineclosed}></div>
        <div
          ref={contentRef}
          className={`${styles.answer} ${isOpen ? styles.open : styles.closed}`}
          dangerouslySetInnerHTML={{ __html: answer }}
        ></div>
      </div>
    </div>
  );
};

export default Accordion;
