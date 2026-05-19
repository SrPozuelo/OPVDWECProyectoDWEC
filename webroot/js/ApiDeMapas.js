var Mapa=L.map('Imagen').setView([42.003,-5.67],13);
var Marcador=L.marker([42.003,-5.67]);
Marcador.options.draggable=true;
Marcador.addTo(Mapa);
Mapa.addEventListener("mouseup",(ev)=>{
    let latitud=L.latLng(ev.latlng);
    Marcador.setLatLng(latitud);
    Marcador.bindPopup("COORDENADAS:"+latitud).openPopup();
});
Mapa.addEventListener("click",(ev)=>{
    let latitud=L.latLng(ev.latlng);
    Marcador.setLatLng(latitud);
    let tiempo=PeticionDelTiempo(latitud.lat,latitud.lng,"es");
    Marcador.bindPopup("COORDENADAS:"+latitud+"<br><img src='https://openweathermap.org/payload/api/media/file/"+tiempo.weather[0].icon+"@2x.png'>").openPopup();
});
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(Mapa);
async function PeticionDelTiempo(lat,lon,lang) {
    try{
        const dat=await fetch("https://api.openweathermap.org/data/3.0/onecall?lat="+lat+"&lon="+lon+"&lang="+lang+"&appid=6da345c0105a2ec642615e413e090758");
        if(dat.status==200){
            const tiempo=await dat.json();
            respuesta=tiempo;
            console.log(respuesta);
            return respuesta;
        }
        else{
            throw new Error("Ocurrio un error inesperado.");
        }
    }
    catch(Error){
        console.error(Error);
    }
}
//https://openweathermap.org/payload/api/media/file/10d@2x.png