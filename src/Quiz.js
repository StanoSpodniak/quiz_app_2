import { useState, useEffect } from 'react';
//https://the-trivia-api.com/docs/v2/#tag/Questions/operation/getRandomQuestionshttps://the-trivia-api.com/docs/v2/#tag/Questions/operation/getRandomQuestions

const Home = () => {
    const url = "https://the-trivia-api.com/v2/questions/?difficulties=medium&limit=10&categories=history";
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
    }, [data])

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

        if (userAnswer === correctAnswer) {
            setScore(score + 1);
            event.target.style.backgroundColor = "#7FFFD4";
        } else {
            event.target.style.backgroundColor = "#F08080";

            buttons.map((button) => {
                if(button.value === correctAnswer) {
                    //Finish maybe using "useRef"
                    button.backgroundColor = "#7FFFD4";
                }
            })
        }

        setTimeout(() => {
            //Update all buttons with white background color here
            if (questionCount < data.length) {
                prepareQuestion(data);
                event.target.style.backgroundColor = "#FFFFFF";
            } else {
                event.target.style.backgroundColor = "#FFFFFF";
            }
        }, 2000);
    }

    return ( 
        <div className="home">
            <h2>Question:</h2>
            <div>
            </div>
            <div className="quiz">
                {data ? (
                    <p id="question-text">{question}</p>
                ) : (
                    <p>Loading...</p>
                )}
                {data && <p>Question: {questionCount}/{data.length}</p>}
                {data && <p>Score: {score}/{data.length}</p>}
                <div className="choices">
                    {data ? (
                        buttons.map((button) => (
                            <button
                                key={button.id}
                                onClick={handleAnswer}
                                style={{ backgroundColor: button.backgroundColor }}                          
                            >
                                {choices[button.id]}
                            </button>
                        ))
                    ) : (
                        <button>Loading...</button>
                    )}
                </div>
            </div>
        </div>
     );
}
 
export default Home;