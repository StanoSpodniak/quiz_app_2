import { useParams, useNavigate } from 'react-router-dom';
import './EndGame.css';
//Should implement sumary of questions correct answers and user answers

const EndGame = () => {
    const quizData = useParams();
    const navigate = useNavigate();
    const data = JSON.parse(localStorage.getItem('data'));
    const userAnswers = JSON.parse(localStorage.getItem('userAnswers'));

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
            <div className="game-review">
                <table>
                    <caption>REVIEW</caption>
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Question</th>
                            <th>Correct Answer</th>
                            <th>Your Answer</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => {
                            if(item.correctAnswer === userAnswers[index]) {
                                return (
                                    <tr key={index + 1}>
                                        <td>{index + 1}</td>
                                        <td>{item.question.text}</td>
                                        <td>{item.correctAnswer}</td>
                                        <td style={{backgroundColor: "green"}}>{userAnswers[index]}</td>
                                    </tr>
                                )
                            } else {
                                return (
                                    <tr key={index + 1}>
                                        <td>{index + 1}</td>
                                        <td>{item.question.text}</td>
                                        <td>{item.correctAnswer}</td>
                                        <td style={{backgroundColor: "red"}}>{userAnswers[index]}</td>
                                    </tr>
                                )
                            }
                        })}
                    </tbody>
                </table>
            </div>
        </div>

    );
}

export default EndGame;