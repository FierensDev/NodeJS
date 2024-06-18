import './App.css';
import DisplayInfo from './components/displayInfo';
import { useAuth } from './context/authContext';
import HomeComponent from './pages/home';

function App() {

  const { userToken } = useAuth()

  return (
    <div className="App">
      <DisplayInfo />
      {userToken ? 
      <></>
      :
      <HomeComponent />
      }
    </div>
  );
}

export default App;