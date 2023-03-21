import './App.css';
import Home from './conponents/Home';
import { Route, Routes } from "react-router-dom";
import LoginPage from './conponents/LoginPage';
import DatesPage from './conponents/DatesPage';
import ParametersUser from './conponents/ParametersUser';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path='/LoginPage.js' element={<LoginPage/>}/>
      <Route path='/DatesPage.js' element={<DatesPage/>}/>
      <Route path='/ParametersUser.js' element={<ParametersUser/>}/>
    </Routes>
  )
}

export default App;
