import React, { useState } from 'react';
import PhishingQuiz from './Phishing';

function Robot() {
  const [answers, setAnswers] = useState([]);

  function generateRandomAnswer(options) {
    const randomIndex = Math.floor(Math.random() * options.length);
    return options[randomIndex];
  }

  function handleGenerateRobotAnswer() {
    const newAnswers = [];
    PhishingQuiz.defaultProps.quizzes.forEach((quiz) => {
      quiz.questions.forEach((question) => {
        const robotAnswer = generateRandomAnswer(question.options);
        newAnswers.push(robotAnswer);
      });
    });
    setAnswers(newAnswers);
  }

  return (
    <div>
      <h1>Robot</h1>
      <button onClick={handleGenerateRobotAnswer}>Generate Robot Answer</button>
      {answers.length > 0 && (
        <div>
          <h2>Robot's Answers</h2>
          {answers.map((answer, index) => (
            <div key={index}>{answer}</div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Robot;
