import react from "react"
import "./home.css"

function homeComponent() {
  return(
    <div>
      <div className="background-div absolute ">
        <div className="background-degraded"></div>
        <div className="grid grid-rows-2 h-full place-items-center">
        <p>logo</p>
        <p className="text-[48px] font-bold text-primary">Globe Memory</p>
        </div>
      </div>
      <div className="">
        <div>
          <p>Bienvenue sur </p>
        </div>
      </div>


    </div>
  )
}

export default homeComponent;