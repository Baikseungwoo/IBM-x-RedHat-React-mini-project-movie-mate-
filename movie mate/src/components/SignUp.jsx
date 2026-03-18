import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/AuthContextPro';

const SignUp = () => {

    const {signup} = useAuth();

    const [idcheck, setIdcheck]= useState(false)

    const [id, setId]= useState("")
    const [pw, setPw]= useState("")
    const [mbti, setMbti]= useState("")
    const [age, setAge]= useState("")
    const [email, setEmail]= useState("")
    const navigator = useNavigate();
    const mbtiList = ["ISTJ", "ISFJ", "INFJ", "INTJ", "ISTP", "ISFP", "INFP", "INTP", "ESTP", "ESFP", "ENFP", "ENTP", "ESTJ", "ESFJ", "ENFJ", "ENTJ"]

    const check = ()=>{
        if(id){
            const users = JSON.parse(localStorage.getItem('users')) || []
            const exist = users.find((user)=> user.id === id)
            if(exist){
                alert('이미 사용중인 아이디 입니다.')
                setIdcheck(false)
            }else{
                alert('사용가능한 아이디 입니다.')
                setIdcheck(true)
            }
        }else{
            alert("아이디를 입력해주세요.")
        }

    }

    const sub = (e)=>{
        e.preventDefault()
        if(mbtiList.includes(mbti)){
            if(idcheck){
                const newUser = {
                    id,
                    pw,
                    age,
                    email,
                    mbti
                }

                signup(newUser)

                setId("")
                setPw("")
                setAge("")
                setEmail("")
                setMbti("")
                setIdcheck(false)
                alert('회원가입이 완료되었습니다!')

                navigator('/login')
            }else{
                alert('아이디 중복확인을 하십시오!')
            }
        }else{
            alert('mbti를 정확히 입력하세요!!')
        }

    }


    return (
        <div>
            <h1>회원가입</h1>
            <form onSubmit={sub}>
                ID: <input placeholder='ID 입력' value={id} onChange={(e)=> setId(e.target.value)}/>
                <button type="button" onClick={check}>중복확인</button><br></br>
                Password: <input type='password' placeholder='Password 입력' value={pw} onChange={(e)=> setPw(e.target.value)}/><br></br>
                나이: <input  placeholder='나이 입력' value={age} onChange={(e)=> setAge(e.target.value)}/><br></br>
                Email: <input  placeholder='Email 입력' value={email} onChange={(e)=> setEmail(e.target.value)}/><br></br>
                MBTI: <input  placeholder='MBTI 입력' value={mbti} onChange={(e)=> setMbti(e.target.value.toUpperCase())}/><br></br>
                <button type='submit'>회원가입</button>
            </form>
        </div>
    );
};

export default SignUp;