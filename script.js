let creditosAprobados = 0;

function actualizarCreditos() {
  document.getElementById('creditos-totales').textContent = `Créditos aprobados: ${creditosAprobados}`;
}

fetch('malla.json')
  .then(response => response.json())
  .then(data => {
    const container = document.getElementById('malla-container');

    data.forEach((semestre, index) => {
      const divSemestre = document.createElement('div');
      divSemestre.classList.add('semestre');

      const titulo = document.createElement('h2');
      titulo.textContent = `Semestre ${index + 1}`;
      divSemestre.appendChild(titulo);

      semestre.forEach(curso => {
        const divCurso = document.createElement('div');
        divCurso.classList.add('curso');
        divCurso.classList.add(curso.tipo); // obligatorio o electivo
        divCurso.textContent = `${curso.nombre} (${curso.creditos} créditos)`;

        divCurso.addEventListener('click', () => {
          divCurso.classList.toggle('seleccionado');
          if (divCurso.classList.contains('seleccionado')) {
            creditosAprobados += curso.creditos;
          } else {
            creditosAprobados -= curso.creditos;
          }
          actualizarCreditos();
        });

        divSemestre.appendChild(divCurso);
      });

      container.appendChild(divSemestre);
    });
  });

actualizarCreditos();
