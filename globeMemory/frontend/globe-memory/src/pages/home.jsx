import react, { useState } from "react"
import "./home.css"
import { ReactComponent as MySvg} from '../assets/globeMemory_colored.svg'
import {ReactComponent as SVGarrowBack} from '../assets/arrowBack.svg'
import FormInput from "../components/formInput"
import ButtonInput from "../components/buttonInput"

function HomeComponent() {

  const[display, setDisplay] = useState(0);
  const[formData, setFormData] = useState({
    email:"",
    password:""
  })

  const signIn = (e) => {
    e.preventDefault();
    console.log(`deunsLog : `, new FormData(e.target))
    fetch('http://127.0.0.1:3000/user/sign-in',
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
      return res.json();
    })
    .then((data) => console.log(`data : `, data))
    .catch(err => console.log(`deunsLog : `, err))
  }

  const signUp = (e) => {
    e.preventDefault();
    console.log(`deunsLog : `, new FormData(e.target))
    fetch('http://127.0.0.1:3000/user/sign-up',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "email" : formData.email,
          "password" : formData.password
        })
    })
    .then((res) => {
      console.log(`res : `, res); 
      return res.json();
    })
    .then((data) => console.log(`data : `, data))
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