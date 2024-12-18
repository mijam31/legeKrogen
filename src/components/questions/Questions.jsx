import { useState, useEffect } from "react";
import styles from "./questions.module.css";
import Accordion from "../accordion/Accordion";

const Questions = () => {
  const [questions, setQuestion] = useState([]);
  const [error, setError] = useState(null);

  const fetchQuestions = async () => {
    try {
      const response = await fetch("https://legekrogen.webmcdm.dk/questions");
      const data = await response.json();
      setQuestion(data);
    } catch (error) {
      setError(error.message);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

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
