import "./ParametersUser.css";
import Nav from "./Nav";
import { useState, useEffect } from "react";
import authService from "../firebase-usefull/auth";

const ParametersUser = () => {

  const [formObject, setFormObject] = useState({
    email: "",
    password: "",
  })

  const FormChange = (event) => {
    const {name, value} = event.target;
    const newFormOject = {...formObject};
    newFormOject[name] = value;
    setFormObject(newFormOject);  
  }

  const addUser = () => {
    authService.signUp(formObject.email,formObject.password);
    console.log("user add!!!")
  }

  const getUser = () => {
    authService.getUser();
  }

  return (  
    <div className="ParametersUser">
      <Nav/>
      <div className="input-singup">
        <h2>Ajouter un nouvel Utilisateur</h2>
        <input type="email" name="email" value={formObject.email} placeholder="email" onChange={FormChange}/>
        <input type="password" name="password" value={formObject.password} placeholder="password" onChange={FormChange}/>
        <input type="submit" name="submit" value="Ajouter" onClick={addUser}/>
        <button onClick={getUser}>user</button>
      </div>
    </div>  
  );
}
 
export default ParametersUser;