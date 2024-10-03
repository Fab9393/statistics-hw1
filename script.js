function startSimulation() {
    const canvas = document.getElementById('penetrationChart');
    const ctx = canvas.getContext('2d');
    const attackTable = document.getElementById('attackTable').getElementsByTagName('tbody')[0];
    const n = parseInt(document.getElementById('n').value);
    const m = parseInt(document.getElementById('m').value);
    const p = parseFloat(document.getElementById('p').value);

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.moveTo(0, canvas.height);

    let sum = 0;
    let c = 0; // Compensazione per la somma di Kahan

    for (let i = 0; i < n; i++) {
        const penetration = Math.random() < p ? 1 : 0;
        const x = (i + 1) * (canvas.width / n);
        const y = canvas.height - (penetration * canvas.height);
        ctx.lineTo(x, y);
        ctx.stroke();

        if (penetration === 1) {
            addAttackRow(`Hacker ${Math.floor(Math.random() * m) + 1}`, `Server ${i + 1}`);
        }

        // Applicazione della somma di Kahan
        let yKahan = penetration - c;
        let t = sum + yKahan;
        c = (t - sum) - yKahan;
        sum = t;
    }

    console.log("Somma con correzione di Knuth:", sum);
}

function addAttackRow(hacker, server) {
    const row = attackTable.insertRow();
    const hackerCell = row.insertCell(0);
    const serverCell = row.insertCell(1);
    hackerCell.textContent = hacker;
    serverCell.textContent = server;
}
