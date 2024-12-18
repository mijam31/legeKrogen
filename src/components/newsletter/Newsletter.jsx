import { useState, useEffect, useRef } from "react";
import styles from "./newsletter.module.css";
import Modal from "../modal/Modal";
import Loading from "../loading/Loading";

const Newsletter = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [inputValue, setInputValue] = useState("");
  const [inputName, setInputName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef;
  }, []);

  // her laver vi knapperne som åbner og lukker modalen
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const response = await fetch(
        "https://api-medieskolerne.vercel.app/emails",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: inputValue }),
        }
      );
      const result = await response.json();
      openModal();
      setInputValue("");
      setIsLoading(false);
    } catch (error) {
      console.error("Fejl ved tilmelding", error.message);
    }
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="text"
            placeholder="Fulde navn"
            value={inputName}
            onChange={handleInputChange}
          />
          <input
            type="email"
            placeholder="Email"
            value={inputValue}
            onChange={handleInputChange}
          />

          <textarea type="text" placeholder="Hvem køber du legetøj til?" />
          <button type="submit">BLIV MEDLEM NU!</button>
        </form>
      )}
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <h1>Tak {inputName}! </h1>
        </Modal>
      )}
    </>
  );
};

export default Newsletter;
