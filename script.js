// Funzione per la somma compensata di Knuth
function sommaCompensata(somma, valore, compensazione) {
    let y = valore - compensazione; 
    let t = somma + y; 
    compensazione = (t - somma) - y; 
    somma = t;  
    return { somma, compensazione };
}

// Funzione per simulare gli attacchi sui server
function simulazioneHackingServer(N, M, p, T) {
    let successiPerHacker = Array.from({ length: M }, () => Array(T).fill(0)); 
    let serverBucati = Array.from({ length: M }, () => new Set()); 

    // Per ogni simulazione t
    for (let t = 0; t < T; t++) {
        // Per ogni server j
        for (let j = 0; j < N; j++) {
            // Per ciascun hacker i
            for (let i = 0; i < M; i++) {
                if (!serverBucati[i].has(j)) { 
                    let sommaSuccessi = successiPerHacker[i][t]; 
                    let compensazione = 0; 

                    // Genera un numero casuale tra 0 e 1
                    let r = Math.random();

                    // Se r >= p, l'hacker riesce a bucare il server
                    if (r >= p) {
                        let risultato = sommaCompensata(sommaSuccessi, 1, compensazione);
                        sommaSuccessi = risultato.somma; 
                        serverBucati[i].add(j); 
                    }

                    // Aggiorna il conteggio dei successi per l'hacker alla simulazione successiva
                    if (t + 1 < T) {
                        successiPerHacker[i][t + 1] = sommaSuccessi; 
                    }
                }
            }
        }
    }

    // Assicurati che alla fine della simulazione, se un hacker ha bucato tutti i server, rimanga al massimo
    for (let i = 0; i < M; i++) {
        for (let t = 0; t < T; t++) {
            if (serverBucati[i].size === N) {
                successiPerHacker[i][t] = N;
            }
        }
    }

    // Calcola la distribuzione empirica per ciascun hacker
    let distribuzioneEmpirica = successiPerHacker.map(successi => {
        return successi[T - 1] / N; // Numero totale di successi al tempo finale diviso per N
    });

    return { successiPerHacker, distribuzioneEmpirica }; 
}

// Parametri della simulazione
let N = 5;  // Numero di server
let M = 10; // Numero di hacker
let p = 0.9; // Probabilità che un hacker NON riesca a bucare un server
let T = 20; // Numero di simulazioni

// Esegui la simulazione e ottieni i risultati
let { successiPerHacker, distribuzioneEmpirica } = simulazioneHackingServer(N, M, p, T);

// Funzione per generare colori casuali per ogni linea (hacker)
function getRandomColor() {
    const letters = '0123456789ABCDEF'; 
    let color = '#'; 
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color; 
}

// Prepara i dati per il grafico
let hackersData = [];
for (let i = 0; i < M; i++) {
    hackersData.push({
        label: `Hacker ${i + 1}: - server bucati: ${successiPerHacker[i][T - 1]}, - distribuzione empirica: ${distribuzioneEmpirica[i].toFixed(2)}`, // Etichetta per ogni hacker
        data: successiPerHacker[i], // Dati dei successi per l'hacker
        borderColor: getRandomColor(), // Colore della linea
        fill: false // Non riempire sotto la linea
    });
}

// Funzione per disegnare il grafico
function disegnaGrafico() {
    const ctx = document.getElementById('attacchiGrafico').getContext('2d');
    new Chart(ctx, {
        type: 'line', // Tipo di grafico (lineare)
        data: {
            labels: Array.from({ length: T }, (_, i) => `t${i}`), // Asse x (tempo t)
            datasets: hackersData  // Dati delle linee degli hacker
        },
        options: {
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Tempo (t)' // Titolo dell'asse x
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Numero totale di Server Bucati' // Titolo dell'asse y
                    },
                    beginAtZero: true, // Inizia l'asse y da zero
                    max: N // Imposta il valore massimo dell'asse y
                }
            },
            plugins: {
                legend: {
                    display: true, // Mostra la leggenda
                    position: 'bottom' // Posizione della leggenda
                }
            }
        }
    });
}

// Esegui la simulazione e disegna il grafico
disegnaGrafico();
