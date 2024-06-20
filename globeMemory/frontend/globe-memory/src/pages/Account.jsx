import React, { useEffect, useState } from "react"
import { ReactComponent as MyCrossSvg } from '../assets/cross.svg'
import { useAuth } from "../context/authContext";
import { useDisplayMessage } from "../context/displayMessageContext";
const AccountComponent = (props) => {

  const { userToken } = useAuth();
  const { showMessage } = useDisplayMessage();

  const [boards, setBoards] = useState([])
  const [userData, setUserData] = useState({})

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

  },[showMessage])

  useEffect(() => {
    fetch(process.env.REACT_APP_API_URL + '/user/getByToken',
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
      setUserData(data);
    })
    .catch(err => console.log(`deunsLog : `, err))
  }, [])

  const deleteBoard = (id) => {
    fetch(process.env.REACT_APP_API_URL + `/board/delete/${id}`,{
      method:'DELETE',
    })
    .then(res => res.json())
    .then(data => {
      console.log(`deunsLog : `, data)
      showMessage(data.message)
    })
    .catch(err => console.log(`deunsLog : `, err))
  }

  const modifyUser = (e) => {
    e.preventDefault();
    console.log(`deunsLog : `,userData)

    fetch(process.env.REACT_APP_API_URL + '/user/update', {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${userToken}`,
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({
        'last_name': userData.last_name,
        'first_name': userData.first_name,
        'password': userData.password
      })
    })
    .then((res) => {
      if(res.status == 404){
        return res.json()
        .then(data => {
          throw new Error(data)
        })
      }
      return res.json();
    })
    .then((data) =>{
      console.log(`data : `, data.message)
      showMessage(data.message);
    })
    .catch(err => console.log(`deunsLog : `, err))
  }

  return (
    <div className="w-[90%] mx-auto">
      <div className="mx-auto my-8 h-[100px] w-[100px] bg-primary rounded-full flex place-items-center justify-center text-[3rem] text-center text-white">D</div>
      <form className="grid grid-cols-2 gap-3" onSubmit={modifyUser}>
        <div className="flex flex-col">
          <label htmlFor="last_name">Nom</label>
          <input type="text" id="last_name" placeholder={'Doe'} className="placeholder-gray-300 font-bold"
            value={userData.last_name ? userData.last_name : null}
            onChange={(e)=>{
              setUserData({...userData, last_name:e.target.value})
              console.log(`deunsLog : `, userData)
            }}
          />
        </div>

        
        <div className="flex flex-col"> 
          <label htmlFor="first_name">Prénom</label>
          <input type="text" id="first_name" placeholder={'Doe'} className="placeholder-gray-300 font-bold"
               value={userData.first_name ? userData.first_name : null}
               onChange={(e)=>{
                setUserData({...userData, first_name:e.target.value})
                console.log(`deunsLog : `, userData)
              }}
          />
        </div>

        <div className="col-span-2 flex flex-col">
          <label htmlFor="email">Email</label>
          <input type="text" id="email"  className="placeholder-gray-300 font-bold"
            value={userData.email ? userData.email : null}
          />
        </div>

        <div className="col-span-2 flex flex-col">
          <label htmlFor="password">Mot de passe</label>
          <input type="password" id="password"  className="placeholder-gray-300 font-bold"
           value={userData.password ? userData.password : null}
           onChange={(e)=>{
            setUserData({...userData, password:e.target.value})
            console.log(`deunsLog : `, userData)
          }}
          />
        </div>

        <button className="bg-primary rounded-md grid col-span-2 m-auto p-1 px-3">Modifier</button>
      </form>

      <div className="my-7">
        <p>Vos tableaux</p>

        {boards ? 
        <>
        {boards.map((board, index) => (
          <div className="my-3 flex place-items-center">
             <div 
             onClick={()=>{
              console.log(`deunsLog : `, board._id)
              deleteBoard(board._id)
             }}
             className="text-primary w-[18px] origin-center rotate-45"><MyCrossSvg/></div>
            <div key={index}>
              <p className="font-semibold mx-2 mt-1">{board.name}</p>
              <p className="text-info text-[0.7rem] mx-2 mb-1">{board.image_link.length} photos</p>
            </div>
          </div>
          ))}
        </>
        :
        <></>}
      </div>
    </div>
  )
};

export default AccountComponent;
