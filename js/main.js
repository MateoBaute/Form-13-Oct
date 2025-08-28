document.addEventListener("DOMContentLoaded", mostrarInscripto);

function mostrarInscripto() {
    fetch('./API/mostrar.php')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la respuesta del servidor');
            }
            return response.json();
        })
        .then(data => {
            let container = document.getElementById('mostrarInscriptos');
            container.innerHTML = ""; // Limpiar el contenedor

            // Verificar si hay datos
            if (data.length === 0) {
                container.innerHTML = '<div class="error">No hay inscriptos para mostrar</div>';
                return;
            }

            // Crear cards para cada inscripto
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
                    `;

                container.appendChild(card);
            });
        })
        .catch(error => {
            console.error('Error al cargar los inscriptos:', error);
            let container = document.getElementById('cardsContainer');
            container.innerHTML = `<div class="error">Error al cargar los datos: ${error.message}</div>`;
        });
}