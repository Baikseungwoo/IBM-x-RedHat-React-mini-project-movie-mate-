import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/AuthContextPro';
import { useLocalStorage } from '../hooks/useLocalStorage'

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
    <div>
      <h2>영화 리뷰</h2>
      <div>
        {category.map(clickgenre=>(
          <button key={clickgenre} onClick={()=>setChoiceGenre(clickgenre)}>
            {clickgenre}
          </button>
        ))}
      </div>
      <div>
      {select.length > 0 ?
      (select.map(clickreview=> (<div key={clickreview.id} onClick={()=>navigator(`/reviews/${clickreview.id}`)}>
        <h3>{clickreview.title}</h3>
        <p>장르 : {clickreview.genre} 평점 : {clickreview.rating}</p>
        <p>작성자 : {clickreview.writerId} ({clickreview.writerMbti})</p>
        <span>좋아요 : {clickreview.likes}</span>
        </div>))):
        (<p>등록된 리뷰가 없습니다.</p>)}
      </div>
      <button onClick={()=>navigator(`/reviews/new`)}>
        리뷰쓰기
      </button>
      </div>
  )
}

export default ReviewListPage