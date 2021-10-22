import './App.css'
import {
  BrowserRouter as Router
} from "react-router-dom";
import Routes from './routes';
import Header from './components/header/Header';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />

        <Routes />
      </Router>
    </div>
  );
}

export default App;
