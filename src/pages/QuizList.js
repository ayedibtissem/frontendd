import React, { useState, useEffect } from "react";
import axios from "axios";
import Quiz from "./Quiz";

function QuizList() {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    async function fetchQuizzes() {
      const { data } = await axios.get("https://cybersec.onrender.com/quizzes");
      setQuizzes(data);
    }

    fetchQuizzes();
  }, []);

  return (
        <div >
     {quizzes.map((quiz) => (
        <Quiz key={quiz._id} quiz={quiz} />
      ))}
      </div>
  );
}

export default QuizList;

