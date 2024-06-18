import React, { useState } from "react"

const FormInput=({name, data, type})=>{

  const [cssIsFocused, setCssIsFocused] = useState(false)

  return (
    <div 
    onClick={()=>{
      console.log(`deunsLog : `, process.env.REACT_APP_API_URL)
    }}
    className={cssIsFocused ? 'my-4 bg-secondary relative h-[40px] border border-black rounded-md' : 'my-4 bg-secondary relative h-[40px] rounded-md'}>
      <label className={cssIsFocused || data.formData[name] != '' ? 'text-[10px] absolute top-0 left-0 z-10 flex place-items-center pl-[10px] pointer-events-none' : ' text-small absolute z-10 inset-0 flex place-items-center pl-[10px] pointer-events-none'}>{name}</label>
      <div className="flex justify-between">
        <input 
        className={cssIsFocused  || data.formData[name] != '' ? ' bg-transparent outline-none absolute bottom-0 left-[10px] right-[40px] h-[30px]' : 'text-secondary bg-transparent outline-none absolute bottom-0 left-[10px] right-[40px] h-[30px]' }
        onFocus={()=>{
          setCssIsFocused(true)
        }}
        onBlur={()=>{
          setCssIsFocused(false)
        }}
        type={type} name={name} value={data.formData[name]} 
        onChange={(e)=>{
          data.setFormData({...data.formData, [name]: e.target.value})
        }}/>
      </div>
    </div>
  )
};

export default FormInput;