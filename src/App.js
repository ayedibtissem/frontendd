import React from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Photo from './Components/Photo';
import QuizList from './pages/QuizList';
import Navbar from './pages/Navbar';
import Challenge from './Components/Challenge';
import Robot from './Components/robot';
import SelectedQuiz from './Components/selectedCategory';
import QuizPage from './Components/selectedCategory';
import Dashboard from './Components/dashboard';
import UserManagement from './Components/usermanagement';
import QuizManager from './Components/quizmanagement';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <Photo>
          <Navbar></Navbar>
         
        </Photo>
      ),
    },
    {
      path: '/login',
      element: <Login></Login>,
    },
    {
      path: '/register',
      element: <Register></Register>,
    },
    {
      path: '/quizzes',
      element: <QuizList></QuizList>,
    },
    {
      path: '/challenge',
      element: <Challenge></Challenge>,
    },
    {
      path: '/robot',
      element: <Robot></Robot>,
    },
    {
      path: '/quiz',
      element: <QuizPage></QuizPage>,
    },
    {
      path:'/dashboard',
      element:<Dashboard></Dashboard>
    }, {
      path:'/users',
      element:<UserManagement></UserManagement>
    },{
      path:'/quizz',
      element:<QuizManager></QuizManager>
    }
  ]);

  return (
    <div className="App">
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;

