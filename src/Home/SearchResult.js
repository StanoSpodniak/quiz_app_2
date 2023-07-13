import { useState, useEffect } from 'react';
import categories from "../data/categories";

const SearchResult = ( {searchTerm} ) => {
    const quizCategories = {categories};
    const [categoryFound, setCategoryFound] = useState(false);
    const [foundCategory, setFoundCategory] = useState({});   

    const [quizFound, setQuizFound] = useState(false);
    const [foundQuiz, setFoundQuiz] = useState([]);

    useEffect(() => {
        setCategoryFound(false);
        setQuizFound(false);
        isCategory();
        isQuiz();
    }, [searchTerm]);

    const isCategory = () => {
        if(searchTerm.length >= 3) {
            quizCategories.categories.categories.map((category) => {
                if(category.nameCapitalized.includes(searchTerm.toUpperCase())) {
                    setCategoryFound(true);
                    setFoundCategory(category);
                }
            })
        }
    }

    const isQuiz = () => {
        if(searchTerm.length >= 3 && categoryFound === false) {
            quizCategories.categories.categories.map((category) => {
                //push found categories to array, then filter quizzes which belong to this categories
                let currentCategory = category;
                category.quizzes.map((quiz) => {
                    //maybe filter results here as in Home.js
                    if(quiz.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                        setQuizFound(true);
                        setFoundQuiz(quiz);
                    }
                })
            })     
        }
    }

    return (
        <div>
            {categoryFound && (
                <div>
                    <div className="category" key={foundCategory.id} style={{backgroundColor: `${foundCategory.backgroundColor}`}}>
                        <img src={`icons/${foundCategory.name}.png`} alt={`${foundCategory.name} icon`} />
                        <h2 style={{color: `${foundCategory.color}`}} >{foundCategory.nameCapitalized}</h2>
                    </div>
                    <div className="quizzes">
                        {foundCategory.quizzes.map((quiz) => (
                            <a key={quiz.id} href={`/quiz/${foundCategory.name}/${quiz.name}/${quiz.tag}`}><button>{quiz.name}</button></a>
                        ))}
                    </div>
                </div>
            )}

            {quizFound ? (
                <div>
                    <p>{foundQuiz.name}</p>
                </div>
            ) : (
                <div>
                    <p>No search result</p>
                </div>
            )}
        </div>
    );
}

export default SearchResult;