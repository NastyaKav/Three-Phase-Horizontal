document.addEventListener("DOMContentLoaded", () => {
  const calculateBtn1 = document.getElementById("calculate-btn1");
  const qo1 = document.getElementById("qo");
  const qw1 = document.getElementById("qw");
  const tro1 = document.getElementById("tro");
  const trw1 = document.getElementById("trw");
  const result1 = document.getElementById("result1");

  calculateBtn1.addEventListener("click", () => {
      const qo = parseFloat(qo1.value) || 0;
      const qw = parseFloat(qw1.value) || 0;
      const tro = parseFloat(tro1.value) || 1;
      const trw = parseFloat(trw1.value) || 1;

      const awa = 0.5 * (trw * qw) / (tro * qo + trw * qw);
      result1.textContent = awa.toFixed(2);
  });
});
