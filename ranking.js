document.addEventListener("DOMContentLoaded", () => {
  mostrarRanking();
});

function mostrarRanking() {
  const ppa = parseFloat(localStorage.getItem("ppaAnterior")) || 0;
  const creditos = parseInt(localStorage.getItem("creditosPrevios")) || 0;

  const ppc = parseFloat(localStorage.getItem("ppcActual")) || 0;
  const creditosActuales = parseInt(localStorage.getItem("creditosActuales")) || 0;

  const sumaNotas = (ppa * creditos) + (ppc * creditosActuales);
  const totalCreditos = creditos + creditosActuales;

  const nuevoPPA = totalCreditos ? (sumaNotas / totalCreditos).toFixed(2) : 0;
  const ranking = determinarRanking(nuevoPPA);

  const ppaEl = document.querySelector("#promedio-general strong");
  const rankingEl = document.querySelector("#ranking strong");

  if (ppaEl && rankingEl) {
    ppaEl.textContent = nuevoPPA;
    rankingEl.textContent = ranking;
  }
}

function determinarRanking(promedio) {
  const p = parseFloat(promedio);
  if (p >= 18) return "🏅 Décimo Superior";
  if (p >= 17) return "🥈 Quinto Superior";
  if (p >= 16) return "🎖️ Tercio Superior";
  if (p >= 14.5) return "📘 Medio Superior";
  return "📄 Regular";
}
