const cursos = [
  {
    semestre: 1,
    nombre: "Globalización y Realidad Nacional",
    creditos: 3,
    tipo: "obligatorio"
  },
  {
    semestre: 1,
    nombre: "Lenguaje y Comunicación I",
    creditos: 4,
    tipo: "obligatorio"
  },
  {
    semestre: 1,
    nombre: "Metodologías de Investigación",
    creditos: 3,
    tipo: "obligatorio"
  },
  {
    semestre: 1,
    nombre: "Desarrollo Personal y Social",
    creditos: 3,
    tipo: "obligatorio"
  },
  {
    semestre: 1,
    nombre: "Matemática Básica",
    creditos: 5,
    tipo: "obligatorio"
  },
  {
    semestre: 2,
    nombre: "Economía y Empresa",
    creditos: 3,
    tipo: "obligatorio"
  },
  // Añade más cursos aquí...
  {
    semestre: 8,
    nombre: "Turismo Sostenible",
    creditos: 3,
    tipo: "electivo"
  },
  {
    semestre: 8,
    nombre: "Agilidad Organizacional",
    creditos: 3,
    tipo: "electivo"
  }
];

let creditosAprobados = 0;
let creditosElectivos = 0;

function crearMalla() {
  const container = document.getElementById("malla-container");
  container.innerHTML = "";

  for (let i = 1; i <= 10; i++) {
    const semestreDiv = document.createElement("div");
    semestreDiv.className = "semestre";

    const h2 = document.createElement("h2");
    h2.textContent = `Semestre ${i}`;
    semestreDiv.appendChild(h2);

    cursos
      .filter(curso => curso.semestre === i)
      .forEach(curso => {
        const div = document.createElement("div");
        div.className = "curso";
        if (curso.tipo === "electivo") {
          div.classList.add("electivo");
        }

        div.textContent = `${curso.nombre} (${curso.creditos} créditos)`;

        div.addEventListener("click", () => {
          div.classList.toggle("aprobado");

          if (div.classList.contains("aprobado")) {
            creditosAprobados += curso.creditos;
            if (curso.tipo === "electivo") {
              creditosElectivos += curso.creditos;
            }
          } else {
            creditosAprobados -= curso.creditos;
            if (curso.tipo === "electivo") {
              creditosElectivos -= curso.creditos;
            }
          }

          actualizarContador();
        });

        semestreDiv.appendChild(div);
      });

    container.appendChild(semestreDiv);
  }
}

function actualizarContador() {
  document.getElementById("creditos-totales").textContent = 
    `Créditos aprobados: ${creditosAprobados} (Electivos: ${creditosElectivos})`;
}

crearMalla();
