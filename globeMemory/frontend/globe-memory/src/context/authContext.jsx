import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie"

export const AuthContext = createContext(); 

export const AuthProvider = ({ children }) => {

  const [token, setToken] = useState(null);

  const createCookie = (data) => {
    console.log(`deunsLog : `, data)
    setToken(data)
    Cookies.set('GLOBEMEMORY_USER', data)
  }

  const deleteCookie = () => {
    Cookies.remove('GLOBEMEMORY_USER')
  }

  const getCookie = () => {
    const cookie = Cookies.get('GLOBEMEMORY_USER');
    console.log(`cookie : `, cookie)
    setToken(cookie);
    return cookie;
  }

  useEffect(() => {
    getCookie()
    console.log(`call getCookie`, )
  }, [token])

  return (
    <AuthContext.Provider value={{ token, createCookie, getCookie, deleteCookie }}>
        {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);