import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
//로컬스토리지 들어와야 할부분

const ReviewListPage = () => {
    const navigator=useNavigate();
    const [choiceGenre, setChoiceGenre]=useState('전체');
    const [reviews,setReviews]=useLocalStorage('reviews',[]);
    const { currentUser } = useAuth();
    useEffect(()=>{
        if(!currentUser){
            alert('로그인이 필요합니다.')
            navigator('/login')
        }
    },[currentUser, navigator])
    const category=['전체','액션','공포','코미디','로맨스','SF']
    const select= choiceGenre==='전체' ? reviews : reviews.filter(review=>review.genre===choiceGenre)
    
  return (
    <div>ReviewListPage</div>
  )
}

export default ReviewListPage