let time=2000,
currentImageIndex = 0,
images = document.querySelectorAll("#slider img")
max = images.length;

function nextImage(){
    images[currentImageIndex].classList.remove("selected")
    currentImageIndex++
    if(currentImageIndex >= max)
        currentImageIndex = 0
    images[currentImageIndex].classList.add("selected")
}

function start(){
setInterval(() =>{nextImage("funcao rodada")}, time) //troca de imagem
}

window.addEventListener("load", start)