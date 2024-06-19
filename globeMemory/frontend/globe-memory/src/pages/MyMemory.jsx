import React, { useEffect } from "react"
import { ReactComponent as MagnifyingGlassSvg } from '../assets/magnifyingGlass.svg'
import { ReactComponent as DoubleArrowSvg } from '../assets/doubleArrow.svg'

const MyMemoryComponent = (props) => {

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
        <div>
          <div className="w-[100%] h-[100px] bg-gray-300 rounded-lg"></div>
          <p className="font-semibold mx-2 mt-1">Name</p>
          <p className="text-info text-[0.7rem] mx-2 mb-1">52 photos</p>
        </div>
        <div>
          <div className="w-[100%] h-[100px] bg-gray-300 rounded-lg"></div>
          <p className="font-semibold mx-2 mt-1">Name</p>
          <p className="text-info text-[0.7rem] mx-2 mb-1">52 photos</p>
        </div>
        <div>
          <div className="w-[100%] h-[100px] bg-gray-300 rounded-lg"></div>
          <p className="font-semibold mx-2 mt-1">Name</p>
          <p className="text-info text-[0.7rem] mx-2 mb-1">52 photos</p>
        </div>
        <div>
          <div className="w-[100%] h-[100px] bg-gray-300 rounded-lg"></div>
          <p className="font-semibold mx-2 mt-1">Name</p>
          <p className="text-info text-[0.7rem] mx-2 mb-1">52 photos</p>
        </div>
        <div>
          <div className="w-[100%] h-[100px] bg-gray-300 rounded-lg"></div>
          <p className="font-semibold mx-2 mt-1">Name</p>
          <p className="text-info text-[0.7rem] mx-2 mb-1">52 photos</p>
        </div>
        <div>
          <div className="w-[100%] h-[100px] bg-gray-300 rounded-lg"></div>
          <p className="font-semibold mx-2 mt-1">Name</p>
          <p className="text-info text-[0.7rem] mx-2 mb-1">52 photos</p>
        </div>
        <div>
          <div className="w-[100%] h-[100px] bg-gray-300 rounded-lg"></div>
          <p className="font-semibold mx-2 mt-1">Name</p>
          <p className="text-info text-[0.7rem] mx-2 mb-1">52 photos</p>
        </div>
        <div>
          <div className="w-[100%] h-[100px] bg-gray-300 rounded-lg"></div>
          <p className="font-semibold mx-2 mt-1">Name</p>
          <p className="text-info text-[0.7rem] mx-2 mb-1">52 photos</p>
        </div>
      </div>
    </div>
  )
};

export default MyMemoryComponent;
