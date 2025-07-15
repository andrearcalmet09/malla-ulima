// Cargar la malla desde el archivo JSON
fetch('malla.json')
  .then(response => response.json())
  .then(data => {
    const container = document.getElementById('malla-container');
    const creditosDiv = document.getElementById('creditos-totales');

    // Agrupar cursos por semestre
    const cursosPorSemestre = {};
    data.forEach(curso => {
      if (!cursosPorSemestre[curso.semestre]) {
        cursosPorSemestre[curso.semestre] = [];
      }
      cursosPorSemestre[curso.semestre].push(curso);
    });

    // Ordenar semestres del 1 al 10
    const semestresOrdenados = Object.keys(cursosPorSemestre)
      .map(Number)
      .sort((a, b) => a - b);

    let creditosAprobados = 0;

    // Crear columna por semestre
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

        // Simular que los cursos del semestre 1 están aprobados
        if (semestre === 1) {
          div.classList.add('aprobado');
          creditosAprobados += curso.creditos;
        }

        columna.appendChild(div);
      });

      container.appendChild(columna);
    });

    // Mostrar créditos aprobados
    creditosDiv.textContent = `Créditos aprobados: ${creditosAprobados}`;
  })
  .catch(error => {
    console.error('Error al cargar la malla:', error);
  });
