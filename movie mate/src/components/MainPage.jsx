import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/AuthContextPro';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useNavigate } from 'react-router-dom';

const MainPage = () => {
    const { currentUser } = useAuth();
    const [allReviews, setAllReviews] = useState([]);
    const [selectedMbti, setSelectedMbti] = useState(currentUser ? currentUser.mbti : "ISTJ");

    const mbtiList = ["ISTJ", "ISFJ", "INFJ", "INTJ", "ISTP", "ISFP", "INFP", "INTP", "ESTP", "ESFP", "ENFP", "ENTP", "ESTJ", "ESFJ", "ENFJ", "ENTJ"]

    useEffect(() => {
        const data = localStorage.getItem('reviews');
        if (data) setAllReviews(JSON.parse(data));
    },[]);

    // 로그인 여부에 상관없이 현재 타겟이 되는 MBTI
    const currentViewMbti = selectedMbti;

    const [reviews] = useLocalStorage('reviews', []);
    const navigate = useNavigate();

    const top3 = [...reviews]
    .sort((a, b) => {
        if (b.likes !== a.likes) return b.likes - a.likes;
        return new Date(b.createdAt) - new Date(a.createdAt);
    })
    .slice(0, 3);

    return (
        <div className="space-y-8">

            <section className="rounded-2xl bg-gradient-to-r from-amber-100 to-orange-100 p-6 shadow-md border border-amber-200">
  
                <h3 className="text-lg font-bold text-amber-800 mb-4">
                    🔥 Movie Mate 인기 리뷰 Top 3
                </h3>

                {top3.length > 0 ? (
                    <div className="space-y-3">
                    {top3.map((item) => (
                        <div
                        key={item.id}
                        onClick={() => navigate(`/reviews/${item.id}`)}
                        className="cursor-pointer p-4 rounded-xl bg-white border border-amber-200 hover:bg-amber-50 hover:shadow transition duration-200"
                        >
                        <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-bold text-red-500 bg-red-100 px-2 py-0.5 rounded">
                            HOT
                            </span>
                            <h4 className="font-semibold text-stone-800">
                            {item.title}
                            </h4>
                        </div>

                        <p className="text-sm text-stone-600">
                            ♥️(좋아요) <span className='font-bold'>{item.likes}</span> | 🎬(장르) <span className='font-bold'>{item.genre}</span> | ⭐(평점) :  <span className='font-bold'>{item.rating}</span>
                        </p>
                        </div>
                    ))}
                    </div>
                ) : (
                    <p className="text-sm text-stone-500">
                    아직 등록된 후기가 없습니다.
                    </p>
                )}

                </section>

            {/* 1. 상단 영역 */}
            <section className="rounded-2xl bg-white/80 p-6 shadow-md border border-amber-100">
            
            {currentUser ? (
                <>
                <h2 className="text-xl font-bold text-amber-800">
                {currentUser.id}님의 맞춤 리뷰
                </h2>
                <div className='mx-2 my-2 text-sm'>
                    다른 MBTI의 리뷰들은 어떠세요??
                </div>
                <div className="flex flex-wrap gap-2">
                    {mbtiList.map((m) => (
                    <button
                        key={m}
                        onClick={() => setSelectedMbti(m)}
                        className={`px-7 py-1 rounded-lg border text-sm transition
                        ${selectedMbti === m
                            ? "bg-amber-500 text-white border-amber-500"
                            : "border-gray-300 hover:bg-amber-50"
                        }`}
                    >
                        {m}
                    </button>
                    ))}
                </div>
                </>
                
            ) : (
                <div>
                <h2 className="text-xl font-bold text-stone-800 mb-2">
                    MBTI별 리뷰 탐색
                </h2>
                <p className="text-sm text-stone-500 mb-4">
                    로그인하면 내 MBTI 리뷰를 바로 볼 수 있습니다.
                </p>

                {/* MBTI 버튼 */}
                <div className="flex flex-wrap gap-2">
                    {mbtiList.map((m) => (
                    <button
                        key={m}
                        onClick={() => setSelectedMbti(m)}
                        className={`px-7 py-1 rounded-lg border text-sm transition
                        ${selectedMbti === m
                            ? "bg-amber-500 text-white border-amber-500"
                            : "border-gray-300 hover:bg-amber-50"
                        }`}
                    >
                        {m}
                    </button>
                    ))}
                </div>
                </div>
            )}
            </section>

            <section className="rounded-2xl border border-amber-100 bg-white/85 p-7 shadow-md">
                <h3 className="mb-5 flex items-center gap-2 text-xl font-bold text-stone-800">
                    <span className="text-amber-500">✨</span>
                    {currentViewMbti} 추천 리뷰
                </h3>

                <div className="space-y-4">
                    {allReviews
                    .filter((review) => review.writerMbti === currentViewMbti)
                    .slice(0, 4)
                    .map((review) =>
                        currentUser ? (
                        <Link to={`/reviews/${review.id}`} key={review.id}>
                            <div className="rounded-xl border border-gray-200 bg-white px-4 py-4 hover:-translate-y-0.5 hover:bg-amber-50/70 hover:shadow-md transition duration-200">
                            <div className="mb-2 flex items-center justify-between">
                                <span className="rounded-full bg-amber-100 px-2.5 py-1 text-xs font-medium text-amber-700">
                                {review.writerMbti}
                                </span>
                            </div>

                            <h4 className="text-lg font-semibold text-stone-800">
                                {review.title}
                            </h4>

                            <span className="mt-1 block text-sm text-stone-500">
                                작성자: {review.writerId}
                            </span>
                            </div>
                        </Link>
                        ) : (
                        <div
                            key={review.id}
                            onClick={() => {
                            alert("내용을 확인하시려면 로그인이 필요합니다.");
                            navigate("/login");
                            }}
                            className="cursor-pointer"
                        >
                            <div className="rounded-xl border border-gray-200 bg-white px-4 py-4 hover:-translate-y-0.5 hover:bg-amber-50/70 hover:shadow-md transition duration-200">
                            <div className="mb-2 flex items-center justify-between">
                                <span className="rounded-full bg-amber-100 px-2.5 py-1 text-xs font-medium text-amber-700">
                                {review.writerMbti}
                                </span>
                            </div>

                            <h4 className="text-lg font-semibold text-stone-800">
                                {review.title}
                            </h4>

                            <span className="mt-1 block text-sm text-stone-500">
                                작성자: {review.writerId}
                            </span>
                            </div>
                        </div>
                        )
                    )}
                </div>
            </section>

            <section className="rounded-2xl border border-amber-100 bg-white/85 p-7 shadow-md">
                <h3 className="mb-5 flex items-center gap-2 text-xl font-bold text-stone-800">
                    <span className="text-amber-500">🕒</span>
                    전체 최신 후기
                </h3>

                <ul className="space-y-3">
                    {allReviews
                    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                    .slice(0, 3)
                    .map((review) => (
                        <li key={review.id}>
                        {currentUser ? (
                            <Link
                            to={`/reviews/${review.id}`}
                            className="block rounded-xl border border-transparent px-4 py-3 hover:border-amber-100 hover:bg-amber-50/70 transition duration-200"
                            >
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-semibold text-amber-600">
                                [{review.writerMbti}]
                                </span>
                                <span className="text-base text-stone-800">
                                {review.title}
                                </span>
                            </div>

                            <span className="mt-1 block text-sm text-stone-500">
                                작성자: {review.writerId}
                            </span>
                            </Link>
                        ) : (
                            <div
                            onClick={() => {
                                alert("로그인이 필요합니다.");
                                navigate("/login");
                            }}
                            className="cursor-pointer"
                            >
                            <div className="block rounded-xl border border-transparent px-4 py-3 hover:border-amber-100 hover:bg-amber-50/70 transition duration-200">
                                <div className="flex items-center gap-2">
                                <span className="text-sm font-semibold text-amber-600">
                                    [{review.writerMbti}]
                                </span>
                                <span className="text-base text-stone-800">
                                    {review.title}
                                </span>
                                </div>

                                <span className="mt-1 block text-sm text-stone-500">
                                작성자: {review.writerId}
                                </span>
                            </div>
                            </div>
                        )}
                        </li>
                    ))}
                </ul>
            </section>

        </div>
    );
};

export default MainPage;