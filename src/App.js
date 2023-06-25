import NavBar from './NavBar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <div className='content'>

        </div>
      </div>
    </Router>
  );
}

export default App;
