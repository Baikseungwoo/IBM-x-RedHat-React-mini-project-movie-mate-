import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { mbtiList } from './Signup'; 

const MainPage = () => {
    const { currentUser } = useAuth();
    const [allReviews, setAllReviews] = useState([]);
    const [selectedMbti, setSelectedMbti] = useState(currentUser ? currentUser.mbti : "INFP");

    useEffect(() => {
        const data = localStorage.getItem('reviews');
        if (data) setAllReviews(JSON.parse(data));
    }, []);

    // 로그인 여부에 상관없이 현재 타겟이 되는 MBTI
    const currentViewMbti = currentUser ? currentUser.mbti : selectedMbti;

    return (
        <div>
            {/* 1. 상단: 상태 알림 및 조작 영역 */}
            <section>
                {currentUser ? (
                    <h2>{currentUser.nickname}님의 ({currentUser.mbti})맞춤 리뷰</h2>
                ) : (
                    <div>
                        <h2>MBTI별 리뷰 탐색</h2>
                        <p>로그인하면 내 MBTI 리뷰를 바로 볼 수 있습니다.</p>
                        {mbtiList.map(m => (
                            <button key={m} onClick={() => setSelectedMbti(m)}>
                                {m}
                            </button>
                        ))}
                    </div>
                )}
            </section>

            <hr />

            {/* 2. 중단: 필터링된 리뷰 목록 (데이터가 항상 있다는 전제) */}
            <section>
                <h3>#{currentViewMbti} 추천 리뷰</h3>
                <div>
                    {allReviews
                        .filter(review => review.mbti === currentViewMbti)
                        .map(review => (
                            <Link to={`/reviews/${review.id}`} key={review.id}>
                                <div>
                                    <h4>{review.title}</h4>
                                    <span>작성자: {review.writerId}</span>
                                </div>
                            </Link>
                        ))
                    }
                </div>
            </section>

            <hr />

            {/* 3. 하단: 전체 피드 */}
            <section>
                <h3>전체 최신 후기</h3>
                <ul>
                    {allReviews.map(review => (
                        <li key={review.id}>
                            <Link to={`/reviews/${review.id}`}>
                                [{review.mbti}] {review.title} (작성자: {review.writerId})
                            </Link>
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    );
};

export default MainPage;