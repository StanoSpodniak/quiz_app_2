import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import categories from "../data/categories";
import SearchResult from './SearchResult';
import "./Home.css";

//the quiz will be not selected through url but through quiz data saved in local storage

const Home = () => {
    const navigate = useNavigate();
    const quizCategories = {categories};
    const quizzes = [];

    const [searchTerm, setSearchTerm] = useState('');
    const [search, setSearch] = useState(false);

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
        
        if(event.target.value.length >= 2) {
            setSearch(true);
        } else {
            setSearch(false);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
    };

    const handleRandom = () => {
        quizCategories.categories.categories.map((category) => {
            category.quizzes.map((quiz) => {
                quizzes.push(quiz);
            })
        })
        let rnd = Math.floor(Math.random() * quizzes.length);
        console.log(quizzes[rnd]);
        navigate(`/quiz/${quizzes[rnd].category}/${quizzes[rnd].name}/${quizzes[rnd].tag}/${quizzes[rnd].id}/${quizzes[rnd].section}`);
    }

    return (
        <div className="main-container">
            <div className="banner">
                <h2 id="slogan">Explore, Play, Quiz Away!</h2>
                <button className="play-random-button" onClick={handleRandom}>Play Random Quiz</button>
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
                    <SearchResult searchTerm={searchTerm} />
                ) : (
                    quizCategories.categories.categories.map((category) => (   
                        <div key={category.id}>
                            <div className="category" key={category.id} style={{backgroundColor: `${category.backgroundColor}`}}>
                                <img src={`icons/${category.name}.png`} alt={`${category.name} icon`} />
                                <h2 style={{color: `${category.color}`}} >{category.nameCapitalized}</h2>
                            </div>
                            <div className="quizzes">
                                {category.quizzes.map((quiz) => (
                                    <a key={quiz.id} href={`/quiz/${category.name}/${quiz.name}/${quiz.tag}/${quiz.id}/${quiz.section}`}><button>{quiz.name}</button></a>
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
                <a href="https://www.flaticon.com/free-icons/sports" title="sports icons">Sports icons created by Icongeek26 - Flaticon</a>
                <a href="https://www.flaticon.com/free-icons/countries" title="countries icons">Countries icons created by Iconjam - Flaticon</a>
                <a href="https://www.flaticon.com/free-icons/quiz" title="quiz icons">Quiz icons created by Freepik - Flaticon</a>*/
                }
            </div>
        </div>
    )
};

export default Home;