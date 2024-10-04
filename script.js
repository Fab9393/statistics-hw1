// Funzione per la somma compensata di Knuth
function sommaCompensata(somma, valore, compensazione) {
    let y = valore - compensazione;
    let t = somma + y;
    compensazione = (t - somma) - y;  // Aggiorna la compensazione
    somma = t;  // Aggiorna la somma
    return { somma, compensazione };
}

// Funzione per simulare gli attacchi sui server con distribuzione empirica
function simulazioneHackingServer(N, M, p, T) {
    let successiPerHacker = Array.from({ length: M }, () => Array(T).fill(0)); // Inizializza gli attacchi per hacker

    // Per ogni simulazione t
    for (let t = 1; t <= T; t++) {
        // Per ogni server j
        for (let j = 0; j < N; j++) {
            // Per ciascun hacker
            for (let i = 0; i < M; i++) {
                let sommaSuccessi = successiPerHacker[i][t]; // Successi precedenti per quell'hacker
                let compensazione = 0; // Variabile di compensazione per somma accurata

                // Genera un numero casuale tra 0 e 1
                let r = Math.random();

                // Se r >= p, l'hacker riesce a bucare il server
                if (r >= p) {
                    let risultato = sommaCompensata(sommaSuccessi, 1, compensazione);
                    sommaSuccessi = risultato.somma;

                    // Limita il numero di successi al numero di server disponibili
                    if (sommaSuccessi > N) {
                        sommaSuccessi = N; // Non può superare il numero di server
                    }
                }

                // Aggiorna il conteggio dei successi per l'hacker alla simulazione successiva
                if (t < T) {
                    successiPerHacker[i][t] = sommaSuccessi;
                }
            }
        }
    }

    // Calcola la distribuzione empirica per ciascun hacker
    let distribuzioneEmpirica = successiPerHacker.map(successi => {
        return successi[T - 1];  // Prendi il numero totale di successi al tempo finale
    });

    return { successiPerHacker, distribuzioneEmpirica }; // Ritorna i successi e la distribuzione empirica
}

// Parametri della simulazione
let N = 5;  // Numero di server
let M = 10; // Numero di hacker
let p = 0.3; // Probabilità che un hacker NON riesca a bucare un server
let T = 20; // Numero di simulazioni

// Esegui la simulazione e ottieni i risultati
let { successiPerHacker, distribuzioneEmpirica } = simulazioneHackingServer(N, M, p, T);

// Genera colori casuali per ogni linea (hacker)
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
        label: `Hacker ${i + 1} (Distribuzione Empirica: ${distribuzioneEmpirica[i]})`, // Aggiungi la distribuzione nella legenda
        data: successiPerHacker[i],
        borderColor: getRandomColor(),
        fill: false
    });
}

// Disegna il grafico
function disegnaGrafico() {
    const ctx = document.getElementById('attacchiGrafico').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: Array.from({ length: T }, (_, i) => `t${i}`), // Asse x (tempo t)
            datasets: hackersData  // Linee degli hacker
        },
        options: {
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Tempo (t)'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Numero di Server Hackerati'
                    },
                    beginAtZero: true,
                    max: N  // Imposta il massimo dell'asse Y al numero di server
                }
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'bottom'
                }
            }
        }
    });
}

// Esegui la simulazione e disegna il grafico
disegnaGrafico();
