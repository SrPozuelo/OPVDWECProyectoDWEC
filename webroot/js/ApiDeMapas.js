var Mapa=L.map('Imagen').setView([42.003,-5.67],13);
var Marcador=L.marker([42.003,-5.67]);
Marcador.options.draggable=true;
Marcador.addTo(Mapa);
Marcador.addEventListener("dragend",(ev)=>{
    let latitud=L.latLng(ev.target.latlng);
    Marcador.bindPopup("COORDENADAS:"+latitud).openPopup();
});
Mapa.addEventListener("click",(ev)=>{
    let latitud=L.latLng(ev.latlng);
    Marcador.setLatLng(latitud);
    Marcador.bindPopup("COORDENADAS:"+latitud).openPopup();
});
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(Mapa);