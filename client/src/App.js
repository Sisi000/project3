
//import logo from './logo.svg';
import NavBar from './components/Navbar/NavBar';
import About from './components/About/about';
import Home from './components/Home/home';
import UploadS3 from './components/uploadS3/UploadS3'
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
//import './App.css';

function App() {
  return (
    <>
    <Router>
      <div className='App'>
      <NavBar />
        <UploadS3 />
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
