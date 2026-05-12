'use stricted'
window.addEventListener("load",examen);
function examen(){
    var provincias=new Map();
    provincias.set("GA",["La Coruña","Lugo","Orense","Pontevedra"]);
    provincias.set("CL",["Ávila","Burgos","León","Palencia","Salamanca","Segovia","Soria","Valladolid","Zamora"]);
    provincias.set("EX",["Badajoz","Cáceres"]);
    provincias.set("PV",["Álava","Vizcaya","Guipúzcoa"]);
    var nombre=document.getElementById("nombre");
    var apellidos=document.getElementById("apellidos");
    var edad=document.getElementById("edad");
    var comunidades=document.getElementById("ccaa");
    var provincia=document.getElementById("provincia");
    var destinoArrastrable=document.querySelector(".resultado");
    var num1=document.getElementById("num1");
    var num2=document.getElementById("num2");
    var botonEnviar=document.getElementById("enviar");
    var captcha=document.getElementById("captcha");
    var formulario=document.getElementById("formulario");
    var botonFecha=document.getElementById("btnfecha");
    var botonInformacion=document.getElementById("btninfo");
    var cuadroFecha=document.getElementById("fecha");
    var cuadroInformacion=document.getElementById("informacion");
    var pie=document.getElementById("pie");


    var validarNombre=/^\w{3}/;
    var validarApellidos=/^\w{2,}\s\w{2,}/;
    var validarEdad=/^(10\d|110)|^(\d{1,2})$/;

    /*
        LO QUE YO HIZE EN EL EXAMEN
        nombre.addEventListener("focus",()=>{
            if(validarNombre.test(nombre.getAttribute("value"))){
                nombre.setAttribute("class","correcto");
            }
            else{
                nombre.setAttribute("class","error");
            }
            nombre
        });
        nombre.addEventListener("focusout",()=>{
            nombre.setAttribute("value",nombre.getAttribute("value").toUpperCase());
        });
        apellidos.addEventListener("focus",()=>{
            if(validarApellidos.test(apellidos.getAttribute("value"))){
                apellidos.setAttribute("class","correcto");
            }
            else{
                apellidos.setAttribute("class","error");
            }
        });
        edad.addEventListener("focus",()=>{
            if(validarEdad.test(edad.getAttribute("value"))){
                edad.setAttribute("class","correcto");
            }
            else{
                edad.setAttribute("class","error");
            }
        });
    */
    nombre.addEventListener("input",()=>{
        if(validarNombre.test(nombre.value)){
            nombre.classList.remove("error");
            nombre.classList.add("correcto");
        }
        else{
            nombre.classList.remove("correcto");
            nombre.classList.add("error");
        }
    });
    apellidos.addEventListener("input",()=>{
        if(validarApellidos.test(apellidos.value)){
            apellidos.classList.remove("error");
            apellidos.classList.add("correcto");
        }
        else{
            apellidos.classList.remove("correcto");
            apellidos.classList.add("error");
        }
    });
    edad.addEventListener("input",()=>{
        if(validarEdad.test(edad.value)){
            edad.classList.remove("error");
            edad.classList.add("correcto");
        }
        else{
            edad.classList.remove("correcto");
            edad.classList.add("error");
        }
    });
    nombre.addEventListener("blur",ponerMayusculas);
    apellidos.addEventListener("blur",ponerMayusculas);
    function ponerMayusculas(ev){
        ev.target.value=ev.target.value.toUpperCase();
    }
    comunidades.addEventListener("change",(ev)=>{
        let prov=provincias.get(ev.target.value);
        while(provincia.children.length>1){
            /*provincia.removeChild(provincia.children[1]);*/
            provincia.children[1].remove();
        }
        var option;
        for(const elemento of prov){
            option=document.createElement("option");
            option.textContent=elemento;
            provincia.appendChild(option);
        }
    });
    botonEnviar.addEventListener("click",(ev)=>{
        ev.preventDefault();
        if(formulario.getElementsByClassName("error").length!=0){
            alert("Hay algún dato erroneo.");
        }
        else if(provincia.value==0||comunidades.value==0){
            alert("No seleccionaste la comunidad autónoma o/y la provincia.");
        }
        else{
            generarCaptcha();
        }
    });
    function generarCaptcha(){
        let soluciones=new Set();
        let opciones=document.getElementsByClassName("opcaptcha");
        var sol,oparrastrarada=0;
        captcha.style.display="block";
        num1.textContent=parseInt(Math.random()*10);
        num2.textContent=parseInt(Math.random()*10);
        soluciones.add((Number(num1.textContent)+Number(num2.textContent)));
        while(soluciones.size<3){
            soluciones.add(parseInt(Math.random()*19));
        }
        sol=soluciones.values();
        for(const elemento of opciones){
            elemento.textContent=sol.next().value;
            elemento.setAttribute("draggable","true");
            elemento.addEventListener("dragstart",(ev)=>{
                ev.target.style.opacity="0.5";
                oparrastrarada=Number(ev.target.textContent);
                destinoArrastrable.style.backgroundColor="";
                destinoArrastrable.textContent="";
            });
            elemento.addEventListener("dragend",(ev)=>{
                ev.target.style.opacity="1";
            });
        }
        destinoArrastrable.addEventListener("dragenter",(ev)=>{
            ev.target.style.backgroundColor="yellow";
        });
        destinoArrastrable.addEventListener("dragleave",(ev)=>{
            ev.target.style.backgroundColor="";
        });
        destinoArrastrable.addEventListener("dragover",(ev)=>{
            ev.preventDefault();
        });
        destinoArrastrable.addEventListener("drop",(ev)=>{
            if(oparrastrarada==(Number(num1.textContent)+Number(num2.textContent))){
                ev.target.style.backgroundColor="lime";
                ev.target.textContent="OK";
                for(const elemento of opciones){
                    elemento.setAttribute("draggable","false");
                }
                setTimeout(()=>{
                    captcha.textContent="Enhorabuena no eres un robot.";
                    setTimeout(()=>{
                        formulario.submit();
                    },2000);
                },2000);
            }
            else{
                ev.target.style.backgroundColor="red";
                ev.target.textContent="NO";
                setTimeout(()=>{
                    ev.target.style.backgroundColor="";
                    ev.target.textContent="";
                },2000);
            }
        });
    }
    botonInformacion.addEventListener("click",()=>{
        if(pie.getElementsByClassName("cl1").length==0){
            let bcerrar=document.createElement("button");
            let i1=setInterval(()=>{
                let numBotones=0;
                for(const bot of document.getElementsByTagName("input")){
                    if(bot.getAttribute("type")=="submit"||bot.getAttribute("type")=="reset"){
                        numBotones=numBotones+1;
                    }
                }
                numBotones=numBotones+document.getElementsByTagName("button").length;
                cuadroInformacion.innerHTML="<b>Toda la info:</b><br><br>"
                +"<b>Número de párrafos: "+document.getElementsByTagName("p").length+"</b><br>"
                +"<b>Número de botones: "+numBotones+"</b><br>"
                +"<b>Número de divs: "+document.getElementsByTagName("div").length+"</b><br>"
                +"<b>Ancho de la ventana: "+screen.width+"</b><br>"
                +"<b>Alto de la ventana: "+screen.height+"</b><br>"
                +"<b>Número de páginas en el historial: "+history.length+"</b><br>"
                +"<b>Cookies activas: "+navigator.cookieEnabled+"</b><br>"
                +"<b>Idioma del navegador: "+navigator.language+"</b><br>"
                ;
            },100);
            cuadroInformacion.style.display="block";
            bcerrar.textContent="Cerrar info";
            bcerrar.classList.add("cerrar");
            bcerrar.classList.add("cl1");
            pie.appendChild(bcerrar);
            bcerrar.addEventListener("click",(ev)=>{
                cuadroInformacion.innerHTML="";
                cuadroInformacion.style.display="none";
                pie.removeChild(ev.target);
                window.clearInterval(i1);
            });
        }
    });
    botonFecha.addEventListener("click",()=>{
        if(pie.getElementsByClassName("cl2").length==0){
            let bcerrar=document.createElement("button");
            var hoy=new Date();
            var segundos=hoy.getSeconds();
            var dias=["Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sabado"];
            var meses=["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
            setInterval(()=>{
                let hoy=new Date();
                segundos=hoy.getSeconds();
                Number(segundos)<10 ? segundos="0"+segundos:null;
                cuadroFecha.innerHTML=dias[hoy.getDay()]+" "+hoy.getDate()+" de "+meses[hoy.getMonth()]+" del "+hoy.getFullYear()+"<br>"+hoy.getHours()+":"+hoy.getMinutes()+":"+segundos;
            },1000);
            cuadroFecha.innerHTML=dias[hoy.getDay()]+" "+hoy.getDate()+" de "+meses[hoy.getMonth()]+" del "+hoy.getFullYear()+"<br>"+hoy.getHours()+":"+hoy.getMinutes()+":"+hoy.getSeconds();
            cuadroFecha.style.display="block";
            bcerrar.textContent="Cerrar fecha";
            bcerrar.classList.add("cerrar");
            bcerrar.classList.add("cl2");
            pie.appendChild(bcerrar);
            bcerrar.addEventListener("click",(ev)=>{
                cuadroFecha.innerHTML="";
                cuadroFecha.style.display="none";
                pie.removeChild(ev.target);
            });
        }
    });
}