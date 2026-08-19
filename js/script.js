const sections = [
  {t: 0, n: '1 Sphinx'}, {t: 30, n: '2 Anubis'}, {t: 47, n: '3 Manticore'}, {t: 62, n: '4 Cerberus'}, {t: 80, n: '5 Phoenix'},
  {t: 97, n: '6 Jellyfish'}, {t: 114, n: '7 Hydra'}, {t: 131, n: '8 Minotaur'}, {t: 149, n: '9 Chimera'}, {t: 165, n: '10 Cyclops'},
  {t: 184, n: '11 Dragon'}, {t: 203, n: '12 Werewolf'}, {t: 221, n: '13 Vampire'}, {t: 240, n: '14 Gargoyle'}, {t: 260, n: '15 Faun'},
  {t: 276, n: '16 Jörmungandr'}, {t: 294, n: '17 Kraken'}, {t: 312, n: '18 Dullahan'}, {t: 332, n: '19 Banshee'}, {t: 351, n: '20 Selkie'},
  {t: 369, n: '21 Tiamat'}, {t: 386, n: '22 Wendigo'}, {t: 405, n: '23 Yeti'}, {t: 421, n: '24 Kitsune'}, {t: 438, n: '25 Kappa'},
  {t: 457, n: '26 Oni'}, {t: 477, n: '27 Chupacabra'}, {t: 500, n: '28 Garuda'}, {t: 517, n: '29 Basilisk'}, {t: 536, n: '30 Alicorn'}
];

const a = document.getElementById('a');
const b = document.getElementById('buttons');
const p = document.getElementById('play');
const pr = document.getElementById('prog');
const c = document.getElementById('cur');
const d = document.getElementById('dur');

// Crear botones de salto
sections.forEach((s) => {
  const bt = document.createElement('button');
  bt.className = 'jump';
  bt.textContent = s.n;
  bt.onclick = () => {
    a.currentTime = s.t;
  };
  b.appendChild(bt);
});

// Formatear tiempo
function fmt(x) {
  if (isNaN(x)) return "0:00";
  const min = Math.floor(x / 60);
  const sec = Math.floor(x % 60);
  return `${min}:${String(sec).padStart(2, '0')}`;
}

// Botón reproducir/pausa
p.onclick = () => {
  if (a.paused) {
    a.play();
    p.textContent = "⏸ Pause";
    p.animate(
      [
        { transform: "scale(1.2)" },
        { transform: "scale(1.08)" },
        { transform: "scale(1.2)" }
      ],
      { duration: 250 }
    );
  } else {
    a.pause();
    p.textContent = "▶ Hear";
  }
};

// Cuando el navegador conoce la duración del audio
a.addEventListener("loadedmetadata", () => {
  pr.min = 0;
  pr.max = a.duration;
  pr.step = 0.01;
  pr.value = 0;

  c.textContent = fmt(0);
  d.textContent = fmt(a.duration);
});

// Actualizar barra y tiempo
a.addEventListener("timeupdate", () => {
  pr.value = a.currentTime;
  c.textContent = fmt(a.currentTime);

  const activeIndex = sections.filter(s => a.currentTime >= s.t).length - 1;

  document.querySelectorAll(".jump").forEach((btn, i) => {
    btn.classList.toggle("active", i === activeIndex);
  });
});

// Permitir mover la barra
pr.addEventListener("input", () => {
  a.currentTime = Number(pr.value);
});

// Cuando termina el audio
a.addEventListener("ended", () => {
  p.textContent = "▶ Hear";
  pr.value = pr.max;
});