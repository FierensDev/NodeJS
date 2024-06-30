import React, { useEffect, useState } from "react"
import { useAuth } from "../context/authContext";
import { useDisplayMessage } from "../context/displayMessageContext";
import ArrayAccountDelete from "../components/arrayAccountDelete";

const AccountComponent = (props) => {

  const { userToken,deleteCookie} = useAuth();
  const { showMessage } = useDisplayMessage();
  const [newPassword, setNewPassword] = useState(null)

  const [boards, setBoards] = useState([])
  const [userData, setUserData] = useState({})


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
      if(res.status == 404){
        return res.json()
        .then(data => {
          throw new Error(data)
        })
      }
      return res.json();
    })
    .then((data) =>{
      // console.log(`data : `, data)
      setBoards(data);
    })
    .catch(err => console.log(`deunsLog : `, err))
  },[showMessage])

  const modifyUser = (e) => {
    e.preventDefault();

    const checkLastName = ( userData.last_name.length > 2) && ( userData.last_name !== "" || null);
    const checkFirstName = ( userData.first_name.length > 2) && ( userData.first_name !== "" || null);
    const checkEmail =  userData.email.length > 6 &&  userData.email.includes("@");
    const checkPassword = newPassword === "" || newPassword === null || newPassword.length < 3;

    console.log(typeof(newPassword));
    console.log(checkPassword);

    if(!checkLastName){
      return showMessage('Veuillez renseigner un nom correct')
    }
    else if(!checkFirstName){
      return showMessage('Veuillez renseigner un prénom correct')
    }
    else if(!checkEmail){
      return showMessage('Veuillez renseigner un email correct')
    }
    else if(checkPassword){
      return showMessage('Veuillez renseigner un mot de passe correct')
    }

    const objectToSend = newPassword !== null || '' ? 
    {
      'email': userData.email,
      'last_name': userData.last_name,
      'first_name': userData.first_name,
      'password': newPassword
    } 
    :
    {
      'email': userData.email,
      'last_name': userData.last_name,
      'first_name': userData.first_name,
    }
    console.log(`passwordToSend : `, objectToSend)
    fetch(process.env.REACT_APP_API_URL + '/user/update', {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${userToken}`,
        'Content-Type': 'application/json'
      },
      body:JSON.stringify(objectToSend)
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
      console.log(`data : `, data)
      showMessage(data.message);
    })
    .catch(err => console.log(`deunsLog : `, err))
  }

  return (
    <div className="w-[90%] mx-auto">
       {userData && userData.last_name && userData.last_name.length > 1 ?
        <div className="mx-auto my-8 h-[100px] w-[100px] bg-primary rounded-full flex place-items-center justify-center text-[3rem] text-center text-white">{userData.last_name[0]}{userData.first_name[0]}</div>
        :
        <></>
      }
      <form className="grid grid-cols-2 gap-3" onSubmit={modifyUser}>
        <div className="flex flex-col">
          <label htmlFor="last_name">Nom</label>
          <input type="text" id="last_name" placeholder={'Doe'} className="placeholder-gray-300 font-semibold"
            value={userData.last_name ? userData.last_name : null}
            onChange={(e)=>{
              setUserData({...userData, last_name:e.target.value})
              console.log(`deunsLog : `, userData)
            }}
          />
        </div>

        
        <div className="flex flex-col"> 
          <label htmlFor="first_name">Prénom</label>
          <input type="text" id="first_name" placeholder={'Doe'} className="placeholder-gray-300 font-semibold"
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
            onChange={(e)=>{
              setUserData({...userData, email:e.target.value})
              console.log(`deunsLog : `, userData)
            }}
          />
        </div>

        <div className="col-span-2 flex flex-col">
          <label htmlFor="password">Mot de passe</label>
          <input type="password" id="password"  className="placeholder-gray-300 font-bold"
           value={newPassword === null ? '***' : newPassword}
           onChange={(e)=>{
              setNewPassword(e.target.value)
              // setUserData({...userData, password:e.target.value})
              console.log(`newPassword : `, newPassword)
            }}
          />
        </div>
            
        <button className="bg-primary rounded-md grid col-span-2 m-auto p-1 px-3">Modifier</button> 
        <div 
        className="bg-primary rounded-md text-center p-1 col-span-2 w-fit m-auto mb-4"
        onClick={() => {
          deleteCookie('GLOBEMEMORY_USER')
          window.location.reload()
        }}
      >Déconnexion</div>
      </form>

      <div className="my-7">
        <p>Vos tableaux</p>

        {boards.length > 0 ? 
        <>
        {boards.map((board, index) => (
          <ArrayAccountDelete key={index} board={board}/>
        ))}
        </>
        :
        <p>Vous n'avez aucun tableau</p>}
      </div>
    </div>
  )
};

export default AccountComponent;
