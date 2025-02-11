import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './pages/homepage';
import MusicPage from './pages/musicapp';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/download" element={<MusicPage />} />
      </Routes>
    </Router>
  );
}

export default App;