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
    <div className="max-w-4xl mx-auto space-y-6">

      {/* 제목 */}
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-stone-800">
          내가 좋아요 누른 게시글 전체
        </h2>

        <span className="rounded-full bg-pink-100 px-3 py-1 text-sm font-semibold text-pink-700">
          총 {likedReviews.length}개
        </span>
      </div>

      {/* 리스트 */}
      <div className="rounded-3xl border border-amber-100 bg-white/90 p-6 shadow-xl">
        {pagedReviews.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-base text-stone-500">
              좋아요한 게시글이 없습니다.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {pagedReviews.map((r) => (
              <div
                key={r.id}
                onClick={() => navigate(`/reviews/${r.id}`)}
                className="group cursor-pointer rounded-2xl border border-gray-200 bg-white px-5 py-4 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-pink-200 hover:bg-pink-50/50 hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-4">
                  
                  {/* 왼쪽 */}
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-stone-800 group-hover:text-pink-700">
                      {r.title}
                    </h4>

                    <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-stone-600">
                      <span className="rounded-full bg-amber-100 px-2.5 py-1 text-xs font-medium text-amber-700">
                        🎬 {r.genre}
                      </span>

                      <span className="rounded-full bg-yellow-100 px-2.5 py-1 text-xs font-medium text-yellow-700">
                        ⭐ 평점: {r.rating}
                      </span>

                      <span className="rounded-full bg-pink-100 px-2.5 py-1 text-xs font-medium text-pink-700">
                        ❤️ {r.likes}
                      </span>
                    </div>
                  </div>

                  {/* 오른쪽 날짜 */}
                  <div className="shrink-0 text-sm text-stone-400">
                    {r.createdAt}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 페이지네이션 */}
      <div className="flex items-center justify-center gap-2 pt-2">
        <button
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={currentPage === 1}
          className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm text-stone-700 transition duration-200 hover:bg-pink-50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          이전
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`rounded-lg px-3 py-1.5 text-sm font-medium transition duration-200
              ${
                currentPage === page
                  ? "bg-pink-500 text-white shadow-sm"
                  : "border border-gray-300 text-stone-700 hover:bg-pink-50"
              }`}
          >
            {page}
          </button>
        ))}

        <button
          onClick={() => setCurrentPage((p) => Math.min(totalPages || 1, p + 1))}
          disabled={currentPage === totalPages || totalPages === 0}
          className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm text-stone-700 transition duration-200 hover:bg-pink-50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          다음
        </button>
      </div>
    </div>
  );
};

export default MyLikedReviewsPage;
