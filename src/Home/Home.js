import "./Home.css";
import categories from "../data/categories";

const Home = () => {
    const quizCategories = {categories};
    
    return (
        <div className="main-container">
            <div className="header">
                <h2>Online free quizzes</h2>
            </div>
            {/* search bar will be here */}
            <div className="quiz-categories">
                {quizCategories.categories.categories.map((category) => (
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
                ))}
                {/* attribution: <a href="https://www.flaticon.com/free-icons/geography" title="geography icons">Geography icons created by Freepik - Flaticon</a> 
                <a href="https://www.flaticon.com/free-icons/history" title="history icons">History icons created by Freepik - Flaticon</a>
                <a href="https://www.flaticon.com/free-icons/biology" title="biology icons">Biology icons created by Eucalyp - Flaticon</a>*/}
            </div>
        </div>
    )
};

export default Home;