import { useState, useEffect, useRef } from 'react';
//https://the-trivia-api.com/docs/v2/#tag/Questions/operation/getRandomQuestionshttps://the-trivia-api.com/docs/v2/#tag/Questions/operation/getRandomQuestions

const Quiz = () => {
    const url = "https://the-trivia-api.com/v2/questions/?difficulties=medium&limit=10&categories=geography";
    const [data, setData] = useState(null);
    const [choices, setChoices] = useState([]);
    const [question, setQuestion] = useState('');

    const [questionCount, setQuestionCount] = useState(0);
    const [score, setScore] = useState(0);

    const [buttons, setButtons] = useState([
        { id: 0, value: "", backgroundColor: "#FFFFFF" },
        { id: 1, value: "", backgroundColor: "#FFFFFF" },
        { id: 2, value: "", backgroundColor: "#FFFFFF" },
        { id: 3, value: "", backgroundColor: "#FFFFFF" }
    ]);
    const buttonEls = useRef([]);
    const [choicesDisabled, setChoicesDisabled] = useState(false);

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

        //choices button:hover and disabled does not work
        setChoicesDisabled(true);

        if (userAnswer === correctAnswer) {
            setScore(score + 1);
            event.target.style.backgroundColor = "#7FFFD4";
        } else {
            event.target.style.backgroundColor = "#F08080";

            filteredOptions.map((button) => {
                if(button.value === correctAnswer) {
                    button.style.backgroundColor = "#7FFFD4";
                }
            })
        }

        setTimeout(() => {
            if (questionCount < data.length) {
                prepareQuestion(data);
                resetButtonsColor(filteredOptions);
                setChoicesDisabled(false);
            } else {
                resetButtonsColor(filteredOptions);

                let endPanel = endGamePanel.current;
                endPanel.style.display = "block";
            }
        }, 2000);
    }

    function resetButtonsColor(buttons) {
        buttons.map((button) => {
            button.style.backgroundColor = "#FFFFFF";
        })
    }

    function handleNewGame() {
        window.location.reload();
    } 

    return ( 
        <div className="quiz-container">
            <div className="quiz-header">
                {data && <h2>Question {questionCount}/{data.length}:</h2>}
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
                                ref={(element) => buttonEls.current.push(element)}
                                value={choices[button.id]}
                                onClick={handleAnswer}
                                disabled={choicesDisabled}                                           
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
                <h2>Congratulations! You have finished quiz.</h2>
                {data && <h3>Your final score is {score}/{data.length}</h3>}
                <button onClick={handleNewGame}>Play Again</button>
            </div>
        </div>
     );
}
 
export default Quiz;