function filtrarInscriptos() {
    let numeroCorredor = document.getElementById("filtrarCorredor").value;
    
    // Si el campo está vacío, mostrar todos los inscriptos
    if (numeroCorredor === '') {
        mostrarInscripto();
        return;
    }
    
    fetch(`API/filtrar.php?filtrarCorredor=${numeroCorredor}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Error en la respuesta del servidor');
            }
            return response.json();
        })
        .then((data) => {
            mostrarResultadosFiltrados(data);
        })
        .catch((error) => {
            console.error("Error:", error);
            let container = document.getElementById('mostrarInscriptos');
            container.innerHTML = `<div class="error">Error al filtrar: ${error.message}</div>`;
        });
}

function mostrarResultadosFiltrados(data) {
    let container = document.getElementById('mostrarInscriptos');
    container.innerHTML = ""; // Limpiar el contenedor

    // Verificar si hay datos
    if (data.length === 0) {
        container.innerHTML = '<div class="error">No se encontraron corredores con ese número</div>';
        return;
    }

    // Crear cards para los resultados filtrados
    let cardsContainer = document.createElement('div');
    cardsContainer.className = 'cards-container';
    
    data.forEach(inscripto => {
        let card = document.createElement('div');
        card.className = 'card';

        card.innerHTML = `
            <p><strong>${inscripto.nombre_completo}</strong></p>
            <p><span class="field-label">Edad:</span> ${inscripto.edad} años</p>
            <p><span class="field-label">Teléfono:</span> ${inscripto.nmro_teléfono}</p>
            <p><span class="field-label">Cédula:</span> ${inscripto.cédula}</p>
            <p><span class="field-label">Categoría:</span> ${inscripto.categoría}</p>
            <p><span class="field-label">Género:</span> ${inscripto.género}</p>
            <p><span class="field-label">Talla:</span> ${inscripto.talla}</p>
            <p><span class="field-label">Distancia:</span> ${inscripto.distancia}</p>
            <p><span class="field-label">Número de Corredor:</span> ${inscripto.nmro_corredor}</p>
        `;

        cardsContainer.appendChild(card);
    });
    
    container.appendChild(cardsContainer);
}

// Añadir event listener para el input
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("filtrarCorredor").addEventListener("input", filtrarInscriptos);
    mostrarInscripto(); // Mostrar todos los inscriptos al cargar la página
});