import react, { useEffect, useState } from "react"
import "./home.css"
import { ReactComponent as MySvg} from '../assets/globeMemory_colored.svg'
import {ReactComponent as SVGarrowBack} from '../assets/arrowBack.svg'
import FormInput from "../components/formInput"
import ButtonInput from "../components/buttonInput"
import { useDisplayMessage } from "../context/displayMessageContext"
import { useAuth } from "../context/authContext"

function HomeComponent() {

  const[display, setDisplay] = useState(0);
  const[formData, setFormData] = useState({
    email:"",
    password:""
  })

  const { showMessage } = useDisplayMessage();
  const { createCookie } = useAuth()

  const signIn = (e) => {
    e.preventDefault();
    console.log(`deunsLog cookie : `, new FormData(e.target))
    fetch(process.env.REACT_APP_API_URL + '/user/sign-in',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "email" : formData.email,
          "password" : formData.password
        })
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
      showMessage(data.message);
      createCookie(data.token);
    })
    .catch(err => console.log(`deunsLog : `, err))
  }

  const signUp = (e) => {
    e.preventDefault();

    console.log(formData);
    const checkLastName = (formData.last_name.length > 2) && (formData.last_name !== "" || null);
    const checkFirstName = (formData.first_name.length > 2) && (formData.first_name !== "" || null);
    const checkEmail = formData.email.length > 6 && formData.email.includes("@");
    const checkPassword = (formData.password.length > 4) && (formData.password !== "" || null);

    if(!checkLastName){
      return showMessage('Veuillez renseigner un nom correct')
    }
    else if(!checkFirstName){
      return showMessage('Veuillez renseigner un prénom correct')
    }
    else if(!checkEmail){
      return showMessage('Veuillez renseigner un email correct')
    }
    else if(!checkPassword){
      return showMessage('Veuillez renseigner un mot de passe correct')
    }
    console.log(`deunsLog : `, new FormData(e.target))
    fetch(process.env.REACT_APP_API_URL+'/user/sign-up',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "last_name": formData.last_name,
          "first_name": formData.first_name,
          "email" : formData.email,
          "password" : formData.password
        })
    })
    .then((res) => {
      console.log(`res : `, res); 
      if(res.status === 201){
        setDisplay(1)
        return res.json();
      }
    })
    .then((data) => {
      console.log(`data : `, data)
      showMessage(data.message);
    })
    .catch(err => console.log(`deunsLog : `, err))
  }

  return(
  <div className="grid grid-rows-[200px,1fr] h-screen relative">
    <div className="background-div">
    <div className="grid grid-rows-2 h-full place-items-center">
      <div className="w-[100px] h-[100px]">
        <MySvg />
      </div>
      <h1 className="font-bold text-primary z-10">Globe Memory</h1>
    </div>
    <div className="background-degraded"></div>
    </div>
    <div className="bg-white rounded-xl relative top-[-10px]">
    {display === 0 ? 
      <div className="w-[90%] m-auto grid grid-rows-[1fr,50px,1fr] h-full place-items-center">
        <p className="text-center">Bienvenue sur Globe Memory, <br /> veuillez vous connecter pour continuer</p>
        <button
        className="bg-primary w-full p-2 rounded-md"
        onClick={() => {
          console.log("ok")
          setDisplay(1);
        }}
        >Se connecter</button>
        <button
        className="text-primary"
        onClick={() => {
          setDisplay(2);
        }}
        >Vous n'avez pas de compte ? <br /> Cliquez ici pour vous inscrire</button>
      </div>
    :
      display === 1 ?
      <div className="w-[90%] m-auto">
        <div className="flex place-items-center justify-between">
          <div className="w-[15px] my-2" onClick={() => {
            setDisplay(0)
          }}>
            <SVGarrowBack />
          </div>
          <p>Se connecter</p>
          <div  className="w-[15px] my-2"></div>
        </div>

        <form action="" onSubmit={signIn}>
          <FormInput name={"email"} data={{formData, setFormData}} type={"text"}/>
          <FormInput name={"password"} data={{formData, setFormData}} type={"password"}/>
          <ButtonInput content={"Se connecter"}/>
        </form>
      </div>
    :
    display === 2 ?
      <div className="w-[90%] m-auto">
        <div className="flex place-items-center justify-between">
          <div className="w-[15px] my-2" onClick={() => {
            setDisplay(0)
          }}>
            <SVGarrowBack />
          </div>
          <p>S'inscrire</p>
          <div  className="w-[15px] my-2"></div>
        </div>

        <form action="" onSubmit={signUp}>
          <FormInput name={"last_name"} data={{formData, setFormData}} type={"text"}/>
          <FormInput name={"first_name"} data={{formData, setFormData}} type={"text"}/>
          <FormInput name={"email"} data={{formData, setFormData}} type={"text"}/>
          <FormInput name={"password"} data={{formData, setFormData}} type={"password"}/>
          <ButtonInput content={"S'inscrire"}/>
        </form>
      </div>
    :
      <></>  
    }
    </div>
  </div>
  )
}

export default HomeComponent;