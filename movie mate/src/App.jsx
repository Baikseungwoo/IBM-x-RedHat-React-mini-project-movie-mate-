import React from 'react';
import LoginPage from './components/LoginPage';
import { BrowserRouter, Route, Routes  } from 'react-router-dom';
import SignUp from './components/SignUp';
import AuthContextPro from './hooks/AuthContextPro';

const App = () => {
  return (
    <AuthContextPro>
    <BrowserRouter>
      <Routes>
        <Route path='/login' element = {<LoginPage />}></Route>
        <Route path='/signup' element = {<SignUp />}></Route>
      </Routes>
    </BrowserRouter>
    </AuthContextPro>
  );
};
export default App;