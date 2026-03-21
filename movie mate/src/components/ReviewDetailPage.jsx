import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../hooks/AuthContextPro';
import { useLocalStorage } from '../hooks/useLocalStorage';

const ReviewDetailPage = () => {
    const{id}=useParams();
    const navigator=useNavigate();
    const {currentUser}=useAuth();
    const [reviews,setReviews]=useLocalStorage('reviews',[]);
    const [wishlist,setWishlist]=useLocalStorage('like',[]);
    const reviewData=reviews.find(item=>item.id===parseInt(id))
    useEffect(()=>{
            if(!currentUser){
                alert('로그인이 필요합니다.')
                navigator('/login')
            }
        },[currentUser, navigator])
    const zzimbtn = () => {        
        const alreadyZzim = wishlist.some(zzimdata => 
            zzimdata.userId === currentUser.id && zzimdata.reviewId === reviewData.id
        );

        if (alreadyZzim) {
            alert('이미 찜한 영화입니다.');
        } else {            
            const newzzim = {
                id: Date.now(),
                userId: currentUser.id, 
                reviewId: reviewData.id 
            };
            setWishlist([...wishlist, newzzim]);
            
            const reviewData2 = reviews.map(item2 => 
                item2.id === reviewData.id ? { ...item2, likes:item2.likes + 1 } : item2
            );
            setReviews(reviewData2);

            alert('찜 목록에 추가되었습니다!'); 
        }
    };
     if (!reviewData) return <div>리뷰를 불러오고 있습니다.</div>
    return (
        <div className="max-w-3xl mx-auto space-y-6">


            <div className="rounded-3xl bg-white/90 p-8 shadow-xl border border-amber-100">


                <h1 className="text-3xl font-bold text-stone-800 mb-3">
                {reviewData.title}
                </h1>


                <div className="flex items-center gap-2 text-sm text-stone-500 mb-4">
                <span>작성자 :</span>
                <span className="font-medium text-stone-700">{reviewData.writerId}</span>
                <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-700 text-xs font-semibold">
                    {reviewData.writerMbti}
                </span>
                </div>

                <div className="flex items-center gap-4 text-sm mb-6">
                <span className="px-3 py-1 rounded-full bg-gray-100 text-stone-700">
                    🎬 {reviewData.genre}
                </span>

                <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 font-medium">
                    ⭐ {reviewData.rating}
                </span>
                </div>

                <div className="text-stone-700 leading-relaxed text-base border-t border-gray-200 pt-6">
                {reviewData.content}
                </div>


                <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">

                <span className="text-sm text-stone-600">
                    ♥️ <span className="font-semibold text-amber-600">{reviewData.likes}</span>
                </span>

                <button
                    onClick={zzimbtn}
                    className="px-5 py-2 rounded-xl bg-amber-500 text-white shadow-md hover:bg-amber-600 hover:shadow-lg transition duration-200"
                >
                    좋아요 + 찜
                </button>

                </div>
            </div>


            <div className="flex justify-end">
                <button
                onClick={() => navigator('/reviews')}
                className="px-4 py-2 rounded-xl border border-gray-300 text-stone-700 hover:bg-gray-100 transition duration-200"
                >
                목록으로
                </button>
            </div>

            </div>
    );
};

export default ReviewDetailPage;