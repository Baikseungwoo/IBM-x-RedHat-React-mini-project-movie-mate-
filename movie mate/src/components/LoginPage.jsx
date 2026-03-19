import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/AuthContextPro';

const LoginPage = () => {

    const {login} = useAuth();
    const [id, setId]= useState("")
    const [pw, setPw]= useState("")

    const navigator = useNavigate();

    const goSignUp = ()=>{
        navigator('/signup')
    }

    const submit=(e)=>{
        e.preventDefault();
        if(login({id,pw})){

            alert("로그인에 성공했습니다!!")

            setId("")
            setPw("")

            navigator("/")

        }
    }



    return (
        <div>
            <h1>로그인 페이지</h1>
            <form onSubmit={submit}>
                ID: <input type='text' placeholder='ID 입력' value={id} onChange={(e)=> setId(e.target.value)}/><br></br>
                Password: <input type='password' placeholder='Password 입력' value={pw} onChange={(e)=> setPw(e.target.value)}/><br></br>
                <button type='submit'>로그인</button>
            </form>
            <div>
                <p>혹시 회원이 아니신가요??</p>
                <span>{"-->"} </span>
                <button onClick={goSignUp}>회원가입</button>
            </div>
        </div>
    );
};

export default LoginPage;