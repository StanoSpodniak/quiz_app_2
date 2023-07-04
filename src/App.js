import NavBar from './NavBar/NavBar';
import Quiz from './Quiz/Quiz';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Quiz />
      </div>
    </Router>
  );
}

export default App;
