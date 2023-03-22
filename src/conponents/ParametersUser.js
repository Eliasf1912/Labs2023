import "./ParametersUser.css";
import Nav from "./Nav";
import { useState, useEffect } from "react";
import authService from "../firebase-usefull/auth";

const ParametersUser = () => {

  const [formObject, setFormObject] = useState({
    email: "",
    password: "",
    userEmail:"",
    userPassword : ""
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

  const updateEmail = () => {
    authService.updateUserEmail(formObject.userEmail);
    alert("Email modifié")
    let newInfo  = {...formObject};
    newInfo = {
      email: "",
      password: "",
      userEmail:"",
      userPassword : ""
    }
    setFormObject(newInfo)
  }

  const updatePassword = () => {
    authService.updateUserPassword(formObject.userPassword);
    alert("mot de passe modifié");
    let newInfo  = {...formObject};
    newInfo = {
      email: "",
      password: "",
      userEmail:"",
      userPassword : ""
    }
    setFormObject(newInfo)
  }

  return (  
    <div className="ParametersUser">
      <Nav/>
      <div className="input-singup">
        <h2>Ajouter un nouvel Utilisateur</h2>
        <input type="email" name="email" value={formObject.email} placeholder="email" onChange={FormChange}/>
        <input type="password" name="password" value={formObject.password} placeholder="password" onChange={FormChange}/>
        <input type="submit" name="submit" value="Ajouter" onClick={addUser}/>
      </div>
      <div className="Modify-Usert">
        <h2>Mettre à jour ses imformations</h2>
        <h3>Email</h3>
        <input type="text" name="userEmail" placeholder="nouvelle email" value={formObject.userEmail} onChange={FormChange}/>
        <button onClick={updateEmail}>Mettre à jour l'email</button>
        <h3>Password</h3>
        <input type="password" name="userPassword" placeholder="nouveau mot de passe" value={formObject.userPassword} onChange={FormChange}/>
        <button onClick={updatePassword}>Mettre à jour le mot de passe</button>
      </div>
      <div className="user-Info">
        <span></span>
      </div>
    </div>  
  );
}
 
export default ParametersUser;