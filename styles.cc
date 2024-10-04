/* Stile generale per il body */
body {
    font-family: 'Arial', sans-serif;
    margin: 0;
    padding: 0;
    background-color: #f4f4f4;
}

/* Modale */
.modal {
    display: flex; /* Usa Flexbox per centrare il contenuto */
    position: fixed; /* Fissa la posizione */
    z-index: 1000; /* Porta la modale sopra ad altri contenuti */
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto; /* Consente lo scroll se il contenuto è troppo alto */
    background-color: rgba(0, 0, 0, 0.5); /* Sfondo semi-trasparente */
}

/* Contenuto della modale */
.modal-content {
    background-color: #fff; /* Colore di sfondo del contenuto */
    margin: auto; /* Centra la modale */
    padding: 20px;
    border: 1px solid #888; /* Bordo leggero */
    width: 400px; /* Larghezza della modale */
    border-radius: 8px; /* Angoli arrotondati */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Ombra per dare profondità */
}

/* Stile per il pulsante di chiusura */
.close {
    color: #aaa; /* Colore grigio */
    float: right; /* Posiziona a destra */
    font-size: 28px;
    font-weight: bold;
    cursor: pointer; /* Cambia il cursore quando passa sopra */
}

.close:hover,
.close:focus {
    color: black; /* Cambia colore quando il mouse è sopra */
    text-decoration: none; /* Nessuna sottolineatura */
    cursor: pointer; /* Cambia il cursore quando passa sopra */
}

/* Stile per le etichette */
label {
    display: block; /* Mostra le etichette come blocchi */
    margin-top: 10px; /* Margine superiore */
    font-weight: bold; /* Grassetto */
}

/* Stile per gli input */
input[type="number"] {
    width: 100%; /* Larghezza 100% */
    padding: 10px; /* Padding interno */
    margin-top: 5px; /* Margine superiore */
    margin-bottom: 15px; /* Margine inferiore */
    border: 1px solid #ccc; /* Bordo grigio chiaro */
    border-radius: 4px; /* Angoli arrotondati */
}

/* Stile per il pulsante di simulazione */
button {
    background-color: #28a745; /* Colore verde */
    color: white; /* Testo bianco */
    padding: 10px 15px; /* Padding interno */
    border: none; /* Nessun bordo */
    border-radius: 4px; /* Angoli arrotondati */
    cursor: pointer; /* Cambia il cursore quando passa sopra */
    font-size: 16px; /* Dimensione del font */
    transition: background-color 0.3s; /* Transizione per il colore di sfondo */
}

button:hover {
    background-color: #218838; /* Colore verde scuro al passaggio del mouse */
}


/* Stile per il canvas del grafico */
canvas {
    max-width: 1000px;
    margin: 50px auto;
    display: block;
}

/* Stile per il titolo */
h2 {
    text-align: center;
    font-family: Arial, sans-serif;
    margin-top: 20px;
    color: blue;
}
