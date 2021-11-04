import './App.css'
import {
  BrowserRouter as Router
} from "react-router-dom";
import Routes from './routes';
import Header from './components/header/Header';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
          <ToastContainer
            position="bottom-left"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        <Routes />
      </Router>
    </div>
  );
}

export default App;
