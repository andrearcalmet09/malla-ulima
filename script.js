let creditosTotales = 0;

function actualizarCreditos() {
  document.getElementById('creditos-totales').textContent =
    `Créditos aprobados: ${creditosTotales}`;
}

fetch('malla.json')
  .then(response => response.json())
  .then(data => {
    const container = document.getElementById('malla-container');

    data.forEach((semestreCursos, index) => {
      const semestreDiv = document.createElement('div');
      semestreDiv.className = 'semestre';

      const titulo = document.createElement('h2');
      titulo.textContent = `Semestre ${index + 1}`;
      semestreDiv.appendChild(titulo);

      semestreCursos.forEach(curso => {
        const div = document.createElement('div');
        div.className = `curso ${curso.tipo}`;
        div.textContent = `${curso.nombre} (${curso.creditos} créditos)`;

        div.addEventListener('click', () => {
          if (!div.classList.contains('completado')) {
            div.classList.add('completado');
            creditosTotales += curso.creditos;
          } else {
            div.classList.remove('completado');
            creditosTotales -= curso.creditos;
          }
          actualizarCreditos();
        });

        semestreDiv.appendChild(div);
      });

      container.appendChild(semestreDiv);
    });

    actualizarCreditos();
  })
  .catch(error => {
    console.error('Error al cargar malla.json:', error);
    alert('No se pudo cargar la malla curricular. Revisa el archivo malla.json.');
  });
