import { useState, useEffect, useRef } from 'react';
import './Quiz.css';
//https://the-trivia-api.com/docs/v2/#tag/Questions/operation/getRandomQuestionshttps://the-trivia-api.com/docs/v2/#tag/Questions/operation/getRandomQuestions

const Quiz = () => {
    const url = "https://the-trivia-api.com/v2/questions/?difficulties=medium&limit=10&categories=geography";
    const buttons = [
            { id: 0 },
            { id: 1 },
            { id: 2 },
            { id: 3 }
    ];
    const color = {neutral: "white", correct: "#6BCD6F", incorrect: "#CD6F6B", hover: "#F5F5F5"};

    const [data, setData] = useState(null);
    const [question, setQuestion] = useState('');
    const [choices, setChoices] = useState([]);

    const buttonEls = useRef([]);
    const [buttonsDisabled, setButtonsDisabled] = useState(false);

    const [questionCount, setQuestionCount] = useState(0);
    const [score, setScore] = useState(0);

    const endGamePanel = useRef(null);

    const fetchData = async (url) => {   
        try {
            const response = await fetch(url);
            const jsonData = await response.json();
            setData(jsonData);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
    };

    useEffect(() => {
        fetchData(url);
    }, []);

    useEffect(() => {
        if (data) {
            prepareQuestion();
        } else {
            console.log("no data");
        }
    }, [data]);

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
        const correctAnswer = data[questionCount - 1].correctAnswer;

        let options = buttonEls.current;
        const filteredOptions = options.filter(element => element !== null);
        options = [];

        setButtonsDisabled(true);

        if (userAnswer === correctAnswer) {
            setScore(score + 1);
            event.target.style.backgroundColor = color.correct;
            event.target.style.color = color.neutral;
            event.target.style.border = "none";
        } else {
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
            
            if (questionCount < data.length) {
                setButtonsDisabled(false);
                prepareQuestion(data);
            } else {
                let endPanel = endGamePanel.current;
                endPanel.style.display = "block";
            }
        }, 2000);
    }

    function resetButtonsColor(buttons) {
        buttons.map((button) => {
            button.style.backgroundColor = color.neutral;
            button.style.color = "black";
            button.style.border = "1px solid grey";
        })
    }
    
    const handleMouseEnter = (event) => {
        event.target.style.backgroundColor = color.hover;
    };
    
    const handleMouseLeave = (event) => {
        event.target.style.backgroundColor = color.neutral;
    };

    function handleNewGame() {
        window.location.reload();
    }


    return ( 
        <div className="quiz-container">
            <div className="quiz-header">
                {data && <h2>Question {questionCount}/{data.length}</h2>}
                {data && <h2>Score: {score}/{data.length}</h2>}
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
            <div className="endGame-panel" ref={endGamePanel}>
                <h3>Congratulations! You have finished the quiz.</h3>
                {data && <h2>Your final score is {score}/{data.length}</h2>}
                <button onClick={handleNewGame}>PLAY AGAIN</button>
            </div>
        </div>
     );
}
 
export default Quiz;