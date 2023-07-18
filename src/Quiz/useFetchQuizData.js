import { useState, useEffect } from 'react';

const useFetchQuizData = (quizParams) => {
    const baseUrl = "https://the-trivia-api.com/v2/questions/";
    const [url, setUrl] = useState("");

    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    /*const removeCategoryTag = ["music", "film", "tv", "food", "philosophy", "politics", "psychology", "religion", "law", "words", "chess", "harry_potter", "star_wars", "star_trek", "comics",
"pc_games", "video_games", "aviation"];*/
    const removeCategoryID = ["407", "408", "409", "410", "411", "412", "701", "702", "703", "704", "705", "706", "707", "708", "709", "710", "711", "712", "713", "804"];

    useEffect(() => {
        let urlStr = baseUrl;
        let params = `?limit=10&categories=${quizParams.category}`;

        /*if(removeCategoryTag.includes(quizParams.tag)) {
            params = "?limit=10";
        }*/

        if(removeCategoryID.includes(quizParams.id)) {
            params = "?limit=10";
        }

        if(quizParams.tag !== "none") {
            params += "&tags=" + quizParams.tag;
        }

        urlStr += params; 
        setUrl(urlStr);

    }, [quizParams])

    useEffect(() => {   
        fetch(url)
        .then(res => {
            if(!res.ok) {
                throw Error('could not fetch the data from that resources');
            }
            return res.json();
        })
        .then (data => {
            setData(data);
            setIsPending(false);
            setError(null);
        })
        .catch(err => {
            if (err.name === 'AbortError') {
                console.log('fetch aborted');
            } else {
                setIsPending(false);
                setError(err.message);
            }
        })
    }, [url]);

    return { data, isPending, error };
}

export default useFetchQuizData;