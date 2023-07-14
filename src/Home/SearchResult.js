import { useState, useEffect } from 'react';
import categories from "../data/categories";

const SearchResult = ( {searchTerm} ) => {
    const quizCategories = {categories};
    const [categoryFound, setCategoryFound] = useState(false);
    const [foundCategory, setFoundCategory] = useState({});   

    const [quizFound, setQuizFound] = useState(false);
    const [foundQuiz, setFoundQuiz] = useState({});

    useEffect(() => {
        setCategoryFound(false);
        setQuizFound(false);
        isCategory();
        isQuiz();
        console.log(foundQuiz);
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
        if(searchTerm.length >= 3) {
            /*let results = quizCategories.categories.categories.map((category) => {
                return category.quizzes.filter((quiz) => quiz.name.toLowerCase().includes(searchTerm.toLowerCase()));
            })
            results = results.filter((quiz) => quiz.length > 0);
            
            if (results.length > 0) {
                setFoundQuiz(results.map(result => result));
                setQuizFound(true);
            } else {
                setQuizFound(false);
            }*/
            
            quizCategories.categories.categories.map((category) => {
                let currentCategory = category;
                category.quizzes.map((quiz) => {
                    if(quiz.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                        setFoundCategory(currentCategory);
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

            {quizFound && (
                <div>
                    <div className="category" key={foundCategory.id} style={{backgroundColor: `${foundCategory.backgroundColor}`}}>
                        <img src={`icons/${foundCategory.name}.png`} alt={`${foundCategory.name} icon`} />
                        <h2 style={{color: `${foundCategory.color}`}} >{foundCategory.nameCapitalized}</h2>
                    </div>
                    <div className="quizzes">
                        <a key={foundQuiz.id} href={`/quiz/${foundCategory.name}/${foundQuiz.name}/${foundQuiz.tag}`}><button>{foundQuiz.name}</button></a>
                    </div>
                </div>
            )}
        </div>
    );
}

export default SearchResult;