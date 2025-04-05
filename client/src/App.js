import { Routes, Route } from 'react-router-dom';
import './App.css';
import NavBar from './NavBar';
import Tools from './Tools';
import Home from './Home';

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tools" element={<Tools />} />
      </Routes>

    </div>
  );
}

export default App;