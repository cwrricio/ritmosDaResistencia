import React from 'react';
import { BsInstagram, BsSpotify } from 'react-icons/bs';

import styles from '../../styles/form/FormArtist.module.css';

const ArtistForm = ({ formData, onInputChange, onImageChange, onSubmit, isLoggedIn, loggedInUserName }) => {
  return (
    <div className={styles.formContainer}>
      <h1>CADASTRO DE ARTISTA E MÚSICA</h1>
      <form onSubmit={onSubmit}>

        {!isLoggedIn ? (
          <>
            <label htmlFor="nome">Seu Nome Completo:</label>
            <input
              type="text"
              id="nome"
              name="nome"
              value={formData.nome}
              onChange={onInputChange}
              placeholder="Digite seu nome completo"
              required
            />

            <label htmlFor="email">Seu Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={onInputChange}
              placeholder="Digite seu email"
              required
            />

            <label htmlFor="senha">Crie uma Senha:</label>
            <input
              type="password"
              id="senha"
              name="senha"
              value={formData.senha}
              onChange={onInputChange}
              placeholder="Crie uma senha"
              required
            />

            <label htmlFor="confirmarSenha">Confirme a Senha:</label>
            <input
              type="password"
              id="confirmarSenha"
              name="confirmarSenha"
              value={formData.confirmarSenha}
              onChange={onInputChange}
              placeholder="Confirme sua senha"
              required
            />
          </>
        ) : (
          <p>Olá, {loggedInUserName}! Complete seu perfil de artista e adicione sua música.</p>
        )}

        {/* --- CAMPOS DO ARTISTA --- */}
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

        <label htmlFor="sobre">Fale sobre você como artista:</label>
        <textarea
          id="sobre"
          name="sobre"
          value={formData.sobre}
          onChange={onInputChange}
          placeholder="Descreva seu trabalho como artista..."
          required
        ></textarea>

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
        </div>

        <label htmlFor="audioMusica">Arquivo de Áudio (.mp3, .wav):</label>
        <div className={styles.fileInput}> 
          <input
            type="file"
            id="audioMusica"
            name="audioMusica"
            accept="audio/mpeg, audio/wav" 
            onChange={onInputChange} 
            required
          />
          <small>Formato permitido: MP3 ou WAV.</small>
        </div>

        <button type="submit">Enviar Formulário</button>
      </form>
    </div>
  );
};

export default ArtistForm;