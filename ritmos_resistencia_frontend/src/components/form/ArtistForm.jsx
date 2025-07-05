import React from 'react';
import { BsInstagram } from 'react-icons/bs'; // Bootstrap Icons
import { BsSpotify } from 'react-icons/bs'; // Bootstrap Icons

import styles from '../../styles/FormArtist.module.css';

const ArtistForm = ({ formData, onInputChange, onImageChange, onSubmit }) => {
  return (
    <div className={styles.formContainer}>
      <h1>CADASTRO DE ARTISTA</h1>
      <form onSubmit={onSubmit}>
        <label htmlFor="nome">Nome:</label>
        <input 
          type="text" 
          id="nome" 
          name="nome" 
          value={formData.nome}
          onChange={onInputChange}
          placeholder="Digite seu nome completo" 
          required
        />

        <label htmlFor="nomeArtistico">Nome Artístico:</label>
        <input 
          type="text" 
          id="nomeArtistico" 
          name="nomeArtistico" 
          value={formData.nomeArtistico}
          onChange={onInputChange}
          placeholder="Digite seu nome artístico" 
          required
        />

        <label htmlFor="nomeMusica">Nome da Música:</label>
        <input 
          type="text" 
          id="nomeMusica" 
          name="nomeMusica" 
          value={formData.nomeMusica}
          onChange={onInputChange}
          placeholder="Digite o nome da música" 
          required
        />

        <label htmlFor="capaMusica">Capa da Música:</label>
        <div className={styles.fileInput}>
          <input 
            type="file" 
            id="capaMusica" 
            name="capaMusica" 
            accept="image/jpeg, image/png" 
            onChange={(e) => {
              onInputChange(e);
              onImageChange(e);
            }} 
            required
          />
          <small>Formato permitido: JPEG ou PNG. Tamanho máximo recomendado: 500x500 pixels.</small>
        </div>

        <label htmlFor="genero">Gênero Musical:</label>
        <select 
          id="genero" 
          name="genero" 
          value={formData.genero}
          onChange={onInputChange}
          required
        >
          <option value="rap">Rap</option>
          <option value="rnb">R&B</option>
          <option value="jazz">Jazz</option>
          <option value="mpb">MPB</option>
          <option value="samba">Samba</option>
        </select>

        <label htmlFor="spotify">Spotify:</label>
        <div className={styles.iconInput}>
          <BsSpotify className={styles.icon} />
          <input 
            type="url" 
            id="spotify" 
            name="spotify" 
            value={formData.spotify}
            onChange={onInputChange}
            placeholder="Link do perfil no Spotify"
          />
        </div>

        <label htmlFor="instagram">Instagram:</label>
        <div className={styles.iconInput}>
          <BsInstagram className={styles.icon} />
          <input 
            type="url" 
            id="instagram" 
            name="instagram" 
            value={formData.instagram}
            onChange={onInputChange}
            placeholder="Link do perfil no Instagram"
          />
        </div>

        <label htmlFor="sobre">Fale sobre você como artista:</label>
        <textarea 
          id="sobre" 
          name="sobre" 
          value={formData.sobre}
          onChange={onInputChange}
          placeholder="Descreva seu trabalho como artista..." 
          required
        ></textarea>

        <button type="submit">Enviar Formulário</button>
      </form>
    </div>
  );
};

export default ArtistForm;