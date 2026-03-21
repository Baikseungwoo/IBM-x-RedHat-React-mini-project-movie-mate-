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
        <div>
            <h1>{reviewData.title}</h1>
            <p>작성자 : {reviewData.writerId} {reviewData.writerMbti}</p>
            <p>장르 : {reviewData.genre}  평점 : {reviewData.rating}</p>
            <p>{reviewData.content}</p>
            <div>
                <span>좋아요! : {reviewData.likes}</span>
                <button onClick={zzimbtn}>좋아요!찜!</button>                
            </div>
            <button onClick={()=>navigator('/reviews')}>목록으로</button>
        </div>
    );
};

export default ReviewDetailPage;