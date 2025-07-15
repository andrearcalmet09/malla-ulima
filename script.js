fetch('malla.json')
  .then(response => response.json())
  .then(data => {
    const container = document.getElementById('malla-container');
    const creditosDiv = document.getElementById('creditos-totales');

    const cursosPorSemestre = {};
    data.forEach(curso => {
      const sem = Number(curso.semestre);
      if (!cursosPorSemestre[sem]) {
        cursosPorSemestre[sem] = [];
      }
      cursosPorSemestre[sem].push(curso);
    });

    const semestresOrdenados = Object.keys(cursosPorSemestre)
      .map(Number)
      .sort((a, b) => a - b);

    let creditosAprobados = 0;

    function actualizarCreditos() {
      creditosDiv.textContent = `Créditos aprobados: ${creditosAprobados}`;
    }

    semestresOrdenados.forEach(semestre => {
      const columna = document.createElement('div');
      columna.className = 'semestre';

      const titulo = document.createElement('h2');
      titulo.textContent = `Semestre ${semestre}`;
      columna.appendChild(titulo);

      cursosPorSemestre[semestre].forEach(curso => {
        const div = document.createElement('div');
        div.className = 'curso';
        div.textContent = `${curso.nombre} (${curso.creditos} créditos)`;

        // Manejar clic para marcar/desmarcar como aprobado
        div.addEventListener('click', () => {
          if (div.classList.contains('aprobado')) {
            div.classList.remove('aprobado');
            creditosAprobados -= curso.creditos;
          } else {
            div.classList.add('aprobado');
            creditosAprobados += curso.creditos;
          }
          actualizarCreditos();
        });

        columna.appendChild(div);
      });

      container.appendChild(columna);
    });

    actualizarCreditos();
  })
  .catch(error => {
    console.error('Error al cargar la malla:', error);
  });
