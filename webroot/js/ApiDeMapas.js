var Mapa=L.map('Imagen').setView([42.003,-5.67],13);
var Marcador=L.marker([42.003,-5.67]).addTo(Mapa);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(Mapa);