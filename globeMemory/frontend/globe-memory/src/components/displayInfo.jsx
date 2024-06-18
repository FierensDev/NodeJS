import React, { useEffect } from "react"
import { useDisplayMessage } from "../context/displayMessageContext";

const DisplayInfo = (props) => {

  const { message } = useDisplayMessage();

  return (
  <>
    {message ? 
    
    <div className="absolute z-50 top-2 left-0 right-0">
      <div className="w-[200px] m-auto text-center bg-secondary border border-primary rounded-md p-1 text">
        {message}
      </div>
    </div>
    :
    <></>
    }
  </>
  )
};

export default DisplayInfo;
