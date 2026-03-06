/* =========================================
   LÓGICA PARA PERFILES DE PERRITOS
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Funcionalidad de la Galería
    const galleryImages = document.querySelectorAll('.gallery-image');
    
    galleryImages.forEach(img => {
        img.addEventListener('click', function() {
            const src = this.getAttribute('src');
            const alt = this.getAttribute('alt');
            
            // Aquí podrías implementar un modal, por ahora usamos un alert informativo mejorado
            console.log(`Visualizando: ${alt}`);
            alert(`Vista ampliada de: ${alt}\n(Próximamente: Implementación de visualizador Modal)`);
        });
    });

    // 2. Manejo del Formulario de Adopción
    const adoptionForm = document.querySelector('#formulario form');
    
    if (adoptionForm) {
        adoptionForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Obtenemos el nombre del perro desde el H1 de la página
            const dogName = document.querySelector('h1').innerText;
            const userName = document.getElementById('nombre').value;

            alert(`¡Gracias ${userName}! Tu solicitud para adoptar a ${dogName} ha sido enviada. Nos comunicaremos contigo pronto para la entrevista.`);
            
            adoptionForm.reset();
        });
    }
});