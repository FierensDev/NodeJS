import React, { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom";
import { ReactComponent as MySvg} from '../assets/arrowBack.svg'

const MyMemoryId = (props) => {
  let {id} = useParams()
  const [memoryData, setMemoryData] = useState(null)
  useEffect(() => {
    fetch(process.env.REACT_APP_API_URL + '/board/getById/' + id, {
      method: "GET"
    })
    .then((res) => {
      console.log(`deunsLog : `, res)
      return res.json()
    })
    .then((data) => {
      console.log(`deunsLog : `, data)
      setMemoryData(data)
    })
  }, [])

  return (
    <div className="w-[95%] m-auto">
      <Link to={'/MyMemory'}>
        <div className="w-[25px] h-[25px] my-2">
          <MySvg />
        </div>
      </Link>
      {memoryData ? 
      <>
        <p className="font-bold text-xl text-center">{memoryData.name}</p>

        {/* <div className="bg-gray-300 h-[30px] my-4 flex place-items-center justify-center">
        //   <div className='bg-primary h-[30px] w-[30px] rounded-full flex place-items-center justify-center text-white'>D</div>
        // </div> */}
        {memoryData.image_link.length > 0 ?
          <div className=" m-auto grid grid-cols-2 gap-1">
            <div className="flex flex-col ">
              {memoryData.image_link.map((img, index) => (
                index % 2 === 0 ?
                  ( <div key={index} className="overflow-hidden w-full bg-gray-300 rounded-md my-1" onClick={() => {console.log(index)}}>
                  <img src={"http://127.0.0.1:8080/board/photos/get/" + img } alt="Description de l'image"></img>
                  </div>)
                :
                  (<></>)
              ))}
            </div>
            <div className="flex flex-col  place-items-center justify-between">
            {memoryData.image_link.map((img, index) => (
                index % 2 !== 0 ?
                ( <div key={index} className="overflow-hidden w-full bg-gray-300 rounded-md my-1" onClick={() => {console.log(index)}}>
                    <img src={"http://127.0.0.1:8080/board/photos/get/" + img } alt="Description de l'image"></img>
                  </div>)
                :
                  (<></>)
              ))}
            </div>
          </div>
          :
          <></>
          }

            {/* 
              <div className="grid grid-cols-2 gap-1">
                {memoryData.image_link.map((img, index) => (
                    index%2 === 0 ?
                     ( <div key={index} className="overflow-hidden w-full bg-gray-300 rounded-md" onClick={() => {console.log(index)}}>
                      <img src={"http://127.0.0.1:8080/board/photos/get/" + img } alt="Description de l'image"></img>
                      </div>)
                    :
                     (<></>)
               
                ))}
              </div>
            :
            <></>
            } */}
          
        </>
        :
        <></>
        }
    </div>
  )
};

export default MyMemoryId;
