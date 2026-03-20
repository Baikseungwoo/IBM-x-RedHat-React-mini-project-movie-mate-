import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './../hooks/AuthContextPro';

const Header = () => {

    const {currentUser} = useAuth();
    

    return (
        <div className="w-full border-b border-amber-100 bg-white/60 backdrop-blur-sm">
            
            <div className="mx-auto flex max-w-6xl justify-center gap-10 px-6 py-3 text-sm font-semibold text-stone-700">
                
                <Link to='/' className="relative transition duration-200 hover:text-amber-600">
                    <span className='font-bold text-base'>🏠 </span> 홈
                </Link>

                <Link to='/reviews' className="relative transition duration-200 hover:text-amber-600">
                    <span className='font-bold text-base'>📜 </span> 리뷰목록
                </Link>

                {(currentUser)?(<Link to='/mypage' className="relative transition duration-200 hover:text-amber-600">
                    <span className='font-bold text-base'>🧑‍💼 </span> 마이페이지
                </Link>):(<></>)}

                {(!currentUser)?(<Link to='/login' className="relative transition duration-200 hover:text-amber-600">
                    <span className='font-bold text-base'>🔓 </span> 로그인(회원가입)
                </Link>):(<></>)}

            </div>

        </div>
    );
};

export default Header;