function CrearEtiqueta(Etiqueta,id,clase,src,contenido,ElementoPadre){
    let etiqueta;
    etiqueta=document.createElement(Etiqueta);
    id!=undefined ? etiqueta.setAttribute("id"   ,id   ):null;
    clase!=undefined ? etiqueta.setAttribute("class",clase):null;
    src!=undefined ? etiqueta.setAttribute("src"  ,src  ):null;
    etiqueta.textContent=contenido;
    ElementoPadre.appendChild(etiqueta);
}
function obtenerLocalizacion(pos){
    var latid;
    var longi;
    console.warn(" Latitud: "+pos.coords.latitude);
    console.warn("Longitud: "+pos.coords.longitude);
    mapa(pos.coords.latitude,pos.coords.longitude);
}
function errorGeolocalizacion(err){
    console.log("ERROR: "+err.message);
    switch(err.code){
        case 1:
            CrearEtiqueta("div","Geolocalizacion",undefined,undefined,"Ciertas funciones no van a funcionar correctamente debido a que la geolocalización esta bloqueada.",document.getElementById("Cuerpo"));
        break;
    }
    mapa(40.4276,-3.7205);
    //42.003,-5.67  
}
function mapa(latid,longi){
    console.log(" Latitud: "+latid);
    console.log("Longitud: "+longi);
    var Mapa=L.map('Imagen').setView([latid,longi],13);
    var Marcador=L.marker([latid,longi]);
    Marcador.options.draggable=true;
    Marcador.addTo(Mapa);
    var Detalles=document.getElementById("VentanaDetalles");
    document.getElementById("Imagen").addEventListener("contextmenu",(ev)=>{
        ev.preventDefault();
    });
    Mapa.addEventListener("mouseup",(ev)=>{
        MapaClick(ev);
    });
    async function MapaClick(ev){
        let latitud=L.latLng(ev.latlng);
        Marcador.setLatLng(latitud);
        let tiempo=await PeticionDelTiempo(latitud.lat,latitud.lng,"es");
        console.log();
        let desc=tiempo.weather[0].description.substring(0,1).toUpperCase()+tiempo.weather[0].description.substring(1,tiempo.weather[0].description.lenght);
        console.log("URL: https://openweathermap.org/payload/api/media/file/"+tiempo.weather[0].icon+"@2x.png");
        Marcador.bindPopup(
            "<div class='Popup'>"+
                "<p id='Margen'>Ciudad:</p>"+
                "<p id='Margen'>"+tiempo.name+"</p>"+
                "<div id='divImagen'>"+
                    "<img src='https://openweathermap.org/payload/api/media/file/"+tiempo.weather[0].icon+".png' id='Margen' draggable='false'>"+
                "</div>"+
                "<p id='Margen'>"+desc+"</p>"+
                "<div id='divBoton' id='Margen'>"+
                    "<button id='Detalles' id='Margen'>VER DETALLES</button>"+
                "</div>"+
            "</div>"
        ).openPopup();
        document.getElementById("Detalles").addEventListener("click",()=>{
            Detalles.style="display:block;";
            let tabla,tbody,tr;
            let Pres=[
                [
                    "Presión atmósferica:",
                    tiempo.main.grnd_level
                ],
                [
                    "Nivel del mar:",
                    tiempo.main.sea_level
                ]
            ];
            let Temp=[
                [
                    "Temperatura:",
                    tiempo.main.temp+"ºC"
                ],
                [
                    "Temperatura máxima:",
                    tiempo.main.temp_max+"ºC"
                ],
                [
                    "Temperatura mínima:",
                    tiempo.main.temp_min+"ºC"
                ],
                [
                    "Sensación térmica:",
                    tiempo.main.feels_like
                ]
            ];
            let Vien=[
                [
                    "Dirrección del viento:",
                    tiempo.wind.deg+" grados"
                ],
                [
                    "Velocidad del viento:",
                    tiempo.wind.speed
                ]
            ]
            let otros=[
                [
                    "Humedad:",
                    tiempo.main.humidity+"%"
                ],
                [
                    "Tiempo:",
                    tiempo.weather[0].description
                ]
            ];
            console.log("El botón ver detalles fue pulsado con éxito.");
            Detalles.textContent="";
            CrearEtiqueta("p","Titulo",undefined,undefined,"El tiempo en "+tiempo.name,Detalles);
            CrearEtiqueta("img",undefined,undefined,"https://openweathermap.org/payload/api/media/file/"+tiempo.weather[0].icon+".png",undefined,Detalles);
            Detalles.getElementsByTagName("img")[0].setAttribute("draggable","false");
            /*------------------------Presión------------------------*/
            CrearEtiqueta("div","Presion","Recuadro",undefined,undefined,Detalles);
            const Presion=document.getElementById("Presion");
            CrearEtiqueta("table","tablaPresion",undefined,undefined,undefined,Presion);
            tabla=document.getElementById("tablaPresion");
            CrearEtiqueta("thead",undefined,undefined,undefined,undefined,tabla);
            thead=tabla.getElementsByTagName("thead")[0];
            CrearEtiqueta("th",undefined,undefined,undefined,"PRESIÓN",thead);
            thead.getElementsByTagName("th")[0].setAttribute("colspan","2");
            CrearEtiqueta("tbody",undefined,undefined,undefined,undefined,tabla);
            tbody=tabla.getElementsByTagName("tbody")[0];
            for(const dato of Pres){
                CrearEtiqueta("tr",undefined,undefined,undefined,undefined,tbody);
                tr=tbody.getElementsByTagName("tr")[(tbody.getElementsByTagName("tr").length-1)];
                CrearEtiqueta("td",undefined,undefined,undefined,dato[0],tr);
                CrearEtiqueta("td",undefined,undefined,undefined,dato[1],tr);
            }
            /*----------------------Temperatura----------------------*/
            CrearEtiqueta("div","Temperatura","Recuadro",undefined,undefined,Detalles);
            const Temperatura=document.getElementById("Temperatura");
            CrearEtiqueta("table","tablaTemperaturas",undefined,undefined,undefined,Temperatura);
            tabla=document.getElementById("tablaTemperaturas");
            CrearEtiqueta("thead",undefined,undefined,undefined,undefined,tabla);
            thead=tabla.getElementsByTagName("thead")[0];
            CrearEtiqueta("th",undefined,undefined,undefined,"TEMPERATURA",thead);
            thead.getElementsByTagName("th")[0].setAttribute("colspan","2");
            CrearEtiqueta("tbody",undefined,undefined,undefined,undefined,tabla);
            tbody=tabla.getElementsByTagName("tbody")[0];
            for(const dato of Temp){
                CrearEtiqueta("tr",undefined,undefined,undefined,undefined,tbody);
                tr=tbody.getElementsByTagName("tr")[(tbody.getElementsByTagName("tr").length-1)];
                CrearEtiqueta("td",undefined,undefined,undefined,dato[0],tr);
                CrearEtiqueta("td",undefined,undefined,undefined,dato[1],tr);
            }
            /*------------------------Viento-------------------------*/
            CrearEtiqueta("div","Viento","Recuadro",undefined,undefined,Detalles);
            const Viento=document.getElementById("Viento");
            CrearEtiqueta("table","tablaViento",undefined,undefined,undefined,Viento);
            tabla=document.getElementById("tablaViento");
            CrearEtiqueta("thead",undefined,undefined,undefined,undefined,tabla);
            thead=tabla.getElementsByTagName("thead")[0];
            CrearEtiqueta("th",undefined,undefined,undefined,"VIENTO",thead);
            thead.getElementsByTagName("th")[0].setAttribute("colspan","2");
            CrearEtiqueta("tbody",undefined,undefined,undefined,undefined,tabla);
            tbody=tabla.getElementsByTagName("tbody")[0];
            for(const dato of Vien){
                CrearEtiqueta("tr",undefined,undefined,undefined,undefined,tbody);
                tr=tbody.getElementsByTagName("tr")[(tbody.getElementsByTagName("tr").length-1)];
                CrearEtiqueta("td",undefined,undefined,undefined,dato[0],tr);
                CrearEtiqueta("td",undefined,undefined,undefined,dato[1],tr);
            }
            /*-------------------------Otros-------------------------*/
            CrearEtiqueta("div","Otros","Recuadro",undefined,undefined,Detalles);
            const Otros=document.getElementById("Otros");
            CrearEtiqueta("table","tablaOtros",undefined,undefined,undefined,Otros);
            tabla=document.getElementById("tablaOtros");
            CrearEtiqueta("thead",undefined,undefined,undefined,undefined,tabla);
            thead=tabla.getElementsByTagName("thead")[0];
            CrearEtiqueta("th",undefined,undefined,undefined,"OTROS DETALLES",thead);
            thead.getElementsByTagName("th")[0].setAttribute("colspan","2");
            CrearEtiqueta("tbody",undefined,undefined,undefined,undefined,tabla);
            tbody=tabla.getElementsByTagName("tbody")[0];
            for(const dato of otros){
                CrearEtiqueta("tr",undefined,undefined,undefined,undefined,tbody);
                tr=tbody.getElementsByTagName("tr")[(tbody.getElementsByTagName("tr").length-1)];
                CrearEtiqueta("td",undefined,undefined,undefined,dato[0],tr);
                CrearEtiqueta("td",undefined,undefined,undefined,dato[1],tr);
            }
        });
    }
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(Mapa);
    async function PeticionDelTiempo(lat,lon,lang) {
        try{
            const dat=await fetch("https://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&lang="+lang+"&units=metric&appid=6da345c0105a2ec642615e413e090758");
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
            Marcador.bindPopup("<span style='color:red;'>No se puede mostrar información de este lugar debido a un error inesperado.</span>").openPopup();
        }
    }
}
if(navigator.geolocation!=undefined){
    navigator.geolocation.getCurrentPosition(obtenerLocalizacion,errorGeolocalizacion);
}
else{
    CrearEtiqueta("div","Geolocalizacion",undefined,undefined,"Ciertas funciones no van a funcionar correctamente debido a que tienes la geolocalización desactivada.",document.getElementById("Cuerpo"));
    mapa(0,0);
    //42.003,-5.67
}
//https://openweathermap.org/payload/api/media/file/10d@2x.png