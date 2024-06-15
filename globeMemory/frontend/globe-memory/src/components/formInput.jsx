import React, { useState } from "react"

const FormInput=(props)=>{

  const [cssIsFocused, setCssIsFocused] = useState(false)

  return (
    <div 
    onClick={() => {
      console.log(`deunsLog : `, props)
    }}
    className={cssIsFocused ? 'my-4 bg-secondary relative h-[40px] border border-black rounded-md' : 'my-4 bg-secondary relative h-[40px]'}>
      <label className={cssIsFocused ? 'text-[10px] absolute top-0 left-0 z-10 flex place-items-center pl-[10px] pointer-events-none' : ' text-small absolute z-10 inset-0 flex place-items-center pl-[10px] pointer-events-none'}>Email</label>
      <div className="flex justify-between">
        <input 
        className={cssIsFocused ? ' bg-transparent outline-none absolute bottom-0 left-[10px] right-[40px] h-[30px]' : 'text-secondary bg-transparent outline-none absolute bottom-0 left-[10px] right-[40px] h-[30px]' }
        onFocus={()=>{
          setCssIsFocused(true)
        }}
        onBlur={()=>{
          setCssIsFocused(false)
        }}
        id="email" type="text" />
      </div>
    </div>
  )
};

export default FormInput;

{/* 
<div [ngClass]="cssIsFocused === 'email' ? 'my-4 bg-secondary relative h-[40px] border border-black rounded-md' : 'my-4 bg-secondary relative h-[40px]'">
  <label for="email" [ngClass]="cssIsFocused === 'email' || (applyForm.value.email != '' && applyForm.value.email != null) ? ' text-form absolute top-0 left-0 z-10 flex place-items-center pl-[10px] pointer-events-none' : ' text-small absolute z-10 inset-0 flex place-items-center pl-[10px] pointer-events-none'">Email</label>
  <div class="flex justify-between ">
    <input id="email" type="string" [ngClass]="cssIsFocused === 'email' || (applyForm.value.email != '' && applyForm.value.email != null) ? 'bg-transparent outline-none absolute bottom-0 left-[10px] right-[40px] h-[30px]' : 'text-secondary bg-transparent outline-none absolute bottom-0 left-[10px] right-[40px] h-[30px]'" formControlName="email" (focus)="onFocus('email')" (blur)="onBlur()">
  </div>
</div>
 */}