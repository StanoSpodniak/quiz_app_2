import { Link } from 'react-router-dom';

const NavBar = () => {
    return ( 
    <nav className="navbar">
        <Link to="/"><h1>Free Quizzes</h1></Link>
        <div className="links">
            <Link to="/">Home</Link>
            <Link to="/create">Create Quiz</Link>
        </div>
    </nav>
     );
}
 
export default NavBar;