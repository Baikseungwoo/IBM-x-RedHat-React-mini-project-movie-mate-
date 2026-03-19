import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

const AuthContextPro = ({ children }) => {


  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem('currentUser') || null)
  );

  const signup = (newUser) => {

    const users = JSON.parse(localStorage.getItem('users')) || []

    const nextUsers = [...users, newUser];
    localStorage.setItem('users', JSON.stringify(nextUsers));
  };

  const login = ({ id, pw }) => {
    const users = JSON.parse(localStorage.getItem('users')) || []

    const foundUser = users.find((user) => user.id === id && user.pw === pw);
    if (!foundUser) {
      alert('사용자를 찾을 수 없습니다. 아이디와 비밀번호를 확인해주세요!')
      return false
    }else{
      setCurrentUser(foundUser);
      localStorage.setItem('currentUser', JSON.stringify(foundUser));
      return true
    }
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
  };

  return (
    <AuthContext.Provider value={{ currentUser, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => useContext(AuthContext);

export default AuthContextPro;