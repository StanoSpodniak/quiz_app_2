import Home from './Home/Home';
import NavBar from './NavBar/NavBar';
import Quiz from './Quiz/Quiz';
import EndGame from './Quiz/EndGame/EndGame';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/quiz/endGame/:score/:questionCount" element={<EndGame />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
