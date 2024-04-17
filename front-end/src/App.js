import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home';
import Register from './Pages/Register';
import Login from './Pages/Login';
import { useAuth } from './Context/auth';
import Profile from './Pages/Profile';

function App() {
  const [auth,setAuth]=useAuth()
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      {auth && //Private routes
        <Route path='/profile' element={<Profile />} />
      }
    </Routes>
  );
}

export default App;
