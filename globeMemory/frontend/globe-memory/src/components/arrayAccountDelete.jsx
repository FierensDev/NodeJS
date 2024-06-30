import { useState } from "react"
import { ReactComponent as MyCrossSvg } from '../assets/cross.svg'
import { useDisplayMessage } from "../context/displayMessageContext";

const ArrayAccountDelete = ({board}) => {
  const [confirmationDelete, setConfirmationDelete] = useState(false)
  const { showMessage } = useDisplayMessage();
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

  return (
    <div className="relative my-3 flex place-items-center " >
      {confirmationDelete ?
        <div className="absolute flex inset-0 bg-white bg-opacity-75 z-10">
          <div className="h-[40px] w-[40px] mx-2 border bg-green-500 bg-opacity-25 border-green-500 text-green-500 rounded-md flex place-items-center justify-center" 
          onClick={() => {
            deleteBoard(board._id)
          }}
          >V</div>
          <div className="h-[40px] w-[40px] mx-2 border bg-red-500 bg-opacity-25 border-red-500 text-red-500 rounded-md flex place-items-center justify-center" 
          onClick={() => {
            setConfirmationDelete(false)
          }}
          >X</div>
        </div>
        :
        <></>
      }
        <div 
        onClick={()=>{
          setConfirmationDelete(true)
         
        }}
        className="text-primary w-[18px] origin-center rotate-45"><MyCrossSvg/></div>
      <div >
        <p className="font-semibold mx-2 mt-1">{board.name}</p>
        <p className="text-info text-[0.7rem] mx-2 mb-1">{board.image_link.length} photos</p>
      </div>
    </div>
  )
}

export default ArrayAccountDelete