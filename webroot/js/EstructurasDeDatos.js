function LimpiarPantalla(){
    Arrai=new Array();
    Conjunto=new Set();
    Mapa=new Map();
    Imagen.setAttribute("class","Invisible");
    Salida.setAttribute("class","Invisible");
    h2Salida.setAttribute("class","Invisible");
    while(Botones.getElementsByTagName("tr").length!=0){
        Botones.removeChild(Botones.getElementsByTagName("tr")[0]);
    }
    if(document.getElementById("Pregunta")!=null){
        Cuerpo.removeChild(document.getElementById("Pregunta"));
    }
}
function BorrarInput(name){
    for(input of document.getElementsByName(name)){
        input.value="";
    }
}
function BorrarError(metodo){
    const Err=document.getElementsByClassName(metodo)[0];
    const span=document.getElementById(("span"+metodo));
    if(span!=null){
        Err.removeChild(span);
    }
    
}
function AgregarSalida(texto){
    const Sal=document.getElementById("Salida");
    texto=document.createTextNode(texto);
    Sal.appendChild(texto);
    Sal.appendChild(document.createElement("br"));
}
function AgregarError(metodo,mensaje){
    const Err=document.getElementsByClassName(metodo)[0];
    const span=document.createElement("span");
    span.setAttribute("id","span"+metodo);
    span.textContent=mensaje;
    Err.appendChild(span);
}
function accionPush(){
    const inputs=document.getElementsByName("PUSH")[0].value;
    let correcto=true,mensaje;
    BorrarError("PUSH");
    if(inputs=="" && correcto){
        correcto=false;
        mensaje="No debes dejar los campos en amarillo vacios.";
    }
    if(!correcto){
        AgregarError("PUSH",mensaje);
    }
    else{
        Arrai.push(inputs);
        DibujarArray();
        BorrarInput("PUSH");
    }
}
function accionPop(){
    let correcto=true,mensaje;
    BorrarError("POP");
    if(Arrai.length==0 && correcto){
        mensaje="No se puede eliminar más elementos del array.";
        correcto=false;
    }
    if(!correcto){
        AgregarError("POP",mensaje);
    }
    else{
        AgregarSalida("[--ARRAY---][POP]-Se eliminó el elemento '"+Arrai[(Arrai.length-1)]+"'.");
        Arrai.pop();
        DibujarArray();
    }
}
function accionShift(){
    let correcto=true,mensaje;
    BorrarError("SHIFT");
    if(Arrai.length==0 && correcto){
        mensaje="No se puede eliminar más elementos del array.";
        correcto=false;
    }
    if(!correcto){
        AgregarError("SHIFT",mensaje);
    }
    else{
        AgregarSalida("[--ARRAY---][SHIFT]-Se eliminó el elemento '"+Arrai[0]+"'.");
        Arrai.shift();
        DibujarArray();
    }
}
function accionUnshift(){
    let inputs=document.getElementsByName("UNSHIFT")[0].value;
    let correcto=true,mensaje;
    BorrarError("UNSHIFT");
    if(inputs=="" && correcto){
        correcto=false;
        mensaje="No debes dejar los campos en amarillo vacios.";
    }
    if(!correcto){
        AgregarError("UNSHIFT",mensaje);
    }
    else{
        Arrai.unshift(inputs);
        DibujarArray();
        BorrarInput("UNSHIFT");
    }
}
function accionIncludes(){
    let elemento=document.getElementsByName("INCLUDES")[0].value;
    let posicion=document.getElementsByName("INCLUDES")[1].value;
    let correcto=true,mensaje;
    BorrarError("INCLUDES");
    if(elemento=="" && correcto){
        correcto=false;
        mensaje="No debes dejar los campos en amarillo vacios.";
    }
    if(!correcto){
        AgregarError("INCLUDES",mensaje);
    }
    else{
        if(Arrai.includes(elemento,posicion)){
            AgregarSalida("[--ARRAY---][INCLUDES]-El elemento '"+elemento+"' está en el array.");
        }
        else{
            AgregarSalida("[--ARRAY---][INCLUDES]-El elemento '"+elemento+"' no está en el array");
        }
        BorrarInput("INCLUDES");
    }
}
function accionReverse(){
    Arrai.reverse();
    DibujarArray();
}
function accionSlice(){
    let posIni=document.getElementsByName("SLICE")[0].value;
    let posFin=document.getElementsByName("SLICE")[1].value;
    BorrarError("SLICE");
    let correcto=true,copia,mensaje="NULL",sonEnteros=true;
    if(posIni==""){
        posIni=undefined;
        sonEnteros=false;
    }
    else{
        if(isNaN(posIni) ||(!isNaN(posIni) && posIni.includes("."))){
            correcto=false;
            sonEnteros=false;
            mensaje="El primer campo debe ser un numero entero.";
        }
    }
    if(posFin==""){
        posFin=undefined;
        sonEnteros=false;
    }
    else{
        if(isNaN(posFin) || (!isNaN(posFin) && posFin.includes("."))){
            correcto=false;
            sonEnteros=false;
            mensaje="El segundo campo debe ser un numero entero.";
        }
    }
    if(correcto && sonEnteros){
        if(Number(posIni)>=Number(posFin)){
            correcto=false;
            mensaje="El valor del primer campo debe ser menor que el del segundo campo.";
        }
    }
    if(correcto && Number(posIni)>=Arrai.length){
        correcto=false;
        mensaje="El primero campo debe tener un valor menor, no hay tantos elementos.";
    }
    if(correcto && Number(posFin)>Arrai.length){
        correcto=false;
        mensaje="El segundo campo debe tener un valor menor, no hay tantos elementos.";
    }
    if(Arrai.length==0 && correcto){
        correcto=false;
        mensaje="No se pueden copiar elementos porque el array esta vacio.";
    }
    if(!correcto){
        AgregarError("SLICE",mensaje);
    }
    else{
        copia=Arrai.slice(posIni,posFin);
        AgregarSalida("[--ARRAY---][SLICE]-Los elementos copiados son "+copia+".");
    }
    BorrarInput("SLICE");
}
function accionSplice(){
    let posicion=document.getElementsByName("SPLICE")[0].value;
    let eliminados=document.getElementsByName("SPLICE")[1].value;
    let anadidos=document.getElementsByName("SPLICE")[2].value.split(",");
    let mensaje,correcto=true,A="";
    BorrarError("SPLICE");
    eliminados=="" ? eliminados=undefined:null;
        anadidos=="" ?   anadidos=undefined:null;
    if(posicion=="" && correcto){
        correcto=false;
        mensaje="No debes dejar los campos en amarillo vacios.";
    }
    if((isNaN(Number(posicion)) || (!isNaN(Number(posicion)) && posicion.includes("."))) && correcto){
        correcto=false;
        mensaje="El primer campo debe ser un numero entero.";
    }
    if(Number(posicion)>Arrai.length && correcto){
        correcto=false;
        mensaje="No es posible seleccionar esa posición dentro del array.";
    }
    if(eliminados!=undefined && correcto){
        if(isNaN(Number(eliminados)) || (!isNaN(Number(eliminados)) && posicion.includes("."))){
            correcto=false;
            mensaje="El segundo campo debe ser un numero entero.";
        }
        if((Number(posicion)+Number(eliminados))>Arrai.length && correcto){
            correcto=false;
            mensaje="No es posible eliminar esa cantidad de elementos del array desde la posicion "+posicion+".";
        }
    }
    if(!correcto){
        AgregarError("SPLICE",mensaje);
    }
    else{
        if(eliminados!=undefined){
            eliminados>Arrai.length ? null : AgregarSalida("[--ARRAY---][SPLICE]-Los elementos eliminados son "+Arrai.splice(posicion,eliminados)+".");
        }
        if(anadidos!=undefined){
            console.log(anadidos);
            for(elemento of anadidos.reverse()){
                if(elemento!=""){
                    Arrai.splice(posicion,undefined,elemento);
                }
            }
        }
    }
    DibujarArray();
    BorrarInput("SPLICE");
}
function accionAdd(){
    let elemento=document.getElementsByName("ADD")[0].value;
    let correcto=true,mensaje;
    BorrarError("ADD");
    if(elemento=="" && correcto){
        mensaje="No debes dejar los campos en amarillo vacios.";
        correcto=false;
    }
    if(!correcto){
        AgregarError("ADD",mensaje);
    }
    else{
        Conjunto.add(elemento);
        DibujarConjunto();
    }
    BorrarInput("ADD");
}
function accionDeleteConjunto(){
    let elemento=document.getElementsByName("DELETE")[0].value;
    let correcto=true,mensaje;
    BorrarError("DELETE");
    if(elemento=="" && correcto){
        mensaje="No debes dejar los campos en amarillo vacios.";
        correcto=false;
    }
    if(!correcto){
        AgregarError("DELETE",mensaje);
    }
    else{
        if(Conjunto.delete(elemento)){
            AgregarSalida("[CONJUNTO][DELETE]-Se eliminó el elemento '"+elemento+"' del conjunto.");
            DibujarConjunto();
        }
        else{
            AgregarSalida("[CONJUNTO][DELETE]-No se eliminó el elemento '"+elemento+"' porque no existe dicho elemento.");
        }
    }
    BorrarInput("DELETE");
}
function accionClearConjunto(){
    let correcto=true,mensaje;
    BorrarError("CLEAR");
    if(Conjunto.size==0 && correcto){
        mensaje="Ya no quedan mas elementos en el conjunto.";
        correcto=false;
    }
    if(!correcto){
        AgregarError("CLEAR",mensaje);
    }
    else{
        Conjunto.clear();
        AgregarSalida("[CONJUNTO][CLEAR]-Se eliminaron todos los elementos.");
    }
    DibujarConjunto();
}
function accionHasConjunto(){
    let elemento=document.getElementsByName("HAS")[0].value;
    let correcto=true,mensaje;
    BorrarError("HAS");
    if(elemento=="" && correcto){
        mensaje="No debes dejar los campos en amarillo vacios.";
        correcto=false;
    }
    if(!correcto){
        AgregarError("HAS",mensaje);
    }
    else{
        if(Conjunto.has(elemento)){
            AgregarSalida("[CONJUNTO][HAS]-El elemento "+elemento+" esta en el conjunto.");
        }
        else{
            AgregarSalida("[CONJUNTO][HAS]-El elemento "+elemento+" no esta en el conjunto.");
        }
    }
    BorrarInput("HAS");
}
function accionSizeConjunto(){
    if(Conjunto.size==1){
        AgregarSalida("[CONJUNTO][SIZE]-El conjunto tiene "+Conjunto.size+" elemento.");
    }
    else{
        AgregarSalida("[CONJUNTO][SIZE]-El conjunto tiene "+Conjunto.size+" elementos.");
    }
}
function accionSet(){
    const clave=document.getElementsByName("SET")[0].value;
    const valor=document.getElementsByName("SET")[1].value;
    let correcto=true,mensaje;
    BorrarError("SET");
    if(clave=="" && correcto){
        mensaje="No debes dejar el primer campo en amarillo vacio.";
        correcto=false;
    }
    if(valor=="" && correcto){
        mensaje="No debes dejar el segundo campo en amarillo vacio.";
        correcto=false;
    }
    if(!correcto){
        AgregarError("SET",mensaje);
    }
    else{
        Mapa.set(clave,valor);
        DibujarMapa();
    }
    BorrarInput("SET");
}
function accionGet(){
    const clave=document.getElementsByName("GET")[0].value;
    let correcto=true,mensaje;
    BorrarError("GET");
    if(clave=="" && correcto){
        mensaje="No debes dejar los campos en amarillo vacios.";
        correcto=false;
    }
    if(!correcto){
        AgregarError("GET",mensaje);
    }
    else{
        if(Mapa.get(clave)==undefined){
            AgregarSalida("[---MAPA---][GET]-El elemento con clave "+clave+" no está en el mapa.")
        }
        else{
            AgregarSalida("[---MAPA---][GET]-El elemento con clave "+clave+" está en el mapa y tiene el valor "+Mapa.get(clave));
        }
    }
    BorrarInput("GET");
}
function accionDeleteMapa(){
    const clave=document.getElementsByName("DELETE")[0].value;
    let correcto=true,mensaje;
    BorrarError("DELETE");
    if(clave=="" && correcto){
        mensaje="No debes dejar los campos en amarillo vacios.";
        correcto=false;
    }
    if(!correcto){
        AgregarError("DELETE",mensaje);
    }
    else{
        if(Mapa.delete(clave)){
            AgregarSalida("[---MAPA---][DELETE]-Se eliminó el elemento con clave "+clave+" del mapa.");
            DibujarMapa();
        }
        else{
            AgregarSalida("[---MAPA---][DELETE]-No se eliminó el elemento con clave "+clave+" porque no existe dicho elemento.");
        }
    }
    BorrarInput("DELETE");
}
function accionClearMapa(){
    let correcto=true,mensaje;
    BorrarError("CLEAR");
    if(Mapa.size==0 && correcto){
        mensaje="Ya no quedan más elementos en el mapa.";
        correcto=false;
    }
    if(!correcto){
        AgregarError("CLEAR",mensaje);
    }
    else{
        Mapa.clear();
        AgregarSalida("[---MAPA---][CLEAR]-Se eliminaron todos los elemntos.");
        DibujarMapa();
    }
}
function accionHasMapa(){
    const clave=document.getElementsByName("HAS")[0].value;
    let correcto=true,mensaje;
    BorrarError("HAS");
    if(clave=="" && correcto){
        mensaje="No debes dejar los campos en amarillo vacios.";
        correcto=false;
    }
    if(!correcto){
        AgregarError("HAS",mensaje);
    }
    else{
        if(Mapa.has(clave)){
            AgregarSalida("[---MAPA---][HAS]-El elemento con clave "+clave+" esta en el mapa.");
        }
        else{
            AgregarSalida("[---MAPA---][HAS]-El elemento con clave "+clave+" no está en el mapa.")
        }
    }
    BorrarInput("HAS");
}
function accionSizeMapa(){
    if(Mapa.size==1){
        AgregarSalida("[---MAPA---][SIZE]-El mapa tiene "+Mapa.size+" elemento.");
    }
    else{
        AgregarSalida("[---MAPA---][SIZE]-El mapa tiene "+Mapa.size+" elementos.");
    }
}
function DibujarArray(){
    const trPosicion=document.getElementById("trPosicion");
    const trValor=document.getElementById("trValor");
    trPosicion.setAttribute("class","VisibleFlex");
    trValor.setAttribute("class","Solo");
    trPosicion.innerHTML="<p>POSICIÓN</p>";
    trValor.innerHTML="<p>VALOR</p>";
    let posicion;
    for(let i=0;i<Arrai.length;i++){
        posicion=document.createElement("div");
        posicion.setAttribute("class","celda");
        posicion.textContent=i;
        trPosicion.appendChild(posicion);
    }
    for(let i=0;i<Arrai.length;i++){
        posicion=document.createElement("div");
        posicion.setAttribute("class","celda");
        posicion.textContent=Arrai[i];
        trValor.appendChild(posicion);
    }
}
function DibujarConjunto(){
    const trPosicion=document.getElementById("trPosicion");
    const trValor=document.getElementById("trValor");
    trValor.setAttribute("class","Doble");
    trPosicion.setAttribute("class","Invisible");
    trValor.innerHTML="<p>VALOR</p>";
    let posicion;
    for(valor of Conjunto.values()){
        posicion=document.createElement("div");
        posicion.setAttribute("class","celda");
        posicion.textContent=valor;
        trValor.appendChild(posicion);
    }
}
function DibujarMapa(){
    const trPosicion=document.getElementById("trPosicion");
    const trValor=document.getElementById("trValor");
    trPosicion.setAttribute("class","VisibleFlex");
    trValor.setAttribute("class","Solo");
    trPosicion.innerHTML="<p>CLAVE</p>";
    trValor.innerHTML="<p>VALOR</p>";
    let posicion;
    for(clave of Mapa.entries()){
        posicion=document.createElement("div");
        posicion.setAttribute("class","celda");
        posicion.textContent=clave[0];
        trPosicion.appendChild(posicion);
    }
    for(valor of Mapa.values()){
        posicion=document.createElement("div");
        posicion.setAttribute("class","celda");
        posicion.textContent=valor;
        trValor.appendChild(posicion);
    }
}
function PeticionDeDatos(pregunta,estructura){
    const Cuerpo=document.getElementById("Cuerpo");
    const div=document.createElement("div");
    let input,Nombres,bot,tr,td,span;
    div.textContent=pregunta;
    div.setAttribute("id","Pregunta");
    //Span del valor.
    span=document.createElement("span");
    span.textContent="Valor:"
    span.setAttribute("id","spanValor");
    div.appendChild(span);
    //Input del Valor.
    input=document.createElement("input");
    input.setAttribute("type","text");
    input.setAttribute("id","DatosValor");
    div.appendChild(input);
    if(estructura=="Mapa"){
        input.setAttribute("class","inputConMapa");
        span.setAttribute("class","spanConMapa");
        //Span de la Clave.
        span=document.createElement("span");
        span.textContent="Clave:"
        span.setAttribute("id","spanClave");
        div.appendChild(span);
        //Input de la Clave.
        input=document.createElement("input");
        input.setAttribute("type","text");
        input.setAttribute("id","DatosClave");
        div.appendChild(input);
    }
    else{
        input.setAttribute("class","inputSinMapa");
        span.setAttribute("class","spanSinMapa");
    }
    input=document.createElement("input");
    input.setAttribute("type","button");
    input.setAttribute("value","CONTINUAR");
    input.setAttribute("id","Continuar");
    input.addEventListener("click",()=>{
        let correcto=true;
        if(document.getElementById("ErrorValor")!=null){
            document.getElementById("Pregunta").removeChild(document.getElementById("ErrorValor"));
        }
        if(document.getElementById("ErrorClave")!=null){
            document.getElementById("Pregunta").removeChild(document.getElementById("ErrorClave"));
        }
        if(estructura=="Mapa"){
            if((document.getElementById("DatosClave").value)==""){
                input=document.createElement("p");
                input.setAttribute("id","ErrorClave");
                input.textContent="No debes dejar el campo vacio.";
                div.appendChild(input);
                correcto=false;
            }
        }
        if((document.getElementById("DatosValor").value)==""){
            input=document.createElement("p");
            input.setAttribute("id","ErrorValor");
            if(estructura=="Mapa"){
                input.setAttribute("class","ErrorConMapa");
            }
            else{
                input.setAttribute("class","ErrorSinMapa");
            }
            input.textContent="No debes dejar el campo vacio.";
            div.appendChild(input);
            correcto=false;
        }
        if(correcto){
            Imagen.setAttribute("class","Visible");
            Salida.setAttribute("class","Visible");
            h2Salida.setAttribute("class","Visible");
            switch(estructura){
                case "Array":
                    Arrai.push(document.getElementById("DatosValor").value);
                    DibujarArray();
                    Nombres=[
                        ["PUSH"    ,1,accionPush    ,[true]             ,["Elemento a añadir"]                                                     ],
                        ["POP"     ,0,accionPop     ,[]                 ,[]                                                                        ],
                        ["SHIFT"   ,0,accionShift   ,[]                 ,[]                                                                        ],
                        ["UNSHIFT" ,1,accionUnshift ,[true]             ,["Elemento a añadir"]                                                     ],
                        ["INCLUDES",2,accionIncludes,[true ,false]      ,["Elemento a buscar","Posición inicial"]                                  ],
                        ["REVERSE" ,0,accionReverse ,[]                 ,[]                                                                        ],
                        ["SLICE"   ,2,accionSlice   ,[false,false]      ,["Posición inicial","Posición final"]                                     ],
                        ["SPLICE"  ,3,accionSplice  ,[true ,false,false],["Posicion inicial","Nº de elementos a eliminar","Elementos a añadir"]    ]
                    ];
                break;
                case "Conjunto":
                    Conjunto.add(document.getElementById("DatosValor").value);
                    DibujarConjunto();
                    Nombres=[
                        ["ADD"   ,1,accionAdd           ,[true],["Elemento a añadir"]  ],
                        ["DELETE",1,accionDeleteConjunto,[true],["Elemento a eliminar"]],
                        ["CLEAR" ,0,accionClearConjunto ,[]    ,[]                     ],
                        ["HAS"   ,1,accionHasConjunto   ,[true],["Elemento a buscar"]  ],
                        ["SIZE"  ,0,accionSizeConjunto  ,[]    ,[]                     ]
                    ];
                break;
                case "Mapa":
                    Mapa.set(document.getElementById("DatosClave").value,document.getElementById("DatosValor").value);
                    DibujarMapa();
                    Nombres=[
                        ["SET"   ,2,accionSet       ,[true,true],["Clave del elemento","Valor del elemento"]],
                        ["GET"   ,1,accionGet       ,[true]     ,["Elemento a buscar"]                      ],
                        ["DELETE",1,accionDeleteMapa,[true]     ,["Elemento a eliminar"]                    ],
                        ["CLEAR" ,0,accionClearMapa ,[]         ,[]                                         ],
                        ["HAS"   ,1,accionHasMapa   ,[true]     ,["Elemento a buscar"]                      ],
                        ["SIZE"  ,0,accionSizeMapa  ,[]         ,[]                                         ]
                    ];
                break;
            }
            Cuerpo.removeChild(div);
            for(metodo of Nombres){
                tr=document.createElement("tr");
                td=document.createElement("td");
                bot=document.createElement("button");
                bot.setAttribute("id",metodo[0]);
                bot.textContent=metodo[0];
                bot.setAttribute("class","Boton");
                td.setAttribute("class","Error "+metodo[0]);
                tr.appendChild(td);
                td=document.createElement("td");
                td.appendChild(bot);
                tr.appendChild(td);
                td=document.createElement("td");
                for(let i=0;i<metodo[1];i++){
                    input=document.createElement("input");
                    input.type="text";
                    input.name=metodo[0];
                    input.placeholder=metodo[4][i];
                    td.appendChild(input);
                }
                tr.appendChild(td);
                Botones.appendChild(tr);
                let cont=0;
                for(inp of document.getElementsByName(metodo[0])){
                    if(metodo[3][cont]){
                        inp.setAttribute("class","Obligatorio");
                    }
                    else{
                        inp.setAttribute("class","Opcional");
                    }
                    cont=cont+1;
                }
                document.getElementById(metodo[0]).addEventListener("click",metodo[2]);
                document.getElementById(metodo[0]).addEventListener("click",()=>{
                    Salida.scrollBy(0,10000000000);
                    Imagen.scrollBy(10000000000,0);
                });
            }
        }
    });
    div.appendChild(input);
    Cuerpo.appendChild(div);
}
const Arrays=document.getElementById("Arrays");
const Conjuntos=document.getElementById("Conjuntos");
const Mapas=document.getElementById("Mapas");
const Imagen=document.getElementById("Imagen");
const Botones=document.getElementById("Botones");
const Salida=document.getElementById("Salida");
const h2Salida=document.getElementById("h2Salida");
var Arrai=new Array();
var Conjunto=new Set();
var Mapa=new Map();
Arrays.addEventListener("click",()=>{
    LimpiarPantalla();
    PeticionDeDatos("Introduzca el primer valor del Array:","Array");
    console.log(Arrai);
});
Conjuntos.addEventListener("click",()=>{
    LimpiarPantalla();
    PeticionDeDatos("Introduzca el primer valor del Conjunto:","Conjunto");
    console.log(Conjunto);
});
Mapas.addEventListener("click",()=>{
    LimpiarPantalla();
    PeticionDeDatos("Introduzca el primer valor del Mapa:","Mapa");
    console.log(Mapa);
});