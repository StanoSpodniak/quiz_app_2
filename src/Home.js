import { useState, useEffect } from 'react';
//https://the-trivia-api.com/docs/v2/#tag/Questions/operation/getRandomQuestionshttps://the-trivia-api.com/docs/v2/#tag/Questions/operation/getRandomQuestions

const Home = () => {
    const url = "https://the-trivia-api.com/v2/questions/?difficulties=easy&limit=5&categories=geography";
    const [data, setData] = useState(null);
    const [choices, setChoices] = useState([]);
    const [question, setQuestion] = useState('');
    const [questionCount, setQuestionCount] = useState(0);

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
            console.log(data);
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
    }

    function handleAnswer(event) {
        const userAnswer = event.target.innerText;

        if (userAnswer === data[questionCount - 1].correctAnswer) {
            event.target.style.backgroundColor = "#7FFFD4";
        } else {
            event.target.style.backgroundColor = "#F08080";
        }

        setTimeout(() => {
            if (questionCount < 5) {
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
                <p>{questionCount}/5</p>
                <div className="choices">
                    {data ? (
                        <button onClick={handleAnswer}>{choices[0]}</button>
                    ) : (
                        <button>Loading...</button>
                    )}

                    {data ? (
                        <button onClick={handleAnswer}>{choices[1]}</button>
                    ) : (
                        <button>Loading...</button>
                    )}

                    {data ? (
                        <button onClick={handleAnswer}>{choices[2]}</button>
                    ) : (
                        <button>Loading...</button>
                    )}
                    
                    {data ? (
                        <button onClick={handleAnswer}>{choices[3]}</button>
                    ) : (
                        <button>Loading...</button>
                    )}
                </div>
            </div>
        </div>
     );
}
 
export default Home;