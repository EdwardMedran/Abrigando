/* =========================================
   LÓGICA DE AYUDA (Copiar y Formularios)
   ========================================= */
   
   //(Para Apadrina, Donaciones y Hogar Temporal)

// Función para copiar al portapapeles (Página Donaciones)
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        // Podrías cambiar el alert por un mensaje más bonito después
        alert("¡Copiado al portapapeles!: " + text);
    }).catch(err => {
        console.error('Error al copiar: ', err);
    });
}

// Función para pre-seleccionar perro (Página Apadrina)
function selectDog(dogName) {
    const select = document.getElementById('ahijado');
    if (select) {
        select.value = dogName;
        document.getElementById('formulario-apadrinar').scrollIntoView({ behavior: 'smooth' });
    }
}

// Manejo de envíos de formularios de ayuda
document.querySelectorAll('.styled-form').forEach(form => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('¡Solicitud enviada con éxito! Revisaremos tus datos y te contactaremos pronto.');
        form.reset();
    });
});