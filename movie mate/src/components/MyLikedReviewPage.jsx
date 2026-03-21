import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/AuthContextPro';
import { useLocalStorage } from '../hooks/useLocalStorage';

const MyLikedReviewsPage = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [reviews] = useLocalStorage('reviews', []);
  const [likes] = useLocalStorage('like', []);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;

  if (!currentUser) return <div>로그인이 필요합니다.</div>;

  const likedIds = likes
    .filter((l) => l.userId === currentUser.id)
    .map((l) => l.reviewId);

  const likedReviews = reviews
    .filter((r) => likedIds.includes(r.id))
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const totalPages = Math.ceil(likedReviews.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const pagedReviews = likedReviews.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div>
      <h2>내가 좋아요 누른 게시글 전체</h2>

      {pagedReviews.length === 0 ? (
        <p>좋아요한 게시글이 없습니다.</p>
      ) : (
        pagedReviews.map((r) => (
          <div key={r.id} onClick={() => navigate(`/reviews/${r.id}`)}>
            <h4>{r.title}</h4>
            <p>{r.genre} | 평점 {r.rating} | 좋아요 {r.likes}</p>
            <p>{r.createdAt}</p>
          </div>
        ))
      )}

      <div>
        <button
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={currentPage === 1}
        >
          이전
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button key={page} onClick={() => setCurrentPage(page)}>
            {page}
          </button>
        ))}

        <button
          onClick={() => setCurrentPage((p) => Math.min(totalPages || 1, p + 1))}
          disabled={currentPage === totalPages || totalPages === 0}
        >
          다음
        </button>
      </div>
    </div>
  );
};

export default MyLikedReviewsPage;
