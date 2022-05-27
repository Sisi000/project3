//import logo from './logo.svg';
import NavBar from './components/Navbar/NavBar';
import About from './components/About/about';
import Home from './components/Home/home';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
//import './App.css';

function App() {
  return (
    <>
    <Router>
      <div className='App'>
      <NavBar />
      <div className='content'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
      </div>
    </Router>
    </>
  );
}

export default App;
