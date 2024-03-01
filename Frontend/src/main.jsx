import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Home from './Components/Home/Home'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Layout from './Layout.jsx'
import About from './Components/About/About.jsx'
import Contact from './Components/Login/Login.jsx'
import CreateQuiz from './Components/CreateQuiz/CreateQuiz.jsx'
import JoinQuiz from './Components/JoinQuiz/JoinQuiz.jsx'
import Login from './Components/Login/Login.jsx'
import SignUp from './Components/SignUp/SignUp.jsx'
import QuizDisplay from './Components/QuizDisplay/QuizDisplay.jsx'
import Questions from './Components/CreateQuiz/Questions.jsx'
import NewQuestion from './Components/CreateQuiz/NewQuestion.jsx'
import UserProfile from './Components/userProfile/UserProfile.jsx'
import LogOut from './Components/LogOut/LogOut.jsx'
import PageNotFound from './Components/PageNotFound/PageNotFound.jsx'
import QuestionEdit from './Components/CreateQuiz/QuestionEdit.jsx'
import QuizCard from './Components/Cards/QuizCard.jsx'
import CreatedQuizes from './Components/Cards/CreatedQuizes.jsx'
import JoinedQuizes from './Components/Cards/JoinedQuizes.jsx'
import EditQuiz from './Components/CreateQuiz/EditQuiz.jsx'
import JoinedQuizResult from './Components/Cards/JoinedQuizResult.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route path='/' element={<Home />} />
      <Route path='about' element={<About />} />
      <Route path='contact' element={<Contact />} />
      <Route path='CreateQuiz' element={<CreateQuiz />} />
      <Route path='Quiz/:quizCode/edit' element={<EditQuiz />} />
      <Route path='CreateQuiz/:quizCode/addQuestion' element={<Questions />} />
      <Route path='CreateQuiz/:quizCode/addQuestion/new' element={<NewQuestion />} />
      <Route path='CreateQuiz/:quizCode/addQuestion/:id/edit' element={<QuestionEdit />} />
      <Route path='JoinQuiz' element={<JoinQuiz />} />
      <Route path='JoinQuiz/:quizCode' element={<JoinQuiz />} />
      <Route path='Login' element={<Login />} />
      <Route path='SignUp' element={<SignUp />} />
      <Route path='QuizDisplay/:quizId' element={<QuizDisplay />} />
      <Route path='UserProfile' element={<UserProfile />} />
      <Route path='LogOut' element={<LogOut />} />
      <Route path='QuizCard' element={< QuizCard />} />
      <Route path='CreatedQuizes' element={<CreatedQuizes />} />
      <Route path='JoinedQuizes' element={<JoinedQuizes />} />
      <Route path='JoinedQuizes/results/:quizCode' element={<JoinedQuizResult />} />
      <Route path='*' element={<PageNotFound />} />

    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
