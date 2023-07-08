import { Link } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
    return ( 
    <nav className="navbar">
        <Link to="/"><h1>Free Quizzes</h1></Link>
        <div className="links">
            <Link to="/" className="link">Home</Link>
            <Link to="/attribution" className="link">Attribution</Link>
            <Link to="/about" className="link">About</Link>
        </div>
    </nav>
     );
}
 
export default NavBar;