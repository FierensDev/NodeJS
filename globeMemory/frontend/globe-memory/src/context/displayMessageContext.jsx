import { createContext, useContext, useState } from "react";

export const DisplayMessageContext = createContext(); 

export const DisplayMessageProvider = ({ children }) => {
    const [message, setMessage] = useState(null);

    const showMessage = (msg) => {
        setMessage(msg);
        setTimeout(() => {
            setMessage(null);
        }, 3000);
    };

    return (
      <DisplayMessageContext.Provider value={{ message, showMessage }}>
          {children}
      </DisplayMessageContext.Provider>
    );
};

export const useDisplayMessage = () => useContext(DisplayMessageContext);