import { useState, useEffect } from 'react';
import categories from "../data/categories";

const SearchResult = ( {searchTerm} ) => {
    const quizCategories = {categories};
    const [categoryFound, setCategoryFound] = useState(false);
    const [foundCategory, setFoundCategory] = useState({});   

    const [quizFound, setQuizFound] = useState(false);
    const [foundQuiz, setFoundQuiz] = useState({});
    const [quizFoundCategory, setQuizFoundCategory] = useState({});

    useEffect(() => {
        getSearchResult();
    }, [searchTerm]);

    const getSearchResult = () => {
        quizCategories.categories.categories.map((category) => {
            let searchedCategory = "";
            
            if(category.nameCapitalized.includes(searchTerm.toUpperCase())) {
                setFoundCategory(category);
                setCategoryFound(true);
                searchedCategory = category;
            }

            category.quizzes.map((quiz) => {
                if(quiz.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                    if (category !== searchedCategory) {
                        setQuizFound(true);
                        setQuizFoundCategory(category);
                        setFoundQuiz(quiz);
                    }
                }
            })
        })  
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
                <div key={quizFoundCategory.id} >
                    <div className="category" style={{backgroundColor: `${quizFoundCategory.backgroundColor}`}}>
                        <img src={`icons/${quizFoundCategory.name}.png`} alt={`${quizFoundCategory.name} icon`} />
                        <h2 style={{color: `${quizFoundCategory.color}`}} >{quizFoundCategory.nameCapitalized}</h2>
                    </div>
                    <div className="quizzes">
                        <a key={foundQuiz.id} href={`/quiz/${quizFoundCategory.name}/${foundQuiz.name}/${foundQuiz.tag}`}><button>{foundQuiz.name}</button></a>
                    </div>
                </div>}
        </div>
    );
}

export default SearchResult;