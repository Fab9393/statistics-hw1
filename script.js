document.getElementById("simulateBtn").addEventListener("click", function() {
    const n = parseInt(document.getElementById("numServers").value); // Numero di server
    const m = parseInt(document.getElementById("numAttackers").value); // Numero di attaccanti
    const p = parseFloat(document.getElementById("penetrationProb").value); // Probabilità di penetrazione

    const results = new Array(n).fill(0); // Array per memorizzare il numero di attacchi per ogni server
    const hackersPerServer = Array.from({ length: n }, () => []); // Array per memorizzare gli hacker che attaccano ogni server
    const random = Math.random;

    // Simulazione degli attacchi
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (random() < p) {
                results[j]++; // Incrementa il conteggio per il server penetrato
                hackersPerServer[j].push(`H${i + 1}`); // Aggiungi l'hacker alla lista del server
            }
        }
    }

    // Applicazione della correzione di Knuth
    applyKnuthCorrection(results, m);

    // Disegnare i risultati
    drawResults(results);
    displayHackers(hackersPerServer);
});

// Funzione per applicare la correzione di Knuth
function applyKnuthCorrection(results, m) {
    for (let i = 0; i < results.length; i++) {
        if (results[i] > m) {
            results[i] = m; // Correggi il risultato se supera il numero totale di attaccanti
        }
    }
}

function drawResults(results) {
    const canvas = document.getElementById("resultCanvas");
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Pulisci il canvas

    const barWidth = canvas.width / results.length;
    const maxHeight = canvas.height - 40; // Altezza massima per la barra (considerando spazio per gli assi)

    // Disegnare gli assi
    drawAxes(ctx, results.length, maxHeight);

    // Disegnare le barre per i risultati
    for (let i = 0; i < results.length; i++) {
        const x = i * barWidth;
        const height = results[i] * (maxHeight / Math.max(...results)); // Altezza della barra rappresenta il numero di attacchi

        // Usando la funzione drawRectangles per disegnare i rettangoli
        drawRectangles(ctx, x, height, barWidth, maxHeight);
    }

    // Disegnare le linee
    drawLines(ctx, results);
}

// Funzione per disegnare gli assi
function drawAxes(ctx, numberOfServers, maxHeight) {
    ctx.beginPath();
    ctx.moveTo(0, maxHeight); // Inizio dall'angolo inferiore sinistro
    ctx.lineTo(ctx.canvas.width, maxHeight); // Linea orizzontale (asse X)
    ctx.moveTo(0, 0); // Inizio dall'angolo superiore sinistro
    ctx.lineTo(0, maxHeight); // Linea verticale (asse Y)
    ctx.strokeStyle = 'black'; // Colore della linea degli assi
    ctx.lineWidth = 2; // Spessore della linea
    ctx.stroke();

    // Etichette per l'asse X (server)
    for (let i = 0; i < numberOfServers; i++) {
        ctx.fillText(`S${i + 1}`, (i + 0.5) * (ctx.canvas.width / numberOfServers), maxHeight + 15); // Posizione dell'etichetta
    }

    // Etichette per l'asse Y (attacchi)
    for (let i = 0; i <= Math.max(...results); i++) {
        ctx.fillText(`T${i}`, -30, maxHeight - (i * (maxHeight / Math.max(...results)))); // Posizione dell'etichetta
    }
}

// Funzione per disegnare i rettangoli
function drawRectangles(ctx, x, height, width, maxHeight) {
    ctx.fillStyle = height > 0 ? 'green' : 'red';
    ctx.fillRect(x, maxHeight - height, width - 2, height); // Disegna il rettangolo
}

// Funzione per disegnare le linee
function drawLines(ctx, results) {
    ctx.beginPath();
    ctx.moveTo(0, ctx.canvas.height); // Inizio dal basso a sinistra

    for (let i = 0; i < results.length; i++) {
        const x = (ctx.canvas.width / results.length) * i; // Posizione x
        const y = ctx.canvas.height - results[i] * (ctx.canvas.height / Math.max(...results)); // Altezza della linea
        ctx.lineTo(x, y);
    }

    ctx.strokeStyle = 'red'; // Colore della linea
    ctx.lineWidth = 3; // Spessore della linea
    ctx.shadowColor = 'rgba(255, 0, 0, 0.5)'; // Ombra rossa
    ctx.shadowBlur = 10; // Sfocatura dell'ombra
    ctx.stroke(); // Disegna la linea
}

// Funzione per visualizzare quali hacker hanno bucato quali server
function displayHackers(hackersPerServer) {
    const resultDiv = document.getElementById("resultDiv");
    resultDiv.innerHTML = ""; // Pulisci il contenuto precedente

    hackersPerServer.forEach((hackers, index) => {
        const serverNumber = index + 1;
        const hackersList = hackers.length > 0 ? hackers.join(", ") : "Nessuno";
        resultDiv.innerHTML += `<p>Server S${serverNumber}: Attaccanti - ${hackersList}</p>`;
    });
}
