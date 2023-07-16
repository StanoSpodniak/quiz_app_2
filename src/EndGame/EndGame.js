import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './EndGame.css';

const EndGame = () => {
    const quizData = useParams();
    const navigate = useNavigate();
    const data = JSON.parse(localStorage.getItem('data'));
    const userAnswers = JSON.parse(localStorage.getItem('userAnswers'));

    const [showReview, setShowReview] = useState(false);
    const [showReviewText, setShowReviewText] = useState('Show');

    useEffect(() => {
        if(showReview) {
            setShowReviewText("Hide");
        } else {
            setShowReviewText("Show");
        }
    }, [showReview]);

    const handleHomePage = () => {
        navigate('/');
    }

    const handleReview = () => {
        setShowReview(!showReview);
    }

    return (
        <div className="endGame-panel" >
            <div className="announcement">
                <h3>You have finished the quiz "{quizData.quizName}"</h3>
                <h2>Your final score is {quizData.score}/{quizData.questionCount}</h2>
                <button onClick={handleReview}>{showReviewText} Game Review</button>
            </div>
            {showReview && <table className="game-review">
                <thead>
                    <tr>
                        <th></th>
                        <th>Question</th>
                        <th>Your Answer</th>
                        <th>Correct Answer</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => {
                        const lineCount = [1];
                        if(item.correctAnswer === userAnswers[index]) {
                            return (
                                <>
                                    <tr key={index + 1}>
                                        <td>{index + 1}.</td>
                                        <td>{item.question.text}</td>
                                        <td style={{color: "#32CD32"}} className="answer">{userAnswers[index]}</td>
                                        <td className="answer" style={{color: "#32CD32"}}>{item.correctAnswer}</td>
                                    </tr>
                                    {lineCount.map((item) => {
                                        if(index + 1 < data.length) {
                                            return (
                                                <tr>
                                                    <td colSpan="4" >
                                                        <div className="horizontal-line" ></div>
                                                    </td>
                                                </tr>
                                            )
                                        }
                                    })}
                                </>
                            )
                        } else {
                            return (
                                <>
                                    <tr key={index + 1}>
                                        <td>{index + 1}.</td>
                                        <td>{item.question.text}</td>
                                        <td style={{color: "#FF6347"}} className="answer">{userAnswers[index]}</td>
                                        <td className="answer" style={{color: "#32CD32"}}>{item.correctAnswer}</td>
                                    </tr>
                                    {lineCount.map((item) => {
                                        if(index + 1 < data.length) {
                                            return (
                                                <tr>
                                                    <td colSpan="4" >
                                                        <div className="horizontal-line" ></div>
                                                    </td>
                                                </tr>
                                            )
                                        }
                                    })}
                                </>
                            )
                        }
                    })}
                </tbody>
            </table>}   
            <div className="endGame-buttons">
                <button id="play-again-button" onClick={() => navigate(-1)}>Play Again</button>
                <a href="/"><button id="home-button" onClick={handleHomePage}>Choose Another Quiz</button></a>
            </div>
        </div>
    );
}

export default EndGame;