import React, { useEffect, useState } from 'react';
import axios from 'axios';
const questionStyles = {
  marginBottom: '20px',
};
const inputStyles = {
  marginBottom: '10px',
  padding: '5px',
};

function Question({ questionIndex, handleQuestionChange }) {
  return (
    <div style={questionStyles} key={`question-${questionIndex}`}>
      <input
        type="text"
        placeholder="Question Text"
        style={inputStyles}
        onChange={(e) => handleQuestionChange(questionIndex, 'text', e.target.value)}
      />
      <input
        type="text"
        placeholder="Choice 1"
        style={inputStyles}
        onChange={(e) => handleQuestionChange(questionIndex, 'choices', [e.target.value])}
      />
      <input
        type="text"
        placeholder="Choice 2"
        style={inputStyles}
        onChange={(e) =>
          handleQuestionChange(questionIndex, 'choices', [e.target.value, ''])
        }
      />
      <input
        type="text"
        placeholder="Choice 3"
        style={inputStyles}
        onChange={(e) =>
          handleQuestionChange(questionIndex, 'choices', [e.target.value, '', ''])
        }
      />
    </div>
  );
}

function QuizManager() {
  const [quizzes, setQuizzes] = useState([]);
  const [newQuiz, setNewQuiz] = useState({ title: '', questions: [], courseUrl: '' });

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    try {
      const response = await axios.get('http://localhost:3005/admin/quizz');
      setQuizzes(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleQuestionChange = (questionIndex, key, value) => {
    const updatedQuestions = [...newQuiz.questions];
    updatedQuestions[questionIndex] = {
      ...updatedQuestions[questionIndex],
      [key]: value,
    };
    setNewQuiz({ ...newQuiz, questions: updatedQuestions });
  };

  const addQuestion = () => {
    setNewQuiz({
      ...newQuiz,
      questions: [...newQuiz.questions, { text: '', choices: ['', '', ''] }],
    });
  };

  const createQuiz = async () => {
    try {
      const response = await axios.post('https://cybersec.onrender.com/admin/quizz', newQuiz);
      setQuizzes([...quizzes, response.data]);
      setNewQuiz({ title: '', questions: [], courseUrl: '' });
    } catch (error) {
      console.error(error);
    }
  };

  const deleteQuiz = async (quizzId) => {
    try {
      await axios.delete(`http://localhost:3005/admin/${quizzId}`);
      fetchQuizzes();
    } catch (error) {
      console.error(error);
    }
  };

  const containerStyles = {
    fontFamily: 'Arial, sans-serif',
    margin: '20px',
  };

  const headingStyles = {
    fontSize: '24px',
    fontWeight: 'bold',
  };

  const inputStyles = {
    marginBottom: '10px',
    padding: '5px',
  };

  const buttonStyles = {
    marginTop: '10px',
    padding: '5px 10px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '3px',
    cursor: 'pointer',
  };

  return (
    <div style={containerStyles}>
      <h1 style={headingStyles}>Quiz Manager</h1>
      <h2>Create Quiz</h2>
      <input
        type="text"
        placeholder="Quiz Title"
        style={inputStyles}
        value={newQuiz.title}
        onChange={(e) => setNewQuiz({ ...newQuiz, title: e.target.value })}
      />
      {newQuiz.questions.map((question, index) => (
        <Question
          key={`question-${index}`}
          questionIndex={index}
          handleQuestionChange={handleQuestionChange}
        />
      ))}
      <button onClick={addQuestion}>Add Question</button>
      <input
        type="text"
        placeholder="Course URL"
        style={inputStyles}
        value={newQuiz.courseUrl}
        onChange={(e) => setNewQuiz({ ...newQuiz, courseUrl: e.target.value })}
      />
      <button onClick={createQuiz}>Create Quiz</button>

      <h2>Quizzes</h2>
      {quizzes.map((quiz) => (
        <div key={quiz._id}>
          <h3>{quiz.title}</h3>
          <p>Course URL: {quiz.courseUrl}</p>
          <button onClick={() => deleteQuiz(quiz._id)}>Delete Quiz</button>
        </div>
      ))}
    </div>
  );
}

export default QuizManager;

