import { useParams, useNavigate } from 'react-router-dom';
import './EndGame.css';
//Should implement sumary of questions correct answers and user answers

const EndGame = () => {
    const quizData = useParams();
    const navigate = useNavigate();

    const handleHomePage = () => {
        navigate('/');
    }

    return (
        <div className="endGame-panel" >
            <h3>Congratulations! You have finished the quiz "{quizData.quizName}".</h3>
            <h2>Your final score is {quizData.score}/{quizData.questionCount}</h2>
            <div className="endGame-buttons">
                <button id="play-again-button" onClick={() => navigate(-1)}>Play Again</button>
                <a href="/"><button id="home-button" onClick={handleHomePage}>Choose Another Quiz</button></a>
            </div>
        </div>
    );
}

export default EndGame;