import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie"

export const AuthContext = createContext(); 

export const AuthProvider = ({ children }) => {

  const [userToken, setToken] = useState(null);

  const createCookie = (data) => {
    setToken(data)
    Cookies.set('GLOBEMEMORY_USER', data)
  }

  const deleteCookie = () => {
    Cookies.remove('GLOBEMEMORY_USER')
  }

  const getCookie = () => {
    const cookie = Cookies.get('GLOBEMEMORY_USER');
    setToken(cookie);
    return cookie;
  }

  useEffect(() => {
    getCookie()
    console.log(`call getCookie`)
  }, [])

  return (
    <AuthContext.Provider value={{ userToken, createCookie, getCookie, deleteCookie }}>
        {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);