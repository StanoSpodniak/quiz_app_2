import { useState, useEffect } from 'react';
import categories from "../data/categories";
import "./Home.css";

const Home = () => {
    const quizCategories = {categories};

    const [quizNames, setQuizNames] = useState([]);

    const [searchTerm, setSearchTerm] = useState('');
    const [search, setSearch] = useState(false);
    const [searchResult, setSearchResult] = useState({});
    
    useEffect(() => {
        if (searchResult.length > 0) {
            setSearch(true);
        }

    }, [searchResult]);

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if(searchTerm.length >= 3) {
            let quizzes =  quizCategories.categories.categories.map((category) => 
                category.quizzes.map((quiz) => {
                    return quiz.name;
                })
            );
            setQuizNames(quizzes);

            //first check if category name includes searchTerm, if yes show whole category as a result
            /*let searhedCategories = quizCategories.categories.categories.map((category) => category);
            let results = searhedCategories.filter((category) => category.name.includes(searchTerm.toLowerCase()));

            if (results.length > 0) {
                setSearchResult(results);
            }*/
            
            let results = quizCategories.categories.categories.map((category) => {
                return category.quizzes.filter((quiz) => quiz.name.includes(searchTerm));
            })
            results = results.filter((quiz) => quiz.length > 0);
            
            if (results.length > 0) {
                setSearchResult(results.map(result => result));
            } else {
                results[0] = "Sorry, there is no search result for you querry.";
            }

            setSearch(true);

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
                    quizCategories.categories.categories.map((category) => {
                        if(category.nameCapitalized.includes(searchTerm.toUpperCase())) {
                            return (
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
                            );
                        } else if (quizNames[0].includes(searchTerm)) {
                            console.log(quizNames[0]);
                            return (
                                <div key={category.id}>
                                    {searchResult.map((quiz) => (
                                        <div className="quizzes">
                                            {quiz.map((quiz) =>
                                                <a key={quiz.id} href={`/quiz/${quiz.category}/${quiz.name}/${quiz.tag}`}><button>{quiz.name}</button></a>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            );


                            /*searchResult.map((quiz) => {
                                <div className="quizzes">
                                    {quiz.map((quiz) =>
                                        <a key={quiz.id} href={`/quiz/${quiz.category}/${quiz.name}/${quiz.tag}`}><button>{quiz.name}</button></a>
                                    )}
                                </div>
                            })*/

                            /*category.quizzes.map((quiz) => {
                                return (<a key={quiz.id} href={`/quiz/${category.name}/${quiz.name}/${quiz.tag}`}><button>{quiz.name}</button></a>)
                                if(quiz.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                                    return (
                                        <div className="quizzes">
                                            <a key={quiz.id} href={`/quiz/${category.name}/${quiz.name}/${quiz.tag}`}><button>{quiz.name}</button></a>
                                        </div>
                                    );
                                }
                            })*/
                        }


                            /*quizCategories.categories.categories.quizzes.map((quiz) => {
                                if(quiz.name.includes(searchTerm.toLowerCase())) {
                                    return (
                                        <div className="quizzes">
                                            {category.quizzes.map((quiz) => (
                                                <a key={quiz.id} href={`/quiz/${category.name}/${quiz.name}/${quiz.tag}`}><button>{quiz.name}</button></a>
                                            ))}
                                        </div>)
                                } else {
                                    return (<p>There are no results for your search querry.</p>)
                                }
                            })*/
                    })
                    
                    /*quizCategories.categories.categories.quizzes.map((quiz) => {
                        if(quiz.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                            return (
                                <div className="quizzes">
                                    <a key={quiz.id} href={`/quiz/${quiz.category}/${quiz.name}/${quiz.tag}`}><button>{quiz.name}</button></a>
                                </div>
                            );
                        }
                    })*/

                    /* 
                    quizCategories.categories.categories.map((category) => (
                        <div key={category.id}>
                            <div className="category" key={category.id} style={{backgroundColor: `${category.backgroundColor}`}}>
                                <img src={`icons/${category.name}.png`} alt={`${category.name} icon`} />
                                <h2 style={{color: `${category.color}`}} >{category.nameCapitalized}</h2>
                            </div>
                            {searchResult.map((quiz) => (
                                <div className="quizzes">
                                    {quiz.map((quiz) =>
                                        <a key={quiz.id} href={`/quiz/${quiz.category}/${quiz.name}/${quiz.tag}`}><button>{quiz.name}</button></a>
                                    )}
                                </div>
                            ))}
                        </div>
                    ))
                    */
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