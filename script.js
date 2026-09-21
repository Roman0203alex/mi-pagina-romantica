const boton = document.getElementById("abrir");
const contenido = document.getElementById("contenido");
const musica = document.getElementById("musica");
const controlMusica = document.getElementById("controlMusica");

musica.volume = 0.65;

function actualizarControlMusica() {
  const reproduciendo = !musica.paused;
  controlMusica.textContent = reproduciendo ? "❚❚" : "▶";
  controlMusica.setAttribute(
    "aria-label",
    reproduciendo ? "Pausar música" : "Reproducir música"
  );
  controlMusica.title = reproduciendo ? "Pausar música" : "Reproducir música";
}

async function reproducirMusica() {
  try {
    await musica.play();
  } catch (error) {
    // Algunos navegadores bloquean el autoplay hasta que la persona toca el botón.
    console.log("La música necesita una interacción para reproducirse.");
  }
  actualizarControlMusica();
}

boton.addEventListener("click", () => {
  contenido.classList.add("mostrar");
  reproducirMusica();

  setTimeout(() => {
    contenido.scrollIntoView({ behavior: "smooth" });
  }, 80);
});

controlMusica.addEventListener("click", async () => {
  if (musica.paused) {
    await reproducirMusica();
  } else {
    musica.pause();
    actualizarControlMusica();
  }
});

musica.addEventListener("play", actualizarControlMusica);
musica.addEventListener("pause", actualizarControlMusica);
musica.addEventListener("ended", actualizarControlMusica);
actualizarControlMusica();
