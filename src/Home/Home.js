import "./Home.css";

const Home = () => {
    return (
        <div className="main-container">
            <div className="header">
                <h2>Online free quizzes</h2>
            </div>
            {/* also search bar will be here */}
            <div className="quiz-categories">
                <div className="category" id="geography">
                    <img src="icons/geography.png" alt="geography icon" />
                    <h2>GEOGRAPHY</h2>
                </div>
                <div className="quizzes">
                    <a href="/quiz"><button>Geography Easy</button></a>
                    <button>Geography Medium</button>
                    <button>Geography Hard</button>
                </div>
                <div className="category" id="history">
                    <img src="icons/history.png" alt="history icon" />
                    <h2>HISTORY</h2>
                </div>
                <div className="quizzes">
                    <button>History Easy</button>
                    <button>History Medium</button>
                    <button>History Hard</button>
                    <button>History Hard</button>
                </div>
                {/* attribution: <a href="https://www.flaticon.com/free-icons/geography" title="geography icons">Geography icons created by Freepik - Flaticon</a> 
                <a href="https://www.flaticon.com/free-icons/history" title="history icons">History icons created by Freepik - Flaticon</a>*/}
            </div>
        </div>
    )
};

export default Home;