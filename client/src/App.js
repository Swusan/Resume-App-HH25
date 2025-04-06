import { Routes, Route } from 'react-router-dom';
import './App.css';
import NavBar from './NavBar';
import Tools from './Tools';
import Home from './Home';

function App() {
  var use_load = sessionStorage['use_load'] || 'false';
  if (use_load === 'true')
  {
    sessionStorage['use_load'] = 'false';
    return (
      <div className="App" id="App">
        <div className="enter-transition" id="Loader"></div>
        <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tools" element={<Tools />} />
          </Routes>
  
      </div>
    );
  }
  else
  {
    return (
      <div className="App" id="App">
        <div className="" id="Loader"></div>
        <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tools" element={<Tools />} />
          </Routes>
  
      </div>
    );
  }
}

export default App;