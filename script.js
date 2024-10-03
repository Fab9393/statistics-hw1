document.getElementById('startSimulation').addEventListener('click', function() {
    const numServers = parseInt(document.getElementById('numServers').value);
    const numHackers = parseInt(document.getElementById('numHackers').value);
    const probability = parseFloat(document.getElementById('probability').value) / 100;

    const results = simulateAttacks(numHackers, numServers, probability);
    displayResults(results);
    drawChart(results, numServers);
});

function simulateAttacks(m, n, p) {
    const results = [];
    for (let i = 0; i < m; i++) {
        const hackerResults = [];
        let sum = 0.0;
        let c = 0.0; // Variabile di correzione di Kahan
        for (let j = 0; j < n; j++) {
            let penetration = Math.random();
            let yKahan = penetration - c;
            let t = sum + yKahan;
            c = (t - sum) - yKahan;
            sum = t;

            if (penetration < p) {
                hackerResults.push(j + 1);
            }
        }
        results.push(hackerResults);
    }
    return results;
}

function displayResults(results) {
    const tbody = document.querySelector('#resultsTable tbody');
    tbody.innerHTML = '';
    results.forEach((hackerResults, index) => {
        const row = document.createElement('tr');
        const hackerCell = document.createElement('td');
        hackerCell.textContent = `Hacker ${index + 1}`;
        const serversCell = document.createElement('td');
        serversCell.textContent = hackerResults.join(', ');
        row.appendChild(hackerCell);
        row.appendChild(serversCell);
        tbody.appendChild(row);
    });
}

function drawChart(results, numServers) {
    const ctx = document.getElementById('resultsChart').getContext('2d');
    const datasets = results.map((hackerResults, index) => {
        const data = Array(numServers).fill(0);
        hackerResults.forEach(server => {
            data[server - 1]++;
        });
        return {
            label: `Hacker ${index + 1}`,
            data: data,
            borderColor: getRandomColor(),
            fill: false
        };
    });

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: Array.from({ length: numServers }, (_, i) => `Server ${i + 1}`),
            datasets: datasets
        },
        options: {
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Server'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Attacchi con Successo'
                    }
                }
            }
        }
    });
}

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
