const sections = [
  {t: 14, n: '1 Sphinx'}, {t: 32, n: '2 Anubis'}, {t: 48, n: '3 Manticore'}, {t: 64, n: '4 Cerberus'}, {t: 81, n: '5 Phoenix'},
  {t: 97, n: '6 Jellyfish'}, {t: 114 , n: '7 Hydra'}, {t: 131, n: '8 Minotaur'}, {t: 149, n: '9 Chimera'}, {t: 164, n: '10 Cyclops'},
  {t: 182, n: '11 Dragon'}, {t: 201, n: '12 Werewolf'}, {t: 220, n: '13 Vampire'}, {t: 241, n: '14 Gargoyle'}, {t: 258, n: '15 Faun'},
  {t: 273, n: '16 Jörmungandr'}, {t: 290, n: '17 Kraken'}, {t: 306, n: '18 Dullahan'}, {t: 323  , n: '19 Banshee'}, {t: 342, n: '20 Selkie'},
  {t: 359, n: '21 Tiamat'}, {t: 376, n: '22 Wendigo'}, {t: 394, n: '23 Yeti'}, {t: 409, n: '24 Kitsune'}, {t: 426, n: '25 Kappa'},
  {t: 444, n: '26 Oni'}, {t: 463, n: '27 Chupacabra'}, {t: 484, n: '28 Garuda'}, {t: 500, n: '29 Basilisk'}, {t: 518, n: '30 Alicorn'}
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
