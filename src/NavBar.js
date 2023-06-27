import { Link } from 'react-router-dom';

const NavBar = () => {
    return ( 
    <nav className="navbar">
        <Link to="/"><h1>Free Quiz</h1></Link>
        <div className="links">
            <Link to="/" className="link">Home</Link>
            <Link to="/create" className="link">Create Quiz</Link>
        </div>
    </nav>
     );
}
 
export default NavBar;