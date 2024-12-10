document.addEventListener("DOMContentLoaded", () => {
    // Input elements
    const qg1 = document.getElementById("qg");
    const qo1 = document.getElementById("qo");
    const qw1 = document.getElementById("qw");
    const po1 = document.getElementById("po");
    const to1 = document.getElementById("to");
    const sg1 = document.getElementById("sg");
    const sgo1 = document.getElementById("sgo");
    const sgw1 = document.getElementById("sgw");
    const mo1 = document.getElementById("mo");
    const mw1 = document.getElementById("mw");
    const dml1 = document.getElementById("dml");
    const dmw1 = document.getElementById("dmw");
    const dmo1 = document.getElementById("dmo");
    const z1 = document.getElementById("z");
    const m1 = document.getElementById("m");
    const tro1 = document.getElementById("tro");
    const trw1 = document.getElementById("trw");
    const b1 = document.getElementById("b");
    const calculateBtn = document.getElementById("calculate-btn2");
    const resultDisplayGas = document.getElementById("resultg");
    const resultDisplayLiquid = document.getElementById("resultl");

    // Constants
    const CDI = 0.34;

    calculateBtn.addEventListener("click", () => {
        // Parse input values
        const qg = parseFloat(qg1.value);
        const qo = parseFloat(qo1.value);
        const qw = parseFloat(qw1.value);
        const po = parseFloat(po1.value) || 1;
        const to = parseFloat(to1.value) || 1;
        const sg = parseFloat(sg1.value);
        const sgo = parseFloat(sgo1.value);
        const sgw = parseFloat(sgw1.value);
        const mo = parseFloat(mo1.value);
        const mw = parseFloat(mw1.value);
        const dml = parseFloat(dml1.value);
        const dmw = parseFloat(dmw1.value);
        const dmo = parseFloat(dmo1.value);
        const z = parseFloat(z1.value);
        const m = parseFloat(m1.value);
        const tro = parseFloat(tro1.value);
        const trw = parseFloat(trw1.value);
        const b = parseFloat(b1.value);

        // Step 1: Calculate liquid density
        const pl = 62.4 * (141.5 / (131.5 + sgo));

        // Step 2: Calculate gas density
        const pg = 2.7 * ((sg * po) / (to * z));

        // Steps 3 to 10: Iterative calculation of Cd and Vt
        let vt = 0.0119 * Math.pow(((pl - pg) / pg) * (dml / CDI), 0.5);
        let re = 0.0049 * ((pg * dml * vt) / m);
        let cd = (24 / re) + (3 / Math.pow(re, 0.5)) + CDI;

        for (let i = 0; i < 5; i++) {
            vt = 0.0119 * Math.pow(((pl - pg) / pg) * (dml / cd), 0.5);
            re = 0.0049 * ((pg * dml * vt) / m);
            cd = (24 / re) + (3 / Math.pow(re, 0.5)) + CDI;
        }

        // Step 11: Calculate additional values
        const hoMax = 0.00128 * (tro * (sgw - sgo) * Math.pow(500, 2)) / mo;
        const dMax = hoMax / b;

        // Calculate gas and liquid flow constants
        const cg = 420 * (((to + 460) * z * qg) / po) * Math.sqrt((pg / (pl - pg)) * (cd / 100));
        const cl = 1.42 * (tro * qo + trw * qw);

        // Calculate effective lengths for different time intervals
        const intervals = [60, 72, 84, 96, 108];
        intervals.forEach((dt) => {
            const leffGas = cg / dt;
            document.getElementById(`leffg${dt}`).innerText = leffGas.toFixed(2);

            const leffLiquid = cl / Math.pow(dt, 2);
            document.getElementById(`leffl${dt}`).innerText = leffLiquid.toFixed(2);

            const lssGas = leffGas + dt / 12;
            document.getElementById(`lssg${dt}`).innerText = lssGas.toFixed(2);

            const lssLiquid = (4 * leffLiquid) / 3;
            document.getElementById(`lssl${dt}`).innerText = lssLiquid.toFixed(2);

            const srg = (12 * lssGas) / dt;
            document.getElementById(`srg${dt}`).innerText = srg.toFixed(2);

            const srl = (12 * lssLiquid) / dt;
            document.getElementById(`srl${dt}`).innerText = srl.toFixed(2);
        });

        // Display final results
        resultDisplayGas.textContent = cg.toFixed(2);
        resultDisplayLiquid.textContent = cl.toFixed(2);
    });
});
