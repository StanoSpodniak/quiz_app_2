import Home from './Home/Home';
import NavBar from './NavBar/NavBar';
import Quiz from './Quiz/Quiz';
import EndGame from './EndGame/EndGame';
import Footer from './Footer/Footer';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/quiz/:category/:quizName/:tag/:id" element={<Quiz />} />
            <Route path="/quiz/:category/:quizName/:tag/:id/endGame/:score/:questionCount" element={<EndGame />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
