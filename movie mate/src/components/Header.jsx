import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {

    return (
        <div>
            <Link to='/'>메인</Link>&nbsp;&nbsp;
            <Link to='/reviews'>리뷰목록</Link>&nbsp;&nbsp;
            <Link to='/mypage'>마이페이지</Link>&nbsp;&nbsp;
            <Link to='login'>로그인(회원가입/로그아웃)</Link>&nbsp;&nbsp;
            <Link to='logout'>로그아웃</Link>&nbsp;&nbsp;
        </div>
    );
};

export default Header;