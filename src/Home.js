import { useState, useEffect } from 'react';
//https://the-trivia-api.com/docs/v2/#tag/Questions/operation/getRandomQuestionshttps://the-trivia-api.com/docs/v2/#tag/Questions/operation/getRandomQuestions

const Home = () => {
    const url = "https://the-trivia-api.com/v2/questions/?difficulties=easy&limit=1&categories=geography";
    const [data, setData] = useState(null);

    useEffect(() => {   
        const fetchData = () => {
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    setData(data)
                })
                .catch(error => {
                    console.log(error);
                })
        };
        
        fetchData();
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
                        <button>{data[0].correctAnswer}</button>
                    ) : (
                        <button>Loading...</button>
                    )}

                    {data ? (
                        <button>{data[0].incorrectAnswers[0]}</button>
                    ) : (
                        <button>Loading...</button>
                    )}

                    {data ? (
                        <button>{data[0].incorrectAnswers[1]}</button>
                    ) : (
                        <button>Loading...</button>
                    )}
                    
                    {data ? (
                        <button>{data[0].incorrectAnswers[2]}</button>
                    ) : (
                        <button>Loading...</button>
                    )}
                </div>
            </div>
        </div>
     );
}
 
export default Home;