import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import Pho from './Photo1';

import { useNavigate } from 'react-router-dom';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import Phot from './Poto2';
import Phot1 from './Photo3';
import PHOTO2 from '../pages/ph';
const CategoryContainer = styled('div')(({ selected, theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: 180,
  width: 180,
  borderRadius: 8,
  border: `2px solid ${theme.palette.grey[500]}`,
  margin: '0.5rem',
  background: selected ? theme.palette.primary.main : theme.palette.grey[200],
  transition: 'background 0.3s ease',
  cursor: 'pointer',
  '&:hover': {
    background: selected ? theme.palette.primary.main : theme.palette.grey[300],
  },

}));

const CategoryImage = styled('img')({
  maxWidth: '70%',
  maxHeight: '70%',
});

const CategoryTitle = styled(Typography)(({ theme }) => ({
  marginTop: '8px',
  fontSize: '16px',
  fontWeight: 'bold',
  color: theme.palette.text.primary,
  textTransform: 'uppercase',
}));

const DifficultyContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginTop: '10px',
});

const DifficultyLabel = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '14px',
  marginBottom: '5px',
  color: theme.palette.secondary.main,
}));

const DifficultyButton = styled(Button)(({ selected, theme }) => ({
  marginLeft: '5px',
  backgroundColor: selected ? '#FF5722' : '#F5F5F5',
  color: selected ? 'white' : 'black',
  transition: 'background 0.3s ease',
  '&:hover': {
    backgroundColor: selected ? '#FF5722' : theme.palette.action.hover,
  },
}));

const SelectedTitle = styled(Typography)(({ theme }) => ({
  margin: '20px',
  fontSize: '24px',
  fontWeight: 'bold',
  color: theme.palette.secondary.main,
  textTransform: 'uppercase',
}));

function Categories({ onCategoryChange, onLevelChange }) {
  const tabs = [
    {
      title: 'social engeering',
      label: 'social engeering',
      image: <Phot1 />,
      link: '/social engeering',
    },
    {
      title: 'email',
      label: 'Email',
      image: <PHOTO2 />,
      link: '/email',
    },
    {
      title: 'password policies',
      label: 'password policies',
      image: <Phot1 />,
      link: '/password policies',
    },
    {
      title: 'web protection',
      label: 'web protection',
      image: <Phot />,
      link: '/web protection',
    },
    {
      title: 'protection',
      label: 'Protection',
      image: <Pho />,
      link: '/protection',
    },
  ];

  const [selectedTitle, setSelectedTitle] = useState('');
  const [categoryDifficulties, setCategoryDifficulties] = useState({});

  const handleTitleSelect = (title) => {
    setSelectedTitle(title);
  };

  const handleDifficultyChange = (category, difficulty) => {
    setCategoryDifficulties((prevState) => ({
      ...prevState,
      [category]: difficulty,
    }));
  };

  const handleCategorySelection = () => {
    onCategoryChange(selectedTitle);
    onLevelChange(categoryDifficulties[selectedTitle]);
  };

  return (
    <>
      <Grid container spacing={2} justifyContent="center">
        {tabs.map((tab) => (
          <Grid item key={tab.title}>
            <CategoryContainer
              selected={selectedTitle === tab.title}
              onClick={() => handleTitleSelect(tab.title)}
            >
              <Link to={tab.link}>{tab.image}</Link>
              <CategoryTitle>{tab.label}</CategoryTitle>
            </CategoryContainer>
          </Grid>
        ))}
      </Grid>
      {selectedTitle && (
        <>
          <SelectedTitle>{selectedTitle}</SelectedTitle>
          <DifficultyContainer>
            <DifficultyLabel>Difficulty:</DifficultyLabel>
            <DifficultyButton
              selected={categoryDifficulties[selectedTitle] === 'easy'}
              onClick={() => handleDifficultyChange(selectedTitle, 'easy')}
            >
              Easy
            </DifficultyButton>
            <DifficultyButton
              selected={categoryDifficulties[selectedTitle] === 'medium'}
              onClick={() => handleDifficultyChange(selectedTitle, 'medium')}
            >
              Medium
            </DifficultyButton>
            <DifficultyButton
              selected={categoryDifficulties[selectedTitle] === 'hard'}
              onClick={() => handleDifficultyChange(selectedTitle, 'hard')}
            >
              Hard
            </DifficultyButton>
          </DifficultyContainer>
          <Button
            variant="outlined"
            sx={{
              marginTop: '1rem',
              marginBottom: '2rem',
              backgroundColor: '#4caf50',
              color: 'white',
              '&:hover': {
                backgroundColor: '#45a049',
              },
            }}
            onClick={handleCategorySelection}
          >
           start challenge
          </Button>
        </>
      )}
    </>
  );
}

