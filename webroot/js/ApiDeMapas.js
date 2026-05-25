var Mapa=L.map('Imagen').setView([42.003,-5.67],13);
var Marcador=L.marker([42.003,-5.67]);
var Detalles=document.getElementById("VentanaDetalles");
Marcador.options.draggable=true;
Marcador.addTo(Mapa);
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
            "COORDENADAS:"+latitud+
            "<div>"+
                "<img src='https://openweathermap.org/payload/api/media/file/"+tiempo.weather[0].icon+".png'>"+
            "</div>"+
            "<p>"+desc+"</p>"+
            "<button id='Detalles'>VER DETALLES</button>"+
        "</div>"
    ).openPopup();
    document.getElementById("Detalles").addEventListener("click",()=>{
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
            ]
        ];
        let Vien=[
            [
                "Dirrección del viento",
                tiempo.wind.deg+" grados"
            ],
            [
                "Velocidad del viento",
                tiempo.wind.speed
            ]
        ]
        let otros=[
            [
                "Sensación térmica:",
                tiempo.main.feels_like
            ],
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
        /*------------------------Presión------------------------*/
        CrearEtiqueta("div","Presion","Recuadro",undefined,undefined,Detalles);
        const Presion=document.getElementById("Presion");
        CrearEtiqueta("table","tablaPresion",undefined,undefined,undefined,Detalles);
        tabla=document.getElementById("tablaPresion")[0];
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
        CrearEtiqueta("table","tablaTemperaturas",undefined,undefined,undefined,Detalles);
        tabla=document.getElementById("tablaTemperaturas");
        CrearEtiqueta("tbody",undefined,undefined,undefined,undefined,tabla);
        tbody=tabla.getElementsByTagName("tbody")[0];
        for(const dato of Temp){
            CrearEtiqueta("tr",undefined,undefined,undefined,undefined,tbody);
            tr=tbody.getElementsByTagName("tr")[(tbody.getElementsByTagName("tr").length-1)];
            CrearEtiqueta("td",undefined,undefined,undefined,dato[0],tr);
            CrearEtiqueta("td",undefined,undefined,undefined,dato[1],tr);
        }
        /*-------------------------Otros-------------------------*/
        CrearEtiqueta("table","tablaOtros",undefined,undefined,undefined,Detalles);
        tabla=Detalles.getElementById("tablaOtros");
        CrearEtiqueta("tbody",undefined,undefined,undefined,undefined,tabla);
        tbody=tabla.getElementsByTagName("tbody")[0];
        for(const dato of otros){
            CrearEtiqueta("tr",undefined,undefined,undefined,undefined,tbody);
            tr=tbody.getElementsByTagName("tr")[(tbody.getElementsByTagName("tr").length-1)];
            CrearEtiqueta("td",undefined,undefined,undefined,dato[0],tr);
            CrearEtiqueta("td",undefined,undefined,undefined,dato[1],tr);
        }
        CrearEtiqueta("img",undefined,undefined,"https://openweathermap.org/payload/api/media/file/"+tiempo.weather[0].icon+".png",undefined,Detalles);
    });
}
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(Mapa);
function CrearEtiqueta(Etiqueta,id,clase,src,contenido,ElementoPadre){
    let etiqueta;
    etiqueta=document.createElement(Etiqueta);
       id!=undefined ? etiqueta.setAttribute("id"   ,id   ):null;
    clase!=undefined ? etiqueta.setAttribute("class",clase):null;
      src!=undefined ? etiqueta.setAttribute("src"  ,src  ):null;
    etiqueta.textContent=contenido;
    ElementoPadre.appendChild(etiqueta);
}
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
//https://openweathermap.org/payload/api/media/file/10d@2x.png