const enlaceOlvido = document.getElementById('link-olvido');
const nelsonContainer = document.getElementById('nelson-container');
const audioNelson = document.getElementById('audio-nelson');

enlaceOlvido.addEventListener('click', function(e) {
    e.preventDefault();

    nelsonContainer.classList.remove('oculto');

    audioNelson.currentTime = 0; 
    audioNelson.play().catch(error => {
        console.log("El navegador bloqueó el autoplay sin interacción previa:", error);
    });

    setTimeout(function() {
        nelsonContainer.classList.add('oculto');
    }, 2000);
});