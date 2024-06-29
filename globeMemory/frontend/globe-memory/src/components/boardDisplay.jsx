import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

const BoardDisplay = ({data}) => {
  console.log(data);
  return (
 <>
    {data?  
      <Link to={'/MyMemory/' + data._id}>
        {data.image_link.length > 0 ? 
          <div className={`w-[100%] h-[100px] overflow-hidden rounded-md`}>
            <img src={"http://127.0.0.1:8080/board/photos/get/" + data.image_link[0]} alt="Description de l'image"></img>
          </div>
          :
          <div className={`w-[100%] h-[100px] bg-gray-400 rounded-lg`}></div>
        }
        <p className="font-semibold mx-2 mt-1">{data.name}</p>
        <p className="text-info text-[0.7rem] mx-2 mb-1">{data.image_link.length} photos</p>
      </Link>
    :
      <></>
    }
    </>
  )
}

export default BoardDisplay