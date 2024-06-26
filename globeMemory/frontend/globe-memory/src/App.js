import { Link, Outlet, RouterProvider, createBrowserRouter, useNavigate } from 'react-router-dom';
import './App.css';
import DisplayInfo from './components/displayInfo';
import { useAuth } from './context/authContext';
import HomeComponent from './pages/home';
import { useEffect, useState } from 'react';
import MyMemoryComponent from './pages/MyMemory'
import MyMemoryIdComponent from './pages/MyMemoryId'
import AccountComponent from './pages/Account'
import { ReactComponent as MyMemorySvg } from './assets/myMemory.svg';
import { ReactComponent as MyCrossSvg } from './assets/cross.svg'
import { useDisplayMessage } from './context/displayMessageContext';



const router = createBrowserRouter([
  {
    path:'/',
    element: <Root />,
    errorElement: <h1>Create error page</h1>,
    children: [
      {
        path:'/MyMemory',
        children: [
          {
            path:'',
            element: <MyMemoryComponent />
          },
          {
            path:':id',
            element: <MyMemoryIdComponent />
          }
        ]
      },

      {
        path:'/Account',
        element: <AccountComponent />
      }
    ]
  }
])

function Root() {
  const { userToken } = useAuth();
  const navigate = useNavigate();
  const {showMessage} = useDisplayMessage();

  const [displayCreateBoard, setDisplayCreateBoard] = useState(false);
  const [boardData, setBoardData] = useState({
    name: "",
    created_by: "",
    shared_to:[],
    image_link:""
  })

  useEffect(() => {
    if(userToken){
      navigate('/MyMemory')
    } else {
      navigate('/')
    }
  }, [userToken])

  function createBoard(e){
    e.preventDefault();
    console.log(`deunsLog : `, boardData)

    fetch(process.env.REACT_APP_API_URL + '/board/create', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${userToken}`,
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({
        'name': boardData.name,
        'shared_to':["666642cd5effd0be1ff4e53b"],
        'image_link':"first"
      })
    })
    .then((res) => {
      if(res.status == 404){
        return res.json()
        .then(data => {
          throw new Error(data)
        })
      }
      return res.json();
    })
    .then((data) =>{
      console.log(`data : `, data.message)
      showMessage(data.message);
    })
    .catch(err => console.log(`deunsLog : `, err))
  }

 
  return(
    <div>
      {
        userToken ? 
        <div className='grid grid-rows-[calc(100vh-40px),40px] h-[100vh]'>
          <div className='overflow-auto'>
          <Outlet/>
          </div>
          <nav className='bg-secondary'>
            <div className='w-[70%] m-auto flex justify-between place-items-center h-full'>
              <Link className='fill-primary text-primary' to="/MyMemory"><MyMemorySvg /></Link>
              <button className='fill-primary text-primary' onClick={() => {
                setDisplayCreateBoard(true)
              }}><MyCrossSvg/></button>
              <Link className='' to="/Account"><div className='bg-primary h-[20px] w-[20px] rounded-full flex place-items-center justify-center'><strong>D</strong></div></Link>
            </div>
          </nav>

          {displayCreateBoard ? 
            <div className='absolute inset-0 bg-black bg-opacity-50'>

              <form onSubmit={createBoard} className='absolute bg-white bottom-0 left-0 right-0 h-[80vh] p-4 rounded-t-xl'>
                <div className='flex justify-between w-full'>
                  <button 
                    className='rotate-45 w-[20px] '
                    onClick={()=>{
                      setDisplayCreateBoard(false)
                    }}
                  >
                    <MyCrossSvg />
                  </button>
                  <p>Créer un tableau</p>
                  <div className='w-[20px]'></div>
                </div>

                <div className='my-5 flex flex-col'>
                <label htmlFor="name">Nom du tableau</label>
                <input type="text" id="name" placeholder={'Donnez un nom a votre tableau'} className="placeholder-gray-300 font-semibold"
                onChange={(e) => {
                  setBoardData({...boardData, name:e.target.value})
                }}
                />
                </div>

                <div className='my-5'>
                  <p className='font-semibold'>Collaborateurs</p>
                  <div className='flex place-items-center mt-2'>
                    <div className='bg-primary rounded-full w-[30px] h-[30px] mr-4'></div>
                    <p>Invitez vos amis</p>
                  </div>
                </div>

                <button className='bg-primary p-2 rounded-md'>Créer le tableau</button>
              </form>
            </div>
            :
            <></>
          }
        </div>
        :
        <HomeComponent />
      }
    </div>
  )
}


function App() {
  return (
    // <div className="App">
    //   <DisplayInfo />
    //   {userToken ? 
    //   <></>
    //   :
    //   <HomeComponent />
    //   }
    // </div>
    <>
      <DisplayInfo />
      <RouterProvider router={router} />
    </>
  );
}

export default App;