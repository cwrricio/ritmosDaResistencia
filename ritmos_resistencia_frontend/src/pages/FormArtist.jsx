import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import Header from '../components/Header';
import Footer from '../components/Footer';
import ArtistForm from '../components/form/ArtistForm';
import MusicPreview from '../components/form/MusicPreview';
import styles from '../styles/form/FormArtist.module.css';

const FormArtist = () => {
  const navigate = useNavigate();

  const [loggedInUserId, setLoggedInUserId] = useState(null);
  const [loggedInUserName, setLoggedInUserName] = useState('');

  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmarSenha: '',
    nomeArtistico: '',
    nomeMusica: '',
    capaMusica: null,
    audioMusica: null,
    genero: 'rap',
    spotify: '',
    instagram: '',
    sobre: ''
  });

  const [preview, setPreview] = useState({
    image: 'https://via.placeholder.com/300x300',
    title: 'Nome da Música',
    artist: 'Nome do Artista',
    visible: false
  });

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    const userName = localStorage.getItem('userName');
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    if (!isLoggedIn || !userId) {
      toast.info('Para cadastrar um artista, faça login primeiro.', { duration: 3000 });
      navigate('/pages/login');
    } else {
      setLoggedInUserId(userId);
      setLoggedInUserName(userName);
      setFormData(prev => ({ ...prev, nome: userName })); 
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));

    if (name === 'nomeMusica' || name === 'nomeArtistico') {
      setPreview(prev => ({
        ...prev,
        title: name === 'nomeMusica' ? value || 'Nome da Música' : prev.title,
        artist: name === 'nomeArtistico' ? value || 'Nome do Artista' : prev.artist
      }));
    }
  };

  const handleImagePreview = (e) => {
    const file = e.target.files[0];
    if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview({
          image: e.target.result,
          title: formData.nomeMusica || 'Nome da Música',
          artist: formData.nomeArtistico || 'Nome do Artista',
          visible: true
        });
      };
      reader.readAsDataURL(file);
    } else {
        setPreview(prev => ({ ...prev, image: 'https://via.placeholder.com/300x300', visible: false }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setLoading(true);

    if (!loggedInUserId) { 
        setErrorMessage('Usuário não autenticado. Redirecionando para login...');
        toast.error('Erro', { description: 'Usuário não autenticado.' });
        setLoading(false);
        navigate('/pages/login');
        return;
    }

    if (!loggedInUserId && formData.senha !== formData.confirmarSenha) { 
      setErrorMessage('As senhas não coincidem!');
      toast.error('Erro de validação', { description: 'As senhas não coincidem!' });
      setLoading(false);
      return;
    }

    const dataToSend = new FormData();

    if (formData.capaMusica) {
      dataToSend.append('capaMusica', formData.capaMusica);
    } else {
      setErrorMessage('Por favor, selecione uma capa para a música.');
      toast.error('Erro de validação', { description: 'Selecione uma capa para a música.' });
      setLoading(false);
      return;
    }

    if (formData.audioMusica) {
      dataToSend.append('audioMusica', formData.audioMusica);
    } else {
      setErrorMessage('Por favor, selecione o arquivo de áudio da música.');
      toast.error('Erro de validação', { description: 'Selecione o arquivo de áudio da música.' });
      setLoading(false);
      return;
    }

    const artistMusicData = {
      usuario: loggedInUserId ? { idUsuario: loggedInUserId } : { 
        nome: formData.nome, 
        email: formData.email, 
        senha: formData.senha 
      },
      artista: { 
        nomeArtistico: formData.nomeArtistico,
        biografia: formData.sobre,
        spotify: formData.spotify,
        instagram: formData.instagram
      },
      musica: { 
        nomeMusica: formData.nomeMusica,
        genero: formData.genero,
      }
    };

    dataToSend.append('data', JSON.stringify(artistMusicData));

    try {
      const response = await fetch('http://localhost:8080/api/artistas/cadastro-completo', {
        method: 'POST',
        body: dataToSend, 
      });

      if (!response.ok) {
        const errorBody = await response.text(); 
        let message = `Erro HTTP: ${response.status}`;
        try {
            const errorJson = JSON.parse(errorBody);
            message = errorJson.message || errorJson.detail || message;
        } catch (parseError) {
            message = errorBody || message;
        }
        throw new Error(message); 
      }

      const result = await response.json(); 
      console.log('Cadastro completo realizado com sucesso:', result);
      toast.success('Cadastro de artista e música realizado com sucesso!', {
          description: 'Seu perfil foi criado e sua música adicionada.'
      });
      navigate('/'); 

      setFormData({ 
        nome: '', email: '', senha: '', confirmarSenha: '',
        nomeArtistico: '', nomeMusica: '', capaMusica: null, audioMusica: null, genero: 'rap',
        spotify: '', instagram: '', sobre: ''
      });
      setPreview({ image: 'https://via.placeholder.com/300x300', title: 'Nome da Música', artist: 'Nome do Artista', visible: false });

    } catch (error) {
      console.error('Erro ao cadastrar artista e música:', error);
      setErrorMessage(error.message || 'Ocorreu um erro. Tente novamente.');
      toast.error('Erro no cadastro completo', { description: error.message || 'Verifique sua conexão ou tente mais tarde.' });
    } finally {
      setLoading(false);
    }
  };

  if (!loggedInUserId) {
    return (
      <div className={`d-flex flex-column min-vh-100 ${styles.pageContainer}`}>
        <Header />
        <div className="flex-grow-1 d-flex justify-content-center align-items-center text-center">
            <p>Verificando autenticação...</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className={`d-flex flex-column min-vh-100 ${styles.pageContainer}`}>
      <Header />

      <div className={`container ${styles.container}`}>
        <ArtistForm 
          formData={formData}
          onInputChange={handleInputChange}
          onImageChange={handleImagePreview}
          onSubmit={handleSubmit}
          isLoggedIn={!!loggedInUserId} 
          loggedInUserName={loggedInUserName}
        />

        <MusicPreview 
          image={preview.image}
          title={preview.title}
          artist={preview.artist}
          visible={preview.visible}
        />
      </div>

      <Footer />
    </div>
  );
};

export default FormArtist;