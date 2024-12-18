import { useState, useEffect, useRef } from "react";
import styles from "./newsletter.module.css";
import Modal from "../modal/Modal";
import Loading from "../loading/Loading";

const Newsletter = () => {
  const [isLoading, setIsLoading] = useState(false); // State til at holde styr på, om der er en igangværende operation

  const [inputValue, setInputValue] = useState(""); // State til at holde værdien af inputfeltet.

  const [inputName, setInputName] = useState(""); // State til at holde et navn inputværdi

  const [isModalOpen, setIsModalOpen] = useState(false); // State til at styre, om modal-vinduet er åbent eller lukket.

  // her laver vi knapperne som åbner og lukker modalen
  const openModal = () => setIsModalOpen(true); // Funktion til at åbne modal-vinduet og lukke den nedenunder.
  const closeModal = () => setIsModalOpen(false);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Forhindrer siden i at reloade ved formularens submit (som er deafault).

    try {
      setIsLoading(true); // Sætter "isLoading" til true for at indikere, at et API-kald er i gang.
      const response = await fetch(
        "https://api-medieskolerne.vercel.app/emails",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: inputValue }), // Sender inputValue som JSON-data
        }
      );
      const result = await response.json();

      openModal(); // Åbner modal-vinduet efter succesfuld tilmelding.
      setInputValue(""); // Rydder inputfeltet.
      setIsLoading(false); // Sætter "isLoading" tilbage til false, når kaldet er færdigt.
    } catch (error) {
      console.error("Fejl ved tilmelding", error.message); // Logger fejl, hvis API-kaldet mislykkes.
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
            onChange={(e) => setInputName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
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
