import { Link, Outlet, RouterProvider, createBrowserRouter, useNavigate } from 'react-router-dom';
import './App.css';
import DisplayInfo from './components/displayInfo';
import { useAuth } from './context/authContext';
import HomeComponent from './pages/home';
import { useEffect } from 'react';
import MyMemoryComponent from './pages/MyMemory'
import MyMemoryIdComponent from './pages/MyMemoryId'
import AccountComponent from './pages/Account'
import { ReactComponent as MyMemorySvg } from './assets/myMemory.svg';
import { ReactComponent as MyCrossSvg } from './assets/cross.svg'



const router = createBrowserRouter([
  // {
  //   path:'/',
  //   element: <Root />,
  //   errorElement: <h1>Créer une page Error</h1>,
  //   children:[
  //     {
  //       path:'/home',
  //       element: <HomeComponent />
  //     },
  //     {
  //       path:'/test',
  //       element: <h1>test</h1>
  //     }
  //   ]
  // }

  {
    path:'/',
    element: <Root />,
    errorElement: <h1>Create error page</h1>,
    children: [
      // {
      //   path:'',
      //   element: <HomeComponent />
      // },

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

  useEffect(() => {
    if(userToken){
      navigate('/MyMemory')
    } else {
      navigate('/')
    }
  }, [userToken])

 
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
              <Link className='fill-primary text-primary' to="/MyMemory"><MyCrossSvg/></Link>
              <Link className='' to="/Account"><div className='bg-primary h-[20px] w-[20px] rounded-full flex place-items-center justify-center'><strong>D</strong></div></Link>
            </div>
          </nav>
          <div className='absolute inset-0 bg-black bg-opacity-50'>
            <div className='absolute bg-white bottom-0 left-0 right-0 h-[80vh] p-4 rounded-t-xl'>
              <div className='flex justify-between w-full'>
                <div className='rotate-45 w-[20px] '>
                  <MyCrossSvg />
                </div>
                <p>Créer un tableau</p>
                <div className='w-[20px]'></div>
              </div>

              <div className='my-5'>
                <p className='font-semibold'>Nom du tableau</p>
                <p className='text-gray-400'>Donnez un nom a votre tableau</p>
              </div>

              <div className='my-5'>
                <p className='font-semibold'>Collaborateurs</p>
                <div className='flex place-items-center'>
                  <div className='bg-primary rounded-full w-[30px] h-[30px] mr-4'></div>
                  <p>Invitez vos amis</p>
                </div>
              </div>
            </div>
          </div>
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

    <RouterProvider router={router} />
  );
}

export default App;