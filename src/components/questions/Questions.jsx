import { useState, useEffect } from "react";
import styles from "./questions.module.css";
import Accordion from "../accordion/Accordion";

const Questions = () => {
  const [questions, setQuestion] = useState([]); // State til at gemme listen af spørgsmål hentet fra API'et.
  const [error, setError] = useState(null); // State til at gemme eventuelle fejl.

  const fetchQuestions = async () => {
    // Funktion til at hente spørgsmål fra API'et.
    try {
      const response = await fetch("https://legekrogen.webmcdm.dk/questions"); // Gør et GET-kald til API-endpointet.
      const data = await response.json(); // Konverterer API-svaret fra JSON.
      setQuestion(data); // Gemmer de hentede spørgsmål i `questions` state.
    } catch (error) {
      setError(error.message); // Gemmer fejlmeddelelsen i `error` state.
      console.log(error); // Logger fejlen i konsollen til debugging.
    }
  };

  useEffect(() => {
    fetchQuestions(); // Kører `fetchQuestions` én gang, når komponenten renderes første gang.
  }, []); // Tom afhængighedsarray sikrer, at `useEffect` kun kører én gang.

  return (
    <section className={styles.faq}>
      {questions.map((question) => (
        <Accordion
          key={question._id}
          question={question.question}
          answer={question.answer}
        />
      ))}
    </section>
  );
};

export default Questions;