function ChallengePage() {
  const navigate = useNavigate();
  const [opponent, setOpponent] = useState('human');
  const [showCategories, setShowCategories] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');

  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }

  function handleLevelChange(level) {
    setSelectedLevel(level);
  }

  function handleClick() {
    if (selectedCategory && selectedLevel) {
      navigate(`/quiz?category=${selectedCategory}&level=${selectedLevel}`);
    } else {
      console.log('Please select both category and level');
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '3rem', color: '#FFB89A' }}>Challenge</h1>
      <h2 style={{ textAlign: 'center', color: '#2196f3', marginBottom: '2rem' }}>
        Select the player you wish to play with?
      </h2>
      <FormControl component="fieldset" style={{ marginBottom: '2rem' }}>
        <FormLabel component="legend" style={{ marginBottom: '1rem', color: '#2196f3', fontWeight: 'bold' }}>
          Choose your opponent:
        </FormLabel>
        <RadioGroup
          aria-label="opponent"
          value={opponent}
          onChange={(event) => setOpponent(event.target.value)}
          name="radio-buttons-group"
          style={{ flexDirection: 'row' }}
        >
          <FormControlLabel
            value="robot"
            control={<Radio />}
            label={
              <div>
                <img
                  src="https://cdn-icons-png.flaticon.com/512/1547/1547183.png"
                  alt="Robot"
                  style={{ height: '70px', marginRight: '5px' }}
                />
                Robot
              </div>
            }
          />
        </RadioGroup>
      </FormControl>
      {opponent === 'human' ? (
        <p style={{ textAlign: 'center', color: 'green', fontWeight: 'bold' }}>
          You have selected to play with a human.
        </p>
      ) : (
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '2rem' }}>
          <p style={{ textAlign: 'center', color: 'green', fontWeight: 'bold' }}>
            You have selected to play with a robot.
          </p>

          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ position: 'relative' }}>
              <img
                src="https://cdn-icons-png.flaticon.com/512/1547/1547183.png"
                alt="Human vs Robot"
                style={{ height: '120px', marginRight: '1rem', borderRadius: '4px' }}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: '5px',
                  left: '5px',
                  background: 'rgba(0, 0, 0, 0.5)',
                  padding: '5px',
                  borderRadius: '4px',
                  color: 'white',
                  fontWeight: 'bold',
                }}
              >
                Robot
              </div>
            </div>
            <p style={{ fontWeight: 'bold', fontSize: '2rem', margin: '0 1rem' }}>vs</p>
            <div style={{ position: 'relative' }}>
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8N1LOjpnZwEHmZAURdB-pIp55H__ezU0_dLmhnZx5hgiOnONKUyV86t5AtCpChWce-xo&usqp=CAU"
                alt="Human vs Robot"
                style={{ height: '120px', marginLeft: '1rem', borderRadius: '4px' }}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: '5px',
                  left: '5px',
                  background: 'rgba(0, 0, 0, 0.5)',
                  padding: '5px',
                  borderRadius: '4px',
                  color: 'white',
                  fontWeight: 'bold',
                }}
              >
                Human
              </div>
            </div>
          </div>
        </div>
      )}
      {opponent && (
        <>
          <h1 style={{ marginTop: '3rem', color: 'blue', fontWeight: 'bold' }}>SELECT Category</h1>
          <Button
            variant="outlined"
            sx={{
              backgroundColor: '#4caf50',
              color: 'white',
              '&:hover': {
                backgroundColor: '#45a049',
              },
              marginTop: '1rem',
              marginBottom: '2rem',
            }}
            onClick={() => setShowCategories(!showCategories)}
          >
            {showCategories ? 'Hide' : 'Show'} Categories
          </Button>
          {showCategories && (
            <Categories
              onCategoryChange={handleCategoryChange}
              onLevelChange={handleLevelChange}
            />
          )}
        </>
      )}
      {opponent && (
        <Button
          variant="contained"
          color="primary"
          sx={{
            marginTop: '2rem',
            backgroundColor: '#f44336',
            '&:hover': {
              backgroundColor: '#d32f2f',
            },
          }}
          onClick={handleClick}
        >
          Start Game
        </Button>
      )}
    </div>
  );
}

export default ChallengePage;
