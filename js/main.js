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
                        <p><strong>${inscripto.Nombre_Completo}</strong></p>
                        <p><span class="field-label">Edad:</span> ${inscripto.Edad} años</p>
                        <p><span class="field-label">Teléfono:</span> ${inscripto.Teléfono}</p>
                        <p><span class="field-label">Cédula:</span> ${inscripto.Cédula}</p>
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