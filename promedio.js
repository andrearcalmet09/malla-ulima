function guardarDatosPrevios() {
  const ppa = parseFloat(document.getElementById("ppa-anterior").value) || 0;
  const creditos = parseInt(document.getElementById("creditos-previos").value) || 0;
  const ppc = parseFloat(document.getElementById("ppc-anterior").value) || 0;

  localStorage.setItem("ppaAnterior", ppa);
  localStorage.setItem("creditosPrevios", creditos);
  localStorage.setItem("ppcAnterior", ppc);

  actualizarPromedios();
}

function calcularPromediosCursosActuales() {
  let sumaNotas = 0;
  let sumaCreditos = 0;

  if (!window.evaluacionesData || !window.cursosActivos) return { ppc: 0, creditos: 0 };

  cursosActivos.forEach((curso) => {
    const evaluaciones = evaluacionesData[curso.nombre];
    if (!evaluaciones) return;

    let totalPeso = 0;
    let notaFinal = 0;

    evaluaciones.forEach((ev) => {
      totalPeso += ev.peso;
      notaFinal += (ev.nota * ev.peso) / 100;
    });

    if (Math.round(totalPeso) === 100) {
      sumaNotas += notaFinal * curso.creditos;
      sumaCreditos += curso.creditos;
    }
  });

  const ppc = sumaCreditos ? (sumaNotas / sumaCreditos).toFixed(2) : 0;
  return { ppc: parseFloat(ppc), creditos: sumaCreditos };
}

function actualizarPromedios() {
  const ppaAnterior = parseFloat(localStorage.getItem("ppaAnterior")) || 0;
  const creditosPrevios = parseInt(localStorage.getItem("creditosPrevios")) || 0;

  const { ppc, creditos: creditosCiclo } = calcularPromediosCursosActuales();

  const sumaNotas = (ppaAnterior * creditosPrevios) + (ppc * creditosCiclo);
  const totalCreditos = creditosPrevios + creditosCiclo;

  const nuevoPPA = totalCreditos ? (sumaNotas / totalCreditos).toFixed(2) : 0;

  document.querySelector("#promedio-general strong").textContent = nuevoPPA;
  document.querySelector("#ranking strong").textContent = determinarRanking(nuevoPPA);

  // Guardamos el nuevo PPC también
  localStorage.setItem("ppcActual", ppc);
  localStorage.setItem("creditosActuales", creditosCiclo);
}
