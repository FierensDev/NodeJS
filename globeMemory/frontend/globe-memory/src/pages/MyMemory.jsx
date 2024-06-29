import React, { useEffect, useState } from "react"
import { ReactComponent as MagnifyingGlassSvg } from '../assets/magnifyingGlass.svg'
import { ReactComponent as DoubleArrowSvg } from '../assets/doubleArrow.svg'
import { useAuth } from "../context/authContext";
import { redirect } from "react-router-dom";
import BoardDisplay from "../components/boardDisplay";

const MyMemoryComponent = (props) => {
  const { userToken, deleteCookie } = useAuth();

  const [boards, setBoards] = useState([])

  useEffect(()=>{
    fetch(process.env.REACT_APP_API_URL + '/board/getByUserId',
      {
        method: 'GET',
        headers: {
          'Authorization':`Bearer ${userToken}`,
          'Content-Type': 'application/json'
        },
      }
    )
    .then((res) => {
      console.log(`res : `, res); 
      if(res.status === 401){
        deleteCookie()
        return redirect("/");
      } 
      if(res.status == 404){
        return res.json()
        .then(data => {
          throw new Error(data)
        })
      }
      return res.json();
    })
    .then((data) =>{
      console.log(`data : `, data)
      setBoards(data);
    })
    .catch(err => console.log(`deunsLog : `, err))
  },[])

  return (
    <div className="w-[95%] mx-auto mt-4">
      <div className="flex place-items-center justify-between">
        <div className='bg-primary h-[30px] w-[30px] rounded-full flex place-items-center justify-center text-white'><strong>D</strong></div>
        <p>Boards</p>
        <div className="w-[30px]"></div>
      </div>
      
      <div className="grid grid-cols-[1fr,55px]">
        <div className="bg-secondary w-[100%] h-[34px] rounded-full my-4 grid grid-cols-[40px,1fr]">
          <label htmlFor="boards" className="w-[20px] bg-transparent m-auto">
            <MagnifyingGlassSvg />
          </label>
          <div className="">
            <input type="text" id="boards" className="w-full h-full bg-transparent focus:outline-none"/>
          </div>
        </div>
        <div className="w-[23px] m-auto">
          <DoubleArrowSvg />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        
          {boards.map((board, index) => (
            <BoardDisplay key={index} data={board}/>
          ))}
        
      </div>
    </div>
  )
};

export default MyMemoryComponent;
