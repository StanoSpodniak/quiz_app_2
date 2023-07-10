import { useState, useEffect } from 'react';
import categories from "../data/categories";
import "./Home.css";

const Home = () => {
    const quizCategories = {categories};

    const [searchTerm, setSearchTerm] = useState('');
    const [search, setSearch] = useState(false);
    const [searchResult, setSearchResult] = useState({});
    
    useEffect(() => {
        if (searchResult.length > 0) {
            setSearch(true);
            console.log(searchResult[0].name);
        }

    }, [searchResult]);

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if(searchTerm.length >= 3) {
            let result = quizCategories.categories.categories.map((category) => {
                return category.quizzes.filter((quiz) => quiz.name === searchTerm);
            })
            result = result.filter((quiz) => quiz.length > 0);
            
            if (result.length > 0) {
                setSearchResult(result[0]);
            }
        } else {
            setSearch(false);
        }
      };

    return (
        <div className="main-container">
            <div className="header">
                <h2>Online free quizzes</h2>
                <h2>Play random quiz</h2>
            </div>
            <div className="search-container">
                <form className="search-form" onSubmit={handleSubmit} >
                    <input
                        className="search-bar"
                        type="text"
                        placeholder="Search Quiz"
                        value={searchTerm}
                        onChange={handleChange}
                    />
                    <img src="icons/search.png" id="search_icon" alt="search icon" />
                </form>
            </div>
            <div className="quiz-categories">
                {search ? (
                    searchResult.map((result) => (
                        <p key={result.id}>{result.name}</p>
                    ))
                ) : (
                    quizCategories.categories.categories.map((category) => (
                        <div key={category.id}>
                            <div className="category" key={category.id} style={{backgroundColor: `${category.backgroundColor}`}}>
                                <img src={`icons/${category.name}.png`} alt={`${category.name} icon`} />
                                <h2 style={{color: `${category.color}`}} >{category.nameCapitalized}</h2>
                            </div>
                            <div className="quizzes">
                                {category.quizzes.map((quiz) => (
                                    <a key={quiz.id} href={`/quiz/${category.name}/${quiz.name}/${quiz.tag}`}><button>{quiz.name}</button></a>
                                ))}
                            </div>
                        </div>
                    ))
                )}

                {/* attribution: <a href="https://www.flaticon.com/free-icons/geography" title="geography icons">Geography icons created by Freepik - Flaticon</a> 
                <a href="https://www.flaticon.com/free-icons/history" title="history icons">History icons created by Freepik - Flaticon</a>
                <a href="https://www.flaticon.com/free-icons/biology" title="biology icons">Biology icons created by Eucalyp - Flaticon</a>
                <a href="https://www.flaticon.com/free-icons/abstract" title="abstract icons">Abstract icons created by Freepik - Flaticon</a>
                <a href="https://www.flaticon.com/free-icons/general" title="general icons">General icons created by Vectors Tank - Flaticon</a>
                <a href="https://www.flaticon.com/free-icons/political" title="political icons">Political icons created by Freepik - Flaticon</a>
                <a href="https://www.flaticon.com/free-icons/magnifying-glass" title="magnifying glass icons">Magnifying glass icons created by Anggara - Flaticon</a>
                <a href="https://www.flaticon.com/free-icons/sports" title="sports icons">Sports icons created by Icongeek26 - Flaticon</a>*/
                }
            </div>
        </div>
    )
};

export default Home;