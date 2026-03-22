import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/AuthContextPro';

const LogoutBtn = () => {

    const {logout} = useAuth();

    const navigator = useNavigate()

    const clickbtn = ()=>{
    const ok = confirm("정말 로그아웃 하시겠습니까??")
    if(ok){
      logout()
      navigator("/")
    }
  }
    return (
        <>
            <button onClick={()=>clickbtn()} className='mx-5 px-3 py-1 border border-gray-400 hover:bg-red-300 rounded-lg'>로그아웃</button>
        </>
    );
};

export default LogoutBtn;