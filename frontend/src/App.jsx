// Main import
import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Constants
import { SERVERLINK } from './constants';

// Components
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import RegisterCli from "./pages/Register/CamCLi/RegisterCli";
import RegisterEntr from "./pages/Register/Entreprise/RegisterEntr";
import RegisterPass from "./pages/Register/RegisterPass";
import Home from './pages/Home';


export default function App() {


  const [isAuth, setisAuth] = useState(false);


  const setAuth = boolean => {
    setisAuth(boolean)
  }

  const [infosPersonnel, setInfosPersonnel] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setAuth(true);
      getInformation();
    }
  }, []);

  const getInformation = async () => {

    const token = localStorage.getItem("token");

    const response = await fetch(SERVERLINK + "/api/auth/me", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "token": token
      }
    });

    const parseRes = await response.json();

    setInfosPersonnel(parseRes);
  }


  // Register handler
  const [inputs, setinputs] = useState({
    firstname: "",
    lastname: "",
    usercin: "",
    companynumber: "",
    phone: "",
    adress: "",
    email: "",
    bio: "",
    profileimage: "",
    accountid: 0,
    password: "",
    confirmPassword: ""
});

const { firstname, lastname, usercin, companynumber, phone, adress, email, bio, profileimage, accountid, password, confirmPassword } = inputs;


  return (
    <div className="App">
      <Routes>
        <Route path='/' element={!isAuth ? <Login setAuth={setAuth} /> : <Home setAuth={setAuth} Information={infosPersonnel}/>}></Route>
        <Route path='/login' element={!isAuth ? <Login setAuth={setAuth} getInformation={getInformation} /> : <Navigate to='/' />}></Route>
        <Route path='/register' element={!isAuth ? <Register inputs={inputs} setinputs={setinputs} /> : <Navigate to='/login' />}></Route>
        <Route path='/registerEntr' element={!isAuth && accountid != 0 ? <RegisterEntr inputs={inputs} setinputs={setinputs} /> : <Navigate to='/register' />}></Route>
        <Route path='/registerCam' element={!isAuth && accountid != 0 ? <RegisterCli inputs={inputs} setinputs={setinputs} /> : <Navigate to='/register' />}></Route>
        <Route path='/registerCli' element={!isAuth && accountid != 0 ? <RegisterCli inputs={inputs} setinputs={setinputs} /> : <Navigate to='/register' />}></Route>
        <Route path='/registerPass' element={!isAuth && accountid != 0 ? <RegisterPass inputs={inputs} setinputs={setinputs} setAuth={setAuth} getInformation={getInformation}/> : <Navigate to='/register' />}></Route>
      </Routes>
    </div>
  );
}
