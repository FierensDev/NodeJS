import React, { useEffect } from "react"
import { ReactComponent as MyCrossSvg } from '../assets/cross.svg'
const AccountComponent = (props) => {

  

  return (
    <div className="w-[90%] mx-auto">
      <div className="mx-auto my-8 h-[100px] w-[100px] bg-primary rounded-full flex place-items-center justify-center text-[3rem] text-center text-white">D</div>
      <form className="grid grid-cols-2 gap-3">
        <div className="flex flex-col">
          <label htmlFor="name">Nom</label>
          <input type="text" id="name" placeholder={'Doe'} className="placeholder-gray-300 font-bold"/>
        </div>
        <div className="flex flex-col"> 
          <label htmlFor="firstName">Prénom</label>
          <input type="text" id="firstName" placeholder={'Doe'} className="placeholder-gray-300 font-bold"/>
        </div>

        <div className="col-span-2 flex flex-col">
          <label htmlFor="email">Email</label>
          <input type="text" id="firstName" placeholder={'johndoe@gmail.com'} className="placeholder-gray-300 font-bold"/>
        </div>

        <div className="col-span-2 flex flex-col">
          <label htmlFor="password">Mot de passe</label>
          <input type="password" id="password" placeholder={'***********'} className="placeholder-gray-300 font-bold"/>
        </div>
      </form>

      <div className="my-7">
        <p>Vos tableaux</p>

        <div className="my-3 flex place-items-center">
          <div className="text-primary w-[18px] origin-center rotate-45"><MyCrossSvg/></div>
          <div className="mx-3">Name</div>
        </div>
      </div>
    </div>
  )
};

export default AccountComponent;
