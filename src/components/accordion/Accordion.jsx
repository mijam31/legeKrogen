import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import { useState, useRef, useEffect } from "react";
import styles from "./accordion.module.css";

const Accordion = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      contentRef.current.style.maxHeight = `${contentRef.current.scrollHeight}px`;
      contentRef.current.style.opacity = "1";
    } else {
      contentRef.current.style.maxHeight = "0px";
      contentRef.current.style.opacity = "0";
    }
  }, [isOpen]);

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
