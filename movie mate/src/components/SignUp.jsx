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
        <div className="flex items-center justify-center py-10">
            <div className="w-full max-w-xl rounded-3xl bg-white/80 p-8 shadow-lg">
                <h1 className="mb-6 text-3xl font-bold text-stone-800">회원가입</h1>

                <form onSubmit={sub} className="space-y-4">

                <div>
                    <label className="mb-1 block text-sm font-medium text-stone-700">
                    ID <span className='text-red-600 font-bold'>*</span>
                    </label>
                    <div className="flex gap-2">
                    <input placeholder="ID 입력" value={id} onChange={(e) => setId(e.target.value)}
                        className="flex-1 rounded-xl border border-stone-300 px-4 py-3 outline-none transition duration-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200"/>
                    <button type="button" onClick={check} className="rounded-xl border border-amber-500 px-4 py-2 text-amber-600 hover:bg-amber-50 transition">
                        중복확인
                    </button>
                    </div>
                </div>


                <div>
                    <label className="mb-1 block text-sm font-medium text-stone-700">
                    Password <span className='text-red-600 font-bold'>*</span>
                    </label>
                    <input type="password" placeholder="Password 입력" value={pw} onChange={(e) => setPw(e.target.value)}
                        className="w-full rounded-xl border border-stone-300 px-4 py-3 outline-none transition duration-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200"/>
                </div>


                <div>
                    <label className="mb-1 block text-sm font-medium text-stone-700">
                    나이
                    </label>
                    <input placeholder="나이 입력" value={age} onChange={(e) => setAge(e.target.value)}
                        className="w-full rounded-xl border border-stone-300 px-4 py-3 outline-none transition duration-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200"/>
                </div>


                <div>
                    <label className="mb-1 block text-sm font-medium text-stone-700">
                    Email
                    </label>
                    <input placeholder="Email 입력" value={email} onChange={(e) => setEmail(e.target.value)}
                        className="w-full rounded-xl border border-stone-300 px-4 py-3 outline-none transition duration-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200"/>
                </div>


                <div>
                    <label className="mb-1 block text-sm font-medium text-stone-700">
                    MBTI <span className='text-red-600 font-bold'>*</span>
                    </label>
                    <input placeholder="MBTI 입력" value={mbti} onChange={(e) => setMbti(e.target.value.toUpperCase())}
                        className="w-full rounded-xl border border-stone-300 px-4 py-3 uppercase outline-none transition duration-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200"/>
                </div>


                <button type="submit" className="w-full rounded-xl bg-amber-500 px-4 py-3 font-semibold text-white shadow-md transition duration-200 hover:bg-amber-600 hover:shadow-lg">
                    회원가입
                </button>
                </form>
            </div>
        </div>
    );
};

export default SignUp;