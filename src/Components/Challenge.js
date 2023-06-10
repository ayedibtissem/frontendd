import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import Categories from './Categories';
import Button from '@mui/material/Button';

function Challenge() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get('category');
  const level = queryParams.get('level');

  const [showCategories, setShowCategories] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(category || '');
  const [selectedLevel, setSelectedLevel] = useState(level || '');
  const [quizzes, setQuizzes] = useState([]);

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
      const response = await fetch(`https://cybersec.onrender.com/quiz/a?category=${selectedCategory}&level=${selectedLevel}`);
      const data = await response.json();
      setQuizzes(data);
    } catch (error) {
      console.error('Error fetching quizzes:', error);
    }
  }

  function handleCategoryChange(category) {
    setSelectedCategory(category);
    setQuizzes([]);
  }

  function handleLevelChange(level) {
    setSelectedLevel(level);
    setQuizzes([]);
  }

  return (
    <div>
      <h1>Challenge</h1>
      {selectedCategory && (
        <p>
          Selected Category: {selectedCategory}, Level: {selectedLevel}
        </p>
      )}
      <Button onClick={() => setShowCategories(!showCategories)}>
        {showCategories ? 'Hide' : 'Show'} Categories
      </Button>
      {showCategories && (
        <Categories
          onCategoryChange={handleCategoryChange}
          onLevelChange={handleLevelChange}
        />
      )}
      <Link to={`/quiz?category=${selectedCategory}&level=${selectedLevel}`}>
        <Button disabled={!selectedCategory || !selectedLevel}>Start Quiz</Button>
      </Link>

      {quizzes.length > 0 && (
        <div>
          <h2>Quizzes</h2>
          <ul>
            {quizzes
              .filter(
                (quiz) =>
                  quiz.category === selectedCategory && quiz.level === selectedLevel
              )
              .map((question) => (
                <li key={question.category}>
                  {question.category} - {question.level}
                  <p>{question.question}</p>
                  <ul>
                    {question.options.map((option, index) => (
                      <li key={index}>{option}</li>
                    ))}
                  </ul>
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Challenge;
