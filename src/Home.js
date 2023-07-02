import { useState, useEffect } from 'react';
//https://the-trivia-api.com/docs/v2/#tag/Questions/operation/getRandomQuestionshttps://the-trivia-api.com/docs/v2/#tag/Questions/operation/getRandomQuestions

const Home = () => {
    const url = "https://the-trivia-api.com/v2/questions/?difficulties=easy&limit=1&categories=geography";
    const [data, setData] = useState(null);
    const [options, setOptions] = useState([]);
    const [correctAnswer, setCorrectAnswer] = useState();
    const [incorrectAnswers, setIncorrectAnswers] = useState([]);

    useEffect(() => {   
        fetch(url)
            .then(response => response.json())
            .then(data => {
                setData(data)
                setCorrectAnswer(data[0].correctAnswer)
                setIncorrectAnswers(data[0].incorrectAnswers)
            })
            .catch(error => console.log(error))
    }, []);

    return ( 
        <div className="home">
            <h2>Question:</h2>
            <div>
            </div>
            <div className="quiz">
                {data ? (
                    <p id="question-text">{data[0].question.text}</p>
                ) : (
                    <p>Loading...</p>
                )}
                <div className="options">
                    {data ? (
                        <button>{correctAnswer}</button>
                    ) : (
                        <button>Loading...</button>
                    )}

                    {data ? (
                        <button>{options[0]}</button>
                    ) : (
                        <button>Loading...</button>
                    )}

                    {data ? (
                        <button>{incorrectAnswers[1]}</button>
                    ) : (
                        <button>Loading...</button>
                    )}
                    
                    {data ? (
                        <button>{}</button>
                    ) : (
                        <button>Loading...</button>
                    )}
                </div>
            </div>
        </div>
     );
}
 
export default Home;