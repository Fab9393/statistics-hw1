document.getElementById("simulateBtn").addEventListener("click", function() {
    const n = parseInt(document.getElementById("numServers").value); // Numero di server
    const m = parseInt(document.getElementById("numAttackers").value); // Numero di attaccanti
    const p = parseFloat(document.getElementById("penetrationProb").value); // Probabilità di penetrazione

    const penetrationCounts = new Array(n).fill(0); // Array per contare le penetrazioni sui server
    const hackersResults = []; // Array per memorizzare i risultati di ogni hacker

    // Simulazione degli attacchi
    for (let i = 0; i < m; i++) {
        const penetratedServers = []; // Array per memorizzare i server penetrati da questo hacker
        for (let j = 0; j < n; j++) {
            if (Math.random() < p) {
                penetrationCounts[j]++; // Incrementa il contatore del server penetrato
                penetratedServers.push(j + 1); // Aggiungi il server penetrato
            }
        }
        hackersResults.push(penetratedServers);
    }

    // Disegnare i risultati
    drawResults(penetrationCounts, m);
    updateResultsTable(hackersResults);
});

// Disegnare i risultati nel canvas
function drawResults(penetrationCounts, totalHackers) {
    const canvas = document.getElementById("resultCanvas");
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Pulisci il canvas

    const barWidth = canvas.width / penetrationCounts.length;
    const maxCount = Math.max(...penetrationCounts); // Ottieni il numero massimo di penetrazioni per la scala

    // Disegnare le barre per i risultati
    for (let i = 0; i < penetrationCounts.length; i++) {
        const x = i * barWidth;
        const height = (canvas.height * penetrationCounts[i]) / totalHackers; // Altezza della barra

        drawRectangles(ctx, x, height, barWidth);
    }
}

// Funzione per disegnare i rettangoli
function drawRectangles(ctx, x, height, width) {
    ctx.fillStyle = 'green';
    ctx.fillRect(x, ctx.canvas.height - height, width - 2, height); // Disegna il rettangolo
    ctx.strokeStyle = 'red'; // Colore del bordo
    ctx.lineWidth = 3; // Spessore della linea
    ctx.strokeRect(x, ctx.canvas.height - height, width - 2, height); // Disegna il bordo
}

// Aggiorna la tabella dei risultati
function updateResultsTable(hackersResults) {
    const tbody = document.querySelector("#resultsTable tbody");
    tbody.innerHTML = ""; // Pulisci la tabella esistente

    hackersResults.forEach((servers, index) => {
        const row = document.createElement("tr");
        const hackerCell = document.createElement("td");
        const serversCell = document.createElement("td");

        hackerCell.textContent = `Hacker ${index + 1}`;
        serversCell.textContent = servers.length > 0 ? servers.join(", ") : "Nessun server bucato";

        row.appendChild(hackerCell);
        row.appendChild(serversCell);
        tbody.appendChild(row);
    });
}
