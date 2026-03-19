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
        <div className="flex items-center justify-center py-10">
  <div className="w-full max-w-xl rounded-3xl bg-white/80 p-8 shadow-lg">
    <h1 className="mb-6 text-3xl font-bold text-stone-800">로그인</h1>

    <form onSubmit={submit} className="space-y-4">
      <div>
        <label className="mb-1 block text-sm font-medium text-stone-700">
          ID
        </label>
        <input type="text" placeholder="ID 입력" value={id} onChange={(e) => setId(e.target.value)}
          className="w-full rounded-xl border border-stone-300 px-4 py-3 outline-none transition duration-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200"/>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-stone-700">
          Password
        </label>
        <input type="password" placeholder="Password 입력" value={pw} onChange={(e) => setPw(e.target.value)}
          className="w-full rounded-xl border border-stone-300 px-4 py-3 outline-none transition duration-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200"/>
      </div>

      <button type="submit" className="w-full rounded-xl bg-amber-500 px-4 py-3 font-semibold text-white shadow-md transition duration-200 hover:bg-amber-600 hover:shadow-lg">
        로그인
      </button>
    </form>

    <div className="mt-6 border-t border-stone-200 pt-5 text-center">
      <p className="mb-3 text-sm text-stone-600">혹시 회원이 아니신가요?</p>
      <button
        onClick={goSignUp}
        className="rounded-xl border border-amber-500 px-5 py-2 font-medium text-amber-600 transition duration-200 hover:bg-amber-50"
      >
        회원가입
      </button>
    </div>
  </div>
</div>
    );
};

export default LoginPage;