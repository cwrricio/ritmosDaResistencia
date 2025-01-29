function previewImage(event) {
    const fileInput = document.getElementById('capaMusica');
    const previewContainer = document.getElementById('preview');
    const previewImage = document.getElementById('previewImage');
    const previewTitle = document.getElementById('previewTitle');
    const previewArtist = document.getElementById('previewArtist');

    const file = fileInput.files[0];
    if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
      const reader = new FileReader();
      reader.onload = function (e) {
        previewImage.src = e.target.result;
        previewTitle.innerText = document.getElementById('nomeMusica').value || 'Nome da Música';
        previewArtist.innerText = document.getElementById('nomeArtistico').value || 'Nome do Artista';
      };
      reader.readAsDataURL(file);
      previewContainer.style.display = 'block';
    }
  }