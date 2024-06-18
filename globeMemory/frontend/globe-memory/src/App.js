import './App.css';
import DisplayInfo from './components/displayInfo';
import { useAuth } from './context/authContext';
import HomeComponent from './pages/home';

function App() {

  const { token } = useAuth()

  return (
    <div className="App">
      <DisplayInfo />
      {token ? 
      <></>
      :
      <HomeComponent />
      }
    </div>
  );
}

export default App;
