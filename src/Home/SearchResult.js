import { useState, useEffect } from 'react';
import categories from "../data/categories";

const SearchResult = ( {searchTerm} ) => {
    const quizCategories = {categories};
    const [categoryFound, setCategoryFound] = useState(false);
    const [foundCategory, setFoundCategory] = useState({});   

    const [quizFound, setQuizFound] = useState(false);
    const [foundQuizzes, setFoundQuizzes] = useState({});
    const [quizFoundCategory, setQuizFoundCategory] = useState([]);

    useEffect(() => {
        setCategoryFound(false);
        getSearchResult();
    }, [searchTerm]);

    const getSearchResult = () => {
        let searchResult = [];
        let foundQuiz = [];

        quizCategories.categories.categories.map((category) => {
            let displayedCategory = {};
            
            if(category.nameCapitalized.includes(searchTerm.toUpperCase())) {
                setFoundCategory(category);
                setCategoryFound(true);
                displayedCategory = category;
            }

            category.quizzes.map((quiz) => {
                if(quiz.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                    if (category !== displayedCategory) {
                        setQuizFound(true);

                        searchResult.push(category);
                        foundQuiz.push(quiz);
                    }
                }
            })
        })  

        setQuizFoundCategory(searchResult);
        setFoundQuizzes(foundQuiz);

        //check if no category and quiz is found - if not add announcement; add boolean emptySearchResult
    }

    return (
        <div>
            {categoryFound &&
                <div key={foundCategory.id}>
                    <div className="category" style={{backgroundColor: `${foundCategory.backgroundColor}`}}>
                        <img src={`icons/${foundCategory.name}.png`} alt={`${foundCategory.name} icon`} />
                        <h2 style={{color: `${foundCategory.color}`}} >{foundCategory.nameCapitalized}</h2>
                    </div>
                    <div className="quizzes">
                        {foundCategory.quizzes.map((quiz) => (
                            <a key={quiz.id} href={`/quiz/${foundCategory.name}/${quiz.name}/${quiz.tag}`}><button>{quiz.name}</button></a>
                        ))}
                    </div>
                </div>}         

            {quizFound &&
                <div>
                    {quizFoundCategory.map((category) => {
                        return (
                            <div key={category.id}> 
                                <div>
                                    <div className="category" style={{backgroundColor: `${category.backgroundColor}`}}>
                                        <img src={`icons/${category.name}.png`} alt={`${category.name} icon`} />
                                        <h2 style={{color: `${category.color}`}} >{category.nameCapitalized}</h2>
                                    </div>
                                </div>
                                {foundQuizzes.map(quiz => {
                                    if(quiz.category === category.name) {
                                        return (
                                            <div key={quiz.id} className="quizzes">
                                                <a href={`/quiz/${category.name}/${quiz.name}/${quiz.tag}`}><button>{quiz.name}</button></a>
                                            </div>)
                                    }
                                })}
                            </div>)
                    })}
                </div>
            }
        </div>
    );
}

export default SearchResult;