import React, { useEffect } from 'react';
import LoginPage from './components/LoginPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignUp from './components/SignUp';
import MainPage from './components/MainPage'
import { useAuth } from './hooks/AuthContextPro';
import Header from './components/Header';
import ReviewListPage from './components/ReviewListPage';
import ReviewDetailPage from './components/ReviewDetailPage';
import { initLocalStorage } from "./utils/initLocalStorage";
import ReviewEditPage from './components/ReviewEditPage';
import ReviewWritePage from './components/ReviewWritePage';
import MyPage from './components/MyPage';
import MyReviewsPage from './components/MyReviewPage';
import MyLikedReviewsPage from './components/MyLikedReviewPage';
import basicImage from './image/basic.png';
import { useLocalStorage } from './hooks/useLocalStorage';
import LogoutBtn from './components/LogoutBtn';

const App = () => {


  useEffect(() => {
    initLocalStorage();
  }, []);

  const {currentUser, logout} = useAuth();


  const getProfileImage = (userId) => {
    const profiles = JSON.parse(localStorage.getItem('userProfiles') || '[]');
    const found = profiles.find((p) => p.userId === userId);
    return found?.image || basicImage;
  };
  const getUserGrade = (reviewCount) => {
    if (reviewCount <= 10) return { name: '새싹', icon: '🌱' };
    if (reviewCount <= 20) return { name: '묘목', icon: '🌿' };
    if (reviewCount <= 30) return { name: '나무', icon: '🌴' };
    if (reviewCount <= 40) return { name: '숲', icon: '🌳' };
    return { name: '지구', icon: '🌍' };
  };
  const [reviews] = useLocalStorage('reviews', []);
  const myReviewCount = currentUser
    ? reviews.filter((r) => r.writerId === currentUser.id).length
    : 0;

  const userGrade = getUserGrade(myReviewCount);
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
                  {(currentUser)? (<LogoutBtn />) : ("") }
                </p>
              </div>
            </header>
            < Header />
            <main className="flex-1">
              <div className="mx-auto w-full max-w-[1300px] px-4 py-10 sm:px-6 lg:px-8">
                <div className="grid gap-6 grid-cols-[260px_minmax(0,1fr)] items-start">
                  
                  <aside className="lg:sticky lg:top-24 h-fit rounded-2xl border border-white/60 bg-white/70 p-5 shadow-xl backdrop-blur-sm">
                    <h3 className="text-lg font-semibold text-stone-800 mb-4">나의 정보</h3>

                    <div className="flex items-center gap-4">
                      <img
                        src={currentUser ? getProfileImage(currentUser.id) : basicImage}
                        alt="profile"
                        className="w-16 h-18 rounded-full object-cover border-2 border-amber-200 shadow-sm"
                        onError={(e) => {
                          e.currentTarget.src = basicImage;
                        }}
                      />

                        <div className="h-24 w-px bg-stone-300"></div>

                      <div className="flex flex-col my-2 justify-center">
                        {currentUser ? (
                          <>
                            <p className="text-base font-semibold text-stone-800">
                              <span className='font-thin text-sm'>ID: </span>{currentUser.id}
                            </p>

                            <span className='my-2'>
                              <span className='font-thin text-sm'>MBTI: </span>
                            <span className="mt-1 inline-block w-fit px-2 py-0.5 rounded bg-amber-100 text-amber-700 text-xs font-semibold">
                              {currentUser.mbti}
                            </span>
                            </span>
                            <p className="text-base text-stone-800">
                              <span className='font-thin text-sm'>내 등급: </span> <span className='font-bold text-sm'>{userGrade.name} </span> {userGrade.icon}
                            </p>
                          </>
                        ) : (
                          <>
                            <p className="text-base font-semibold text-stone-800">
                              Guest
                            </p>
                            <p className="text-xs text-stone-500">
                              로그인 후 이용 가능
                            </p>
                          </>
                        )}
                      </div>

                    </div>
                  </aside>

                  <section className="mx-auto w-full max-w-4xl rounded-3xl border border-white/60 bg-white/70 p-6 shadow-xl backdrop-blur-sm sm:p-8">
                    <Routes>
                      <Route path="/login" element={<LoginPage />} />
                      <Route path="/signup" element={<SignUp />} />
                      <Route path="/" element={<MainPage />} />
                      <Route path="/reviews" element={<ReviewListPage />} />
                      <Route path="/reviews/:id" element={<ReviewDetailPage />} />
                      <Route path="/reviews/edit/:id" element={<ReviewEditPage />} />
                      <Route path="/reviews/write" element={<ReviewWritePage />} />
                      <Route path="/mypage" element={<MyPage />} />
                      <Route path="/mypage/my-reviews" element={<MyReviewsPage />} />
                      <Route path="/mypage/liked-reviews" element={<MyLikedReviewsPage />} />
                    </Routes>
                  </section>

                </div>
              </div>
            </main>
            <footer className="border-t border-amber-200/70 bg-white/60 py-4 text-center text-sm text-stone-500">
              Team 2 : Movie Review React Project
            </footer>
            </div>
        </BrowserRouter>
    </div>
  );
};
export default App;