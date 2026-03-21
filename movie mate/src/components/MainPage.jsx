import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/AuthContextPro';

const MainPage = () => {
    const { currentUser } = useAuth();
    const [allReviews, setAllReviews] = useState([]);
    const [selectedMbti, setSelectedMbti] = useState(currentUser ? currentUser.mbti : "ISTJ");

    const mbtiList = ["ISTJ", "ISFJ", "INFJ", "INTJ", "ISTP", "ISFP", "INFP", "INTP", "ESTP", "ESFP", "ENFP", "ENTP", "ESTJ", "ESFJ", "ENFJ", "ENTJ"]

    useEffect(() => {
        const data = localStorage.getItem('reviews');
        if (data) setAllReviews(JSON.parse(data));
    }, []);

    // 로그인 여부에 상관없이 현재 타겟이 되는 MBTI
    const currentViewMbti = selectedMbti;

    return (
        <div className="space-y-8">

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
                        className={`px-7 py-1 rounded-lg border text-sm transition mx-auto
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
                        className={`px-3 py-1 rounded-lg border text-sm transition
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

            {/* 2. 추천 리뷰 */}
            <section className="rounded-2xl bg-white/80 p-6 shadow-md border border-amber-100">
            <h3 className="text-lg font-semibold text-stone-800 mb-4">
                {currentViewMbti} 추천 리뷰
            </h3>

            <div className="space-y-3">
                {allReviews
                .filter((review) => review.mbti === currentViewMbti)
                .map((review) => (
                    <Link
                    to={`/reviews/${review.id}`}
                    key={review.id}
                    >
                    <div className="p-4 rounded-xl border border-gray-200 hover:bg-amber-50 hover:shadow transition duration-200">
                        <h4 className="font-semibold text-stone-800">
                        {review.title}
                        </h4>
                        <span className="text-sm text-stone-500">
                        작성자: {review.writerId}
                        </span>
                    </div>
                    </Link>
                ))}
                
            </div>
            </section>

            {/* 3. 전체 리뷰 */}
            <section className="rounded-2xl bg-white/80 p-6 shadow-md border border-amber-100">
            <h3 className="text-lg font-semibold text-stone-800 mb-4">
                전체 최신 후기
            </h3>

            <ul className="space-y-2">
                {allReviews.map((review) => (
                <li key={review.id}>
                    <Link
                    to={`/reviews/${review.id}`}
                    className="block p-3 rounded-lg hover:bg-amber-50 transition duration-200"
                    >
                    <span className="text-sm text-amber-600 font-medium">
                        [{review.mbti}]
                    </span>{" "}
                    <span className="text-stone-800">
                        {review.title}
                    </span>
                    <span className="text-sm text-stone-500 ml-2">
                        (작성자: {review.writerId})
                    </span>
                    </Link>
                </li>
                ))}
            </ul>
            </section>

        </div>
    );
};

export default MainPage;