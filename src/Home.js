import { Link } from 'react-router-dom';
import { useState } from 'react';

const Home = () => {
    const [quizzes, setData] = useState([
        { title: 'Capital Cities', id: 1 },
        { title: 'History', id: 2 }
    ]);

    return ( 
        <div className="home">
            <h2>All quizzes</h2>
            <div className="quiz">
                {quizzes.map((quiz) => (
                    <Link><h2>{quiz.title}</h2></Link>
                ))}
            </div>
        </div>
     );
}
 
export default Home;