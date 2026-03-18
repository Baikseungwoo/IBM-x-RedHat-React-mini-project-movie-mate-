import React from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {

    const navigator = useNavigate();

    const goSignUp = ()=>{
        navigator('/signup')
    }

    

    return (
        <div>
            <h1>로그인 페이지</h1>

            <div>
                <p>혹시 회원이 아니신가요??</p>
                <span>{"-->"} </span>
                <button onClick={goSignUp}>회원가입</button>
            </div>
        </div>
    );
};

export default LoginPage;