import "./Nav.css"
import { Link, useNavigate } from 'react-router-dom';
import authService from "../firebase-usefull/auth";

const Nav = () => {
    const navigate = useNavigate();

    const logOut = () => {
        authService.signOut();
        navigate("/");
    }


    return ( 
        <div className="Nav">
            <ul>
                <Link to="/"><li>Acceuil</li></Link>
                <Link to="/DatesPage.js"><li>Modifier la tourner</li></Link>
                <Link to="/ParametersUser.js"><li>paramétres</li></Link>
                <button onClick={logOut}>se deconnecter</button>   
            </ul>
        </div>
    );
}
 
export default Nav;