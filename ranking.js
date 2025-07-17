function calcularRankingFinal() {
  const promedioEl = document.querySelector("#promedio-general strong");
  const rankingEl = document.querySelector("#ranking strong");

  const ppa = parseFloat(promedioEl.textContent);
  if (isNaN(ppa)) {
    rankingEl.textContent = "-";
    return;
  }

  let ranking = "📄 Regular";

  if (ppa >= 18) {
    ranking = "🏅 Décimo Superior";
  } else if (ppa >= 17) {
    ranking = "🥈 Quinto Superior";
  } else if (ppa >= 16) {
    ranking = "🎖️ Tercio Superior";
  } else if (ppa >= 14.5) {
    ranking = "📘 Medio Superior";
  }

  rankingEl.textContent = ranking;
}

