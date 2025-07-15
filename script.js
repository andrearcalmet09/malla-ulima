// script.js
fetch('malla.json')
  .then(res => res.json())
  .then(data => generarMalla(data));

let totalCreditos = 0;
let totalElectivos = 0;

function generarMalla(malla) {
  const container = document.getElementById('malla-container');

  malla.sort((a, b) => a.semestre - b.semestre);

  for (let i = 1; i <= 10; i++) {
    const columna = document.createElement('div');
    columna.className = 'semestre';

    const header = document.createElement('h2');
    header.textContent = `Semestre ${i}`;
    columna.appendChild(header);

    const cursosSemestre = malla.filter(c => c.semestre === i);
    cursosSemestre.forEach(curso => {
      const div = document.createElement('div');
      div.classList.add('curso');
      div.classList.add(curso.electivo ? 'electivo' : 'obligatorio');
      div.textContent = `${curso.nombre} (${curso.creditos} créditos)`;

      div.addEventListener('click', () => {
        if (!div.classList.contains('seleccionado')) {
          div.classList.add('seleccionado');
          totalCreditos += curso.creditos;
          if (curso.electivo) totalElectivos += curso.creditos;
        } else {
          div.classList.remove('seleccionado');
          totalCreditos -= curso.creditos;
          if (curso.electivo) totalElectivos -= curso.creditos;
        }
        actualizarCreditos();
      });

      columna.appendChild(div);
    });
    container.appendChild(columna);
  }

  actualizarCreditos();
}

function actualizarCreditos() {
  const div = document.getElementById('creditos-totales');
  div.textContent = `Créditos aprobados: ${totalCreditos} (Electivos: ${totalElectivos})`;
}  
