import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Support from './pages/Support';
import Login from './pages/Login';
import FormArtist from './pages/FormArtist';
import Cadastro from './pages/Register';
import MusicPlayer from './pages/MusicPlayer';
import Donation from './pages/Donation';
import { Toaster } from 'sonner';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="pages/apoie" element={<Support />} />
        <Route path="pages/login" element={<Login />} />
        <Route path="pages/formulario" element={<FormArtist />} />
        <Route path="pages/cadastro" element={<Cadastro />} />
        <Route path="pages/player" element={<MusicPlayer />} />
        <Route path="/doacao/:idArtista" element={<Donation />} />
      </Routes>
      <Toaster richColors position="top-right" />
    </Router>
  );
}

export default App;