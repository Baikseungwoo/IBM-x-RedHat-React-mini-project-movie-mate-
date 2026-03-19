import React from 'react';
import LoginPage from './components/LoginPage';
import { BrowserRouter, Route, Routes  } from 'react-router-dom';
import SignUp from './components/SignUp';
import MainPage from './components/MainPage'
import AuthContextPro from './hooks/AuthContextPro';

const App = () => {
  return (
    <div>
    <AuthContextPro>
    <BrowserRouter>
      <Routes>
        <Route path='/login' element = {<LoginPage />}></Route>
        <Route path='/signup' element = {<SignUp />}></Route>
        <Route path='/' element = {<MainPage />}></Route>
      </Routes>
    </BrowserRouter>
    </AuthContextPro>
    </div>
  );
};
export default App;