import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/AuthContextPro';
import { useLocalStorage } from '../hooks/useLocalStorage'

const ReviewListPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 10;
    const navigator=useNavigate();
    const [choiceGenre, setChoiceGenre]=useState('전체');
    const [reviews,setReviews]=useLocalStorage('reviews',[]);
    const { currentUser } = useAuth();
    const category=['전체','액션','공포','코미디','로맨스','SF']
    const select= choiceGenre==='전체' ? reviews : reviews.filter(review=>review.genre===choiceGenre)
    const totalPages = Math.ceil(select.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const pagedReviews = select.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  return (
    <div className="space-y-6">
        <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-stone-800">
                영화 리뷰
            </h2>

            <button
                onClick={() => navigator(`/reviews/new`)}
                className="rounded-xl bg-amber-500 px-5 py-2 text-white shadow-md transition duration-200 hover:bg-amber-600 hover:shadow-lg"
            >
                리뷰쓰기
            </button>
        </div>

        <div className="rounded-2xl border border-amber-100 bg-white/80 p-4 shadow-md">
            <div className="flex flex-wrap gap-2">
            {category.map((clickgenre) => (
                <button
                key={clickgenre}
                onClick={() => {
                    setChoiceGenre(clickgenre);
                    setCurrentPage(1);
                }}
                className={`rounded-lg border px-3 py-1 text-sm transition duration-200
                    ${
                    choiceGenre === clickgenre
                        ? "border-amber-500 bg-amber-500 text-white shadow-sm"
                        : "border-gray-300 text-stone-700 hover:bg-amber-50 hover:border-amber-200"
                    }`}
                >
                {clickgenre}
                </button>
            ))}
            </div>
        </div>

        <div className="rounded-2xl border border-amber-100 bg-white/80 p-6 shadow-md space-y-4">
            {pagedReviews.length > 0 ? (
            pagedReviews.map((clickreview) => (
                (currentUser) ? (
                    <div
                key={clickreview.id}
                onClick={() => navigator(`/reviews/${clickreview.id}`)}
                className="group cursor-pointer rounded-2xl border border-gray-200 bg-white px-5 py-4 transition duration-200 hover:-translate-y-0.5 hover:border-amber-200 hover:bg-amber-50/60 hover:shadow-md"
                >
                <div className="mb-2 flex items-start justify-between gap-3">
                    <h3 className="text-lg font-semibold text-stone-800 group-hover:text-amber-700">
                    {clickreview.title}
                    </h3>
                    <span className="rounded-full bg-amber-100 px-2.5 py-1 text-xs font-medium text-amber-700">
                    {clickreview.genre}
                    </span>
                </div>

                <p className="mt-1 text-sm text-stone-600">
                    평점 : <span className="font-medium text-stone-700">{clickreview.rating}</span>
                </p>

                <div className="mt-3 flex items-center justify-between">
                    <p className="text-sm text-stone-500">
                    작성자 : {clickreview.writerId} ({clickreview.writerMbti})
                    </p>

                    <span className="text-sm font-medium text-amber-600">
                    👍 {clickreview.likes}
                    </span>
                </div>
                </div>
                ):(
                    <div
                key={clickreview.id}
                onClick={() => {
                    alert("로그인후 내용을 확인하실 수 있습니다.")
                    navigator('/login')
                }}
                className="group cursor-pointer rounded-2xl border border-gray-200 bg-white px-5 py-4 transition duration-200 hover:-translate-y-0.5 hover:border-amber-200 hover:bg-amber-50/60 hover:shadow-md"
                >
                <div className="mb-2 flex items-start justify-between gap-3">
                    <h3 className="text-lg font-semibold text-stone-800 group-hover:text-amber-700">
                    {clickreview.title}
                    </h3>
                    <span className="rounded-full bg-amber-100 px-2.5 py-1 text-xs font-medium text-amber-700">
                    {clickreview.genre}
                    </span>
                </div>

                <p className="mt-1 text-sm text-stone-600">
                    평점 : <span className="font-medium text-stone-700">{clickreview.rating}</span>
                </p>

                <div className="mt-3 flex items-center justify-between">
                    <p className="text-sm text-stone-500">
                    작성자 : {clickreview.writerId} ({clickreview.writerMbti})
                    </p>

                    <span className="text-sm font-medium text-amber-600">
                    👍 {clickreview.likes}
                    </span>
                </div>
                </div>
                )
            ))
            ) : (
            <p className="text-center text-stone-500">
                등록된 리뷰가 없습니다.
            </p>
            )}
        </div>

        {/* 페이지네이션 스타일 */}
        <div className="flex items-center justify-center gap-2 pt-2">
            <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm text-stone-700 transition duration-200 hover:bg-amber-50 disabled:cursor-not-allowed disabled:opacity-40"
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
                    ? "bg-amber-500 text-white shadow-sm"
                    : "border border-gray-300 text-stone-700 hover:bg-amber-50"
                }`}
            >
                {page}
            </button>
            ))}

            <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages || 1, p + 1))}
            disabled={currentPage === totalPages || totalPages === 0}
            className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm text-stone-700 transition duration-200 hover:bg-amber-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
            다음
            </button>
        </div>
        </div>
    );
}

export default ReviewListPage