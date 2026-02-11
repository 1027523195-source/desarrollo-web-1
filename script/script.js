const input = document.getElementById("textoNota");
const boton = document.getElementById("btnAgregar");
const contenedorNotas = document.getElementById("notas");
const selectorColor = document.getElementById("colorNota");
const selectorForma = document.getElementById("formaNota");

boton.addEventListener("click", agregarNota);

function agregarNota() {
  const texto = input.value.trim();
  if (texto === "") return;

  const nota = document.createElement("div");
  nota.classList.add("nota");

  // Color de fondo elegido
  const colorFondo = selectorColor.value;
  nota.style.backgroundColor = colorFondo;

  // Color de texto complementario
  nota.style.color = obtenerColorComplementario(colorFondo);

  // Forma elegida
  nota.classList.add(selectorForma.value);

  // Posición inicial aleatoria
  nota.style.left = Math.random() * 400 + "px";
  nota.style.top = Math.random() * 300 + "px";

  // Contenedor interno
  const contenido = document.createElement("div");
  contenido.classList.add("contenido");

  // Texto o lista
  const lineas = texto.split("\n");
  if (lineas.length > 1) {
    const ul = document.createElement("ul");
    lineas.forEach(linea => {
      if (linea.trim() !== "") {
        const li = document.createElement("li");
        li.textContent = linea;
        ul.appendChild(li);
      }
    });
    contenido.appendChild(ul);
  } else {
    contenido.textContent = texto;
  }

  nota.appendChild(contenido);

  // Ajuste dinámico de tamaño para círculo
  setTimeout(() => {
    const altura = nota.scrollHeight;
    if (selectorForma.value === "circulo") {
      nota.style.width = altura + "px";
      nota.style.height = altura + "px";
    } else {
      nota.style.height = altura + "px";
    }
  }, 0);

  hacerArrastrable(nota);

  // Doble clic para eliminar
  nota.addEventListener("dblclick", () => {
    nota.remove();
  });

  contenedorNotas.appendChild(nota);
  input.value = "";
}

/* FUNCIÓN DRAG */
function hacerArrastrable(elemento) {
  let offsetX = 0;
  let offsetY = 0;
  let arrastrando = false;

  elemento.addEventListener("mousedown", (e) => {
    arrastrando = true;
    offsetX = e.clientX - elemento.offsetLeft;
    offsetY = e.clientY - elemento.offsetTop;
    elemento.style.zIndex = 1000;
  });

  document.addEventListener("mousemove", (e) => {
    if (!arrastrando) return;
    elemento.style.left = (e.clientX - offsetX) + "px";
    elemento.style.top = (e.clientY - offsetY) + "px";
  });

  document.addEventListener("mouseup", () => {
    arrastrando = false;
    elemento.style.zIndex = 1;
  });
}

/* FUNCIONES AUXILIARES */

/**
 * Devuelve el color complementario de un color hexadecimal
 * color: "#RRGGBB"
 * retorno: "#RRGGBB" complementario
 */
function obtenerColorComplementario(color) {
  const r = parseInt(color.substr(1,2),16);
  const g = parseInt(color.substr(3,2),16);
  const b = parseInt(color.substr(5,2),16);

  const rComp = 255 - r;
  const gComp = 255 - g;
  const bComp = 255 - b;

  const compHex = "#" + 
    rComp.toString(16).padStart(2,'0') +
    gComp.toString(16).padStart(2,'0') +
    bComp.toString(16).padStart(2,'0');

  return compHex;
}
