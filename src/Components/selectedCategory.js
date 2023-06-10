import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import Button from '@mui/material/Button';

import robotImage from '../robot.png';
import userImage from '../user.png';

function QuizPage() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get('category');
  const level = queryParams.get('level');

  const [selectedCategory, setSelectedCategory] = useState(category || '');
  const [selectedLevel, setSelectedLevel] = useState(level || '');
  const [quizzes, setQuizzes] = useState([]);
  const [results, setResults] = useState({});
  const [userAnswers, setUserAnswers] = useState({});
  const [robotAnswers, setRobotAnswers] = useState({});
  const [round, setRound] = useState(1);
  const [showQuiz, setShowQuiz] = useState(true);
  const [showResult, setShowResult] = useState(false);
  const [totalScore, setTotalScore] = useState(0);
  const [winner, setWinner] = useState('');
  const [userRoundWins, setUserRoundWins] = useState(0);
  const [robotRoundWins, setRobotRoundWins] = useState(0);

  const maxRounds = 3;

  useEffect(() => {
    setSelectedCategory(category || '');
    setSelectedLevel(level || '');
  }, [category, level]);

  useEffect(() => {
    if (selectedCategory && selectedLevel) {
      fetchQuizzes();
    }
  }, [selectedCategory, selectedLevel]);

  async function fetchQuizzes() {
    try {
      const response = await fetch(
        `http://localhost:3005/quiz/a?category=${selectedCategory}&level=${selectedLevel}`
      );
      const data = await response.json();
      setQuizzes(data);
      setResults({});
      setUserAnswers({});
      setRobotAnswers({});
      setShowQuiz(true);
      setShowResult(false);
      setTotalScore(0);
    } catch (error) {
      console.error('Error fetching quizzes:', error);
    }
  }

  const handleOptionChange = (questionId, optionIndex) => {
    setUserAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: optionIndex,
    }));
  };

  const handleSubmit = async (questionId) => {
    const userAnswer = userAnswers[questionId];
    const question = quizzes.find((quiz) => quiz.id === questionId);
    const correctAnswer = question.options.findIndex((option) => option === question.answer);

    let robotAnswer;
    let robotResult;

    if (selectedLevel === 'easy') {
      robotAnswer = Math.floor(Math.random() * 100) + 1;
      robotResult = robotAnswer < 30;
    } else if (selectedLevel === 'medium') {
      robotAnswer = Math.floor(Math.random() * 100) + 1;
      robotResult = robotAnswer < 50;
    } else if (selectedLevel === 'difficult') {
      robotAnswer = Math.floor(Math.random() * 100) + 1;
      robotResult = robotAnswer < 70;
    }

    setResults((prevResults) => ({
      ...prevResults,
      [questionId]: userAnswer === correctAnswer,
    }));

    setRobotAnswers((prevRobotAnswers) => ({
      ...prevRobotAnswers,
      [questionId]: {
        answer: robotAnswer,
        result: robotResult,
      },
    }));

    setShowResult(true);
    setShowQuiz(false);
  };

  const getQuizResult = (questionId) => {
    if (showResult) {
      const quizResult = results[questionId];
      const robotData = robotAnswers[questionId];

      if (quizResult !== undefined && robotData !== undefined) {
        const { answer, result } = robotData;

        let winner;
        if (quizResult && result) {
          winner = 'Tie';
        } else if (quizResult) {
          winner = 'User';
        } else if (result) {
          winner = 'Robot';
        } else {
          winner = 'No one';
        }

        return (
          <div>
            <p>Your answer is {quizResult ? 'correct' : 'incorrect'}.</p>
            <table>
              <thead>
                <tr>
                  <th>User</th>
                  <th>Robot</th>
                  <th>Winner</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <img src={userImage} alt="User" />
                    <p>{userAnswers[questionId]}</p>
                  </td>
                  <td>
                    <img src={robotImage} width={150} alt="Robot" />
                    <p>{answer}</p>
                  </td>
                  <td>{winner}</td>
                </tr>
              </tbody>
            </table>
          </div>
        );
      }
    }
    return null;
  };

  const handleNextRound = () => {
    if (round === maxRounds) {
      handleFinishQuiz();
    } else {
      setRound((prevRound) => prevRound + 1);
      setShowQuiz(true);
      setShowResult(false);
      setUserAnswers({});
      setRobotAnswers({});
    }
  };
  const handleFinishQuiz = () => {
    setShowQuiz(false);
    setShowResult(true);
    setRound(maxRounds + 1);
  
    let userScore = 0;
    let robotScore = 0;
    for (let questionId in results) {
      if (results[questionId]) {
        userScore++;
      }
      if (robotAnswers[questionId] && robotAnswers[questionId].result) {
        robotScore++;
      }
    }
    setTotalScore(userScore);
  
    if (userScore > robotScore) {
      setWinner('User');
      setUserRoundWins((prevWins) => prevWins + 1);
    } else if (robotScore > userScore) {
      setWinner('Robot');
      setRobotRoundWins((prevWins) => prevWins + 1);
    } else {
      let otherRoundHasRobot = false;
      let otherRoundHasUser = false;
  
      for (let i = 1; i <= maxRounds; i++) {
        if (i !== round) {
          if (userRoundWins === 0 && robotRoundWins === 0) {
            if (userRoundWins === 0 && robotRoundWins === 0) {
              otherRoundHasUser = true;
            } else {
              otherRoundHasRobot = true;
            }
          }
        }
      }
  
      if (otherRoundHasRobot) {
        setWinner('Robot');
      } else if (otherRoundHasUser) {
        setWinner('User');
      } else {
        if (userRoundWins > robotRoundWins) {
          setWinner('User');
        } else if (robotRoundWins > userRoundWins) {
          setWinner('Robot');
        } else {
          setWinner('no one');
        }
      }
    }
  }
  
  
  
  
  return (
    <div>
      <h1>Quiz Page</h1>
      {selectedCategory && (
        <p>
          Selected Category: {selectedCategory}, Level: {selectedLevel}
        </p>
      )}
      {round === 1 && (
        <Link to={`/quiz?category=${selectedCategory}&level=${selectedLevel}`}>
          <Button disabled={!selectedCategory || !selectedLevel}>Start Quiz</Button>
        </Link>
      )}

      {quizzes.length > 0 && round <= maxRounds && (
        <div>
          <h2>Round {round}</h2>
          {quizzes
            .filter((quiz) => quiz.category === selectedCategory && quiz.level === selectedLevel)
            .map((question) => (
              <div key={question.id}>
                <h3>
                  {question.category} - {question.level}
                </h3>
                <p>{question.question}</p>
                <ul>
                  {question.options.map((option, index) => (
                    <li key={index}>
                      <input
                        type="radio"
                        name={`question_${question.id}`}
                        checked={userAnswers[question.id] === index}
                        onChange={() => handleOptionChange(question.id, index)}
                      />
                      {option}
                    </li>
                  ))}
                </ul>
                <Button onClick={() => handleSubmit(question.id)}>Submit</Button>
                {getQuizResult(question.id)}
              </div>
            ))}
          {showResult && !showQuiz && round === maxRounds && (
            <Button onClick={handleFinishQuiz}>Finish Quiz</Button>
          )}
          {showResult && !showQuiz && round < maxRounds && (
            <Button onClick={handleNextRound}>Next Round</Button>
          )}
        </div>
      )}

      {round > maxRounds && (
        <div>
          <h2>Challenge Completed</h2>
          <p>Your total score is {totalScore} out of {quizzes.length}.</p>
          <p>The final winner is: {winner}</p>
          {winner === 'User' && <img src={userImage} alt="Winner" />}
          {winner === 'Robot' && <img src={robotImage} width={150} alt="Winner" />}
          <p>Number of User Round Wins: {userRoundWins}</p>
          <p>Number of Robot Round Wins: {robotRoundWins}</p>
        </div>
      )}
    </div>
  );
}

export default QuizPage;
