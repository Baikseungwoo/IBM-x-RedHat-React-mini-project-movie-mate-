import React from 'react';
import LoginPage from './components/LoginPage';
import { BrowserRouter, Route, Routes  } from 'react-router-dom';
import SignUp from './components/SignUp';
import MainPage from './components/MainPage'
import { useAuth } from './hooks/AuthContextPro';

const App = () => {

  const {currentUser, logout} = useAuth();

  const clickbtn = ()=>{
    const ok = confirm("정말 로그아웃 하시겠습니까??")
    if(ok){logout()}
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-stone-100 text-stone-800">
        <BrowserRouter>
          <div className="min-h-screen flex flex-col">
            <header className="w-full border-b border-amber-200/70 bg-white/70 backdrop-blur-md shadow-sm">
              <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
                <h1 className="text-2xl font-bold tracking-wide text-amber-900">
                  Movie Mate
                </h1>
                <p className="text-sm text-black-500">
                  {(currentUser)? (<span>접속자 ID :  <span className='font-bold'>{currentUser.id}</span> 님</span>) : ("현재 Guest 상태로 접속중...") }
                  {(currentUser)? (<button onClick={()=>clickbtn()} className='mx-5 px-3 py-1 border border-gray-400 hover:bg-red-300 rounded-lg'>로그아웃</button>) : ("") }
                </p>
              </div>
            </header>
            <main className="flex-1">
              <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
                <div className="rounded-3xl border border-white/60 bg-white/70 p-6 shadow-xl backdrop-blur-sm sm:p-8">
                  <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/" element={<MainPage />} />
                  </Routes>
                </div>
              </div>
            </main>
            <footer className="border-t border-amber-200/70 bg-white/60 py-4 text-center text-sm text-stone-500">
              Movie Review React Project
            </footer>
            </div>
        </BrowserRouter>
    </div>
  );
};
export default App;