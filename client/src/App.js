
//import logo from './logo.svg';
import NavBar from './components/Navbar/NavBar';
import About from './components/About/about';
import Home from './components/Home/home';
import Footer from './components/Footer/footer';
import UploadS3 from './components/uploadS3/UploadS3'
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
          <Route path="/upload" element={<UploadS3 />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
      </div>
      <Footer />
    </Router>
    </>
  );
}

export default App;
