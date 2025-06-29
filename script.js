let animationId;
let running = false;

// Global positions
let x1 = 50;
let x2 = 710;

function startSimulation() {
  if (running) return;
  running = true;

  const block1 = document.getElementById("block1");
  const block2 = document.getElementById("block2");

  x1 = 50;
  x2 = 710;

  // Update block sizes based on mass
  const m1 = parseFloat(document.getElementById("m1").value);
  const m2 = parseFloat(document.getElementById("m2").value);

  const size1 = Math.max(20, m1 * 10); // Set minimum size
  const size2 = Math.max(20, m2 * 10);

  block1.style.width = `${size1}px`;
  block1.style.height = `${size1}px`;

  block2.style.width = `${size2}px`;
  block2.style.height = `${size2}px`;

  block1.style.left = `${x1}px`;
  block2.style.left = `${x2}px`;

  function update() {
    // Re-read velocities in real time
    let v1 = parseFloat(document.getElementById("v1").value);
    let v2 = parseFloat(document.getElementById("v2").value);
    const m1 = parseFloat(document.getElementById("m1").value);
    const m2 = parseFloat(document.getElementById("m2").value);

    const w1 = parseFloat(block1.style.width);
    const w2 = parseFloat(block2.style.width);

    x1 += v1;
    x2 += v2;

    // Wall collision
    if (x1 <= 0) {
      x1 = 0;
      document.getElementById("v1").value = (-v1).toFixed(2);
    }
    if (x2 + w2 >= 800) {
      x2 = 800 - w2;
      document.getElementById("v2").value = (-v2).toFixed(2);
    }

    // Block collision
    if (x1 + w1 >= x2) {
      // Perfectly elastic collision equations
      const newV1 = ((m1 - m2) / (m1 + m2)) * v1 + ((2 * m2) / (m1 + m2)) * v2;
      const newV2 = ((m2 - m1) / (m1 + m2)) * v2 + ((2 * m1) / (m1 + m2)) * v1;

      document.getElementById("v1").value = newV1.toFixed(2);
      document.getElementById("v2").value = newV2.toFixed(2);

      x1 = x2 - w1;
    }

    // Apply new positions
    block1.style.left = `${x1}px`;
    block2.style.left = `${x2}px`;

    animationId = requestAnimationFrame(update);
  }

  update();
}

function stopSimulation() {
  running = false;
  cancelAnimationFrame(animationId);
}
