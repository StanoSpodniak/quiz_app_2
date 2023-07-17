import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useFetchQuizData from './useFetchQuizData';
import './Quiz.css';
//https://the-trivia-api.com/docs/v2/#tag/Questions/operation/getRandomQuestionshttps://the-trivia-api.com/docs/v2/#tag/Questions/operation/getRandomQuestions
//help@the-trivia-api.com
//use icons from https://www.flaticon.com/search?word=history on homepage
//https://wikitrivia.tomjwatson.com/

//make imageQuiz file and functionality

const Quiz = () => {
    const quizParams = useParams();
    const {data} = useFetchQuizData(quizParams);
    
    const buttons = [
            { id: 0 },
            { id: 1 },
            { id: 2 },
            { id: 3 }
    ];
    const color = {neutral: "white", correct: "#6BCD6F", incorrect: "#CD6F6B", hover: "#F0F8FF"};

    const [question, setQuestion] = useState('');
    const [choices, setChoices] = useState([]);

    const buttonEls = useRef([]);
    const [buttonsDisabled, setButtonsDisabled] = useState(false);

    const [questionCount, setQuestionCount] = useState(0);
    const [score, setScore] = useState(0);
    const [addScore, setAddScore] = useState(false);
    const [isAnswered, setIsAnswered] = useState(false);
    const [userAnswers, setUserAnswers] = useState([]);

    const navigate = useNavigate();
    const [gameEnded, setGameEnded] = useState(false);

    useEffect(() => {
        if (data) {
            prepareQuestion();
        } else {
            console.log("no data");
        }
    }, [data]);

    useEffect(() => {
        if(addScore && isAnswered) {
            setScore(score + 1);
        }
    }, [isAnswered]);

    useEffect(() => {
        if(gameEnded) {
            localStorage.setItem('userAnswers', JSON.stringify(userAnswers));
            localStorage.setItem('data', JSON.stringify(data));
            navigate(`./endGame/${score}/${questionCount}`);
        }
    }, [gameEnded]);

    const prepareQuestion = () => {
        const incorrectAnswers = data[questionCount].incorrectAnswers;
        const correctAnswer = data[questionCount].correctAnswer;
        let options = incorrectAnswers.concat(correctAnswer);

        for (let i = options.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [options[i], options[j]] = [options[j], options[i]];
        }

        setChoices(options);
        setQuestion(data[questionCount].question.text);
        setQuestionCount(questionCount + 1);

        for(let i = 0; i < buttons.length; i++) {
            buttons[i].value = options[i];
        }
    }

    function handleAnswer(event) {
        const userAnswer = event.target.innerText;
        setUserAnswers([...userAnswers, userAnswer]);
        const correctAnswer = data[questionCount - 1].correctAnswer;

        let options = buttonEls.current;
        const filteredOptions = options.filter(element => element !== null);
        options = [];

        setButtonsDisabled(true);

        if (userAnswer === correctAnswer) {
            setIsAnswered(true);
            setAddScore(true);
            event.target.style.backgroundColor = color.correct;
            event.target.style.color = color.neutral;
            event.target.style.border = "none";
        } else {
            setIsAnswered(true);
            setAddScore(false);
            event.target.style.backgroundColor = color.incorrect;
            event.target.style.color = color.neutral;
            event.target.style.border = "none";

            filteredOptions.map((button) => {
                if(button.value === correctAnswer) {  
                    button.style.backgroundColor = color.correct;
                    button.style.color = color.neutral;
                    button.style.border = "none";
                }
            })
        }

        setTimeout(() => {
            resetButtonsColor(filteredOptions);
            setIsAnswered(false);

            if (questionCount < data.length) {
                setButtonsDisabled(false);
                prepareQuestion(data);
            } else {
                setGameEnded(true);
            }
        }, 2000);
    }

    function resetButtonsColor(buttons) {
        buttons.map((button) => {
            button.style.backgroundColor = color.neutral;
            button.style.color = "black";
            button.style.border = "2px solid #ADD8E6";
        })
    }

    const handleMouseEnter = (event) => {
        event.target.style.backgroundColor = color.hover;
        event.target.style.cursor = "pointer";
    };
    
    const handleMouseLeave = (event) => {
        event.target.style.backgroundColor = color.neutral;
    };

    return ( 
        <div className="quiz-container">
            {/* make background color with color of quiz category */}
            <div className="quiz-header">
                <div className="quiz-info-container">
                    <div className="quiz-info">
                        <h2 className="info">Category: <span style={{fontWeight: "400"}}>{quizParams.section}</span></h2>
                    </div>
                    <div className="quiz-info">
                        {data && <h2 className="info">Question: <span style={{fontWeight: "400"}}>{questionCount}/{data.length}</span></h2>}
                        {data && <h2 className="info">Score: <span style={{fontWeight: "400"}}>{score}/{data.length}</span></h2>}
                    </div>
                </div>
                <h2 id="quiz-name">{quizParams.quizName}</h2>
            </div>
            <div className="quiz">
                {data ? (
                    <p id="question-text">{question}</p>
                ) : (
                    <p>Loading...</p>
                )}
                <div className="choices">
                    {data ? (
                        buttons.map((button) => (
                            <button
                                key={button.id}
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                                ref={(element) => buttonEls.current.push(element)}
                                value={choices[button.id]}
                                onClick={handleAnswer}
                                disabled={buttonsDisabled}
                                style={{backgroundColor: color.neutral}}                                      
                            >
                                {choices[button.id]}
                            </button>
                        ))
                    ) : (
                        <p>Loading...</p>
                    )}
                </div>
            </div>
        </div>
     );
}

export default Quiz;