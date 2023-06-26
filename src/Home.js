import { useState, useEffect } from 'react';
//https://the-trivia-api.com/docs/v2/#tag/Questions/operation/getRandomQuestionshttps://the-trivia-api.com/docs/v2/#tag/Questions/operation/getRandomQuestions

const Home = () => {
    const [data, setData] = useState(null);
    const url = "https://the-trivia-api.com/v2/questions/?difficulties=easy&limit=1&categories=geography";

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                setData(data);
            })
            .catch(error => {
                console.log(error);
            })
    };

    return ( 
        <div className="home">
            <h2>Question</h2>
            <div>
            </div>
            <div className="quiz">
                {/* This will be moved to another file*/}
                {data ? (
                    <p>{data[0].question.text}</p>
                ) : (
                    <p>Loading...</p>
                )}
                {data ? (
                    <p>{data[0].correctAnswer}</p>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>
     );
}
 
export default Home;