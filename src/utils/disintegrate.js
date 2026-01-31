import html2canvas from "html2canvas";
import styles from "../components/TripCard/TripCard.module.css";

export function disintegrate(element) {
  if (!element) return;

  const rect = element.getBoundingClientRect();

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  canvas.width = rect.width;
  canvas.height = rect.height;

  canvas.style.position = "absolute";
  canvas.style.left = `${rect.left + window.scrollX}px`;
  canvas.style.top = `${rect.top + window.scrollY}px`;
  canvas.style.pointerEvents = "none";

  document.body.appendChild(canvas);

  html2canvas(element).then((snapshot) => {
    ctx.drawImage(snapshot, 0, 0);

    element.classList.add(styles.disintegrating);

    canvas.classList.add("disintegration-container");

    const particles = [];

    for (let y = 0; y < canvas.height; y += 6) {
      for (let x = 0; x < canvas.width; x += 6) {
        const data = ctx.getImageData(x, y, 1, 1).data;
        if (data[3] > 0) {
          particles.push({
            x,
            y,
            r: data[0],
            g: data[1],
            b: data[2],
            a: data[3],
            vx: (Math.random() - 0.5) * 10,
            vy: (Math.random() - 0.5) * 10,
          });
        }
      }
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.a -= 6;

        ctx.fillStyle = `rgba(${p.r},${p.g},${p.b},${p.a / 255})`;
        ctx.fillRect(p.x, p.y, 2, 2);
      });

      if (particles.some((p) => p.a > 0)) {
        requestAnimationFrame(animate);
      } else {
        canvas.remove();
      }
    }

    animate();
  });
}
