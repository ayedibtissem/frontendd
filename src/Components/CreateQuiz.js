import React, { useState } from "react";

function CreateQuizForm({ onCreateQuiz }) {
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([{ text: "", choices: [], correctAnswer: "" }]);

  const handleAddQuestion = () => {
    setQuestions([...questions, { text: "", choices: [], correctAnswer: "" }]);
  };

  const handleQuestionTextChange = (index, event) => {
    const newQuestions = [...questions];
    newQuestions[index].text = event.target.value;
    setQuestions(newQuestions);
  };

  const handleChoiceTextChange = (questionIndex, choiceIndex, event) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].choices[choiceIndex] = event.target.value;
    setQuestions(newQuestions);
  };

  const handleCorrectAnswerChange = (index, event) => {
    const newQuestions = [...questions];
    newQuestions[index].correctAnswer = event.target.value;
    setQuestions(newQuestions);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onCreateQuiz({ title, questions });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      </label>
      {questions.map((question, index) => (
        <div key={index}>
          <label>
            Question {index + 1}:
            <input type="text" value={question.text} onChange={(e) => handleQuestionTextChange(index, e)} />
          </label>
          <br />
          {question.choices.map((choice, choiceIndex) => (
            <div key={choiceIndex}>
              <label>
            Choice {choiceIndex + 1}:
            <input type="text" value={choice} onChange={(e) => handleChoiceTextChange(index, choiceIndex, e)} />
          </label>
          <br />
        </div>
      ))}
      <label>
        Correct answer:
        <input type="text" value={question.correctAnswer} onChange={(e) => handleCorrectAnswerChange(index, e)} />
      </label>
      <br />
    </div>
  ))}
  <button type="button" onClick={handleAddQuestion}>
    Add question
  </button>
  <br />
  <button type="submit">Create Quiz</button>
</form>
);
}

export default CreateQuizForm;