import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

const AuthContextPro = ({ children }) => {

  const [users, setUsers] = useState(
      JSON.parse(localStorage.getItem('users')) || []
  );

  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem('currentUser') || null)
  );

  const signup = (newUser) => {


    const nextUsers = [...users, newUser];
    setUsers(nextUsers);
    localStorage.setItem('users', JSON.stringify(nextUsers));
  };

  const login = ({ id, pw }) => {
    const foundUser = users.find((user) => user.id === id && user.pw === pw);
    if (!foundUser) {
      alert('사용자를 찾을 수 없습니다.')
    }else{
      return true
    }

    setCurrentUser(foundUser);
    localStorage.setItem('currentUser', JSON.stringify(foundUser));
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