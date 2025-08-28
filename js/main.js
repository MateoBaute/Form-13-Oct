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

            // Agrupar inscriptos por distancia
            let inscriptosPorDistancia = {
                '4km': [],
                '8km': []
            };

            data.forEach(inscripto => {
                if (inscripto.distancia === '4km') {
                    inscriptosPorDistancia['4km'].push(inscripto);
                } else if (inscripto.distancia === '8km') {
                    inscriptosPorDistancia['8km'].push(inscripto);
                }
            });

            // Crear secciones para cada distancia
            for (let distancia in inscriptosPorDistancia) {
                if (inscriptosPorDistancia[distancia].length > 0) {
                    // Crear contenedor para la distancia
                    let distanciaSection = document.createElement('div');
                    distanciaSection.className = 'distancia-section';
                    
                    // Título de la sección
                    let titulo = document.createElement('h2');
                    titulo.textContent = `Corredores ${distancia}`;
                    titulo.className = 'distancia-titulo';
                    distanciaSection.appendChild(titulo);
                    
                    // Contenedor para las cards de esta distancia
                    let cardsContainer = document.createElement('div');
                    cardsContainer.className = 'cards-container';
                    
                    // Crear cards para cada inscripto de esta distancia
                    inscriptosPorDistancia[distancia].forEach(inscripto => {
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
                    
                    distanciaSection.appendChild(cardsContainer);
                    container.appendChild(distanciaSection);
                }
            }
        })
        .catch(error => {
            console.error('Error al cargar los inscriptos:', error);
            let container = document.getElementById('mostrarInscriptos');
            container.innerHTML = `<div class="error">Error al cargar los datos: ${error.message}</div>`;
        });
        }