import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ArtistForm from '../components/form/ArtistForm';
import MusicPreview from '../components/form/MusicPreview';
import styles from '../styles/FormArtist.module.css';

const FormArtist = () => {
  const [formData, setFormData] = useState({
    nome: '',
    nomeArtistico: '',
    nomeMusica: '',
    capaMusica: null,
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

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));

    // Atualiza preview em tempo real
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
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validação e envio do formulário
    console.log('Dados do formulário:', formData);
    // Aqui você pode adicionar a lógica de envio para o backend
  };

  return (
    <div className={`d-flex flex-column min-vh-100 ${styles.pageContainer}`}>
      <Header />
      
      <div className={`container ${styles.container}`}>
        <ArtistForm 
          formData={formData}
          onInputChange={handleInputChange}
          onImageChange={handleImagePreview}
          onSubmit={handleSubmit}
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