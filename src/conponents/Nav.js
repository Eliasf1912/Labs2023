import "./Nav.css"
import { Link } from 'react-router-dom';

const Nav = () => {
    return ( 
        <div className="Nav">
            <ul>
                <Link to="/"><li>Acceuil</li></Link>
                <Link to="/DatesPage.js"><li>Modifier la tourner</li></Link>
                <Link to="/ParametersUser.js"><li>paramétres</li></Link>
            </ul>
        </div>
    );
}
 
export default Nav;