import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import { Table } from 'react-bootstrap';

function Quiz({ quiz, onQuizSubmit, onQuizResult }) {
  const [userAnswers, setUserAnswers] = useState([]);
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [score, setScore] = useState(null);

  const handleClick = (questionIndex, choiceIndex) => {
    const newAnswers = [...userAnswers];
    newAnswers[questionIndex] = choiceIndex;
    setUserAnswers(newAnswers);
  };

  const handleSubmit = () => {
    if (userAnswers.some(answer => answer === undefined)) {
      
      alert('Please answer all the questions.');
      return;
    }

    const quizCorrect = quiz.questions.map((question, index) => {
      const correctIndex = question.choices.findIndex(choice => choice === question.correctAnswer);
      const isCorrect = userAnswers[index] === correctIndex;
      return isCorrect;
    });

    setCorrectAnswers(prevState => [...prevState, quizCorrect]);

    const numCorrect = quizCorrect.filter(Boolean).length;
    const totalQuestions = quiz.questions.length;
    const quizScore = (numCorrect / totalQuestions) * 100;

    setScore(quizScore);
    onQuizSubmit(quizScore);
    onQuizResult(numCorrect, totalQuestions - numCorrect);
  };

  const numCorrect = correctAnswers.length > 0 ? correctAnswers[correctAnswers.length - 1].filter(Boolean).length : null;
  const totalQuestions = quiz.questions.length;

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '30px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px', color: 'blue' }}>{quiz.title}</h1>
      <ul style={{ listStyle: 'none', paddingLeft: '0' }}>
        {quiz.questions.map((question, questionIndex) => (
          <li key={question._id} style={{ marginBottom: '20px' }}>
            <h3 style={{ fontSize: '24px', marginBottom: '10px', color: 'green' }}>{question.text}</h3>
            <div id="choices" style={{ display: 'flex', flexDirection: 'column' }}>
              {question.choices.map((choice, choiceIndex) => (
                <div key={choiceIndex} style={{ marginBottom: '30px', backgroundColor: '#00BFFF', borderRadius: '10px', padding: '10px' }}>
                  <input
                    type="radio"
                    id={`choice${choiceIndex}`}
                    name={`question${questionIndex}`}
                    value={choice}
                    checked={userAnswers[questionIndex] === choiceIndex}
                    onChange={() => handleClick(questionIndex, choiceIndex)}
                  />
                  <label htmlFor={`choice${choiceIndex}`} style={{ marginLeft: '10px', color: 'black' }}>{choice}</label>
                </div>
              ))}
            </div>
          </li>
        ))}
      </ul>
      <Button onClick={handleSubmit} variant="primary">Submit</Button>
      {correctAnswers.length > 0 && (
        <div style={{ marginTop: '20px' }}>
          <h3>Quiz Results</h3>
          <Table striped bordered hover style={{ marginTop: '10px' }}>
            <thead>
              <tr>
                <th style={{ backgroundColor: 'lightblue', color: 'white' }}>Question</th>
                <th style={{ backgroundColor: 'lightblue', color: 'white' }}>Question's Correct Answer</th>
                <th style={{ backgroundColor: 'lightblue', color: 'white' }}>Your Answer</th>
                <th style={{ backgroundColor: 'lightblue', color: 'white' }}>Result</th>
              </tr>
            </thead>
            <tbody>
              {quiz.questions.map((question, index) => {
                const isCorrect = correctAnswers.length > 0 ? correctAnswers[correctAnswers.length - 1][index] : null;
                const cellStyle = isCorrect ? { backgroundColor: 'lightgreen', color: 'black' } : { backgroundColor: 'pink', color: 'black' };

                return (
                  <tr key={question._id}>
                    <td style={{ ...cellStyle, color: 'white' }}>{question.text}</td>
                    <td style={{ ...cellStyle, color: 'white' }}>{question.correctAnswer}</td>
                    <td style={{ ...cellStyle, color: 'white' }}>{question.choices[userAnswers[index]]}</td>
                    <td style={cellStyle}>{isCorrect ? '✔' : '❌'}</td>
                  </tr>
                );
              })}
              <tr>
                <td colSpan="4" style={{ textAlign: 'center', backgroundColor: '#6495ED', color: 'white' }}>
                  {`You answered ${numCorrect} out of ${totalQuestions} questions correctly.`}
                </td>
              </tr>
              {score !== null && (
                <tr>
                  <td colSpan="4" style={{ textAlign: 'center', backgroundColor: '#1E90FF', color: 'white' }}>
                    {`Your quiz score is ${score}%`}
                  </td>
                </tr>
              )}
              {correctAnswers.length > 1 && (
                <tr>
                  <td colSpan="4" style={{ textAlign: 'center', backgroundColor: 'DarkOrange', color: 'white' }}>
                    {`Total number of correct answers in all quizzes is ${correctAnswers.reduce((acc, val) => acc + val.filter(Boolean).length, 0)}.`}
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
          {quiz.courseUrl && (
            <div>
              <p style={{ fontStyle: 'italic' }}>Click on the button below for more information:</p>
              <Button href={quiz.courseUrl} variant="primary" target="_blank">Click here for more information</Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Quiz;










