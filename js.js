const dbTerapias = [
    {
        nombre: "runas wicca",
        precio: 4000,
    },
    {
        nombre: "mesa cuantica",
        precio: 4000
    },
    {
        nombre: "bioenergia",
        precio: 3500
    },
    {
        nombre: "pendulo",
        precio: 3000
    },
]

let terapiasArr = []
let turnosArr = []
let trueOfalse = true

//Clase constructora
class Terapia {
    constructor(nombre, precio) {        
        this.nombre = nombre
        this.precio = precio
    }
}

//Funciones
function pushTerapias() {
    for (const terapia of dbTerapias) {
        terapiasArr.push(new Terapia(terapia.nombre, terapia.precio))
    }
}
pushTerapias()

//Validacion de nombre
//Ciclo por conteo
for (let i = 1; i <= 3; i++){
    const nombre = prompt ("Ingresa tu nombre").toLowerCase()
    if (nombre != ""){  
        alert (`Hola ${nombre}`)  
        break;        
    }
}

//Validacion de edad
let edad = parseInt (prompt ("Ingresa tu edad"))
console.log (`Tienes ${edad} años`)

//Condicional
if (edad >= 18){
    alert ("Bienvendo a karuna terapias holisticas")
    initProgram()
} else if (edad < 18){
    alert ("No puedes ingresar porque eres menor de edad")
} else{
    prompt ("Ingresa nuevamente tu edad")
}

function initProgram() {
    let opcion = prompt("Ingrese una opcion: \n1)Ver las terapias\n2)Añadir una terapia \n3)Eliminar una terapia\n4)Buscar una terapia \n5)Agendar un turno\n6)Buscar un turno\n7)Salir");
    while (trueOfalse) {
        switch (opcion) {
            case "1":
                verTerapias()
                break;
            case "2":
                agregarTerapia()
                break;
            case "3":
                eliminarTerapia()
                break;
            case "4":
                buscarTerapia()
                break;
            case "5":
                agendarTurno()
                break;
            case "6":
                buscarTurno()
                break;
            case "7":
                trueOfalse = false
                break;
            default:
                alert("No es una opcion valida")
                opcion = prompt("Ingrese una opcion: \n1)Ver las terapias\n2)Añadir una terapia \n3)Eliminar una terapia\n4)Buscar una terapia \n5)Agendar un turno\n6)Busca tu turno\n7)Salir");
        }
    }
}

//Case 1
function verTerapias() {
    auxiliarTerapias(terapiasArr, alert)
    alert("Fin de la lista")
    initProgram()
}
function auxiliarTerapias(arr, fn) {
    for (const terapia of arr) {
        fn(terapia.nombre + " valor de la sesion $" + terapia.precio)
    }
}

//Case 2
function agregarTerapia() {    
    let nombre = prompt("Introduce el nombre de la terapia");
    let precio = Number(prompt("Introduce el precio de la sesion"));
    while (trueOfalse) {
        if(nombre == "" || precio == 0 || isNaN(precio)){
            alert("No has introducido un valor")
            nombre = prompt("Introduce el nombre de la terapia");
            precio = Number(prompt("Introduce el precio de la sesion"));
        } else {
            let producto = new Terapia(nombre, precio)
            terapiasArr.push(producto)
            console.log(terapiasArr)
            initProgram()
        }
    }
}

//Case 3
function eliminarTerapia(){
    let nombre = prompt("Introduce el nombre de la terapia que deseas eliminar");
    const eliminarTerapia = terapiasArr.map((terapia) => terapia.nombre).indexOf(nombre)
    if (eliminarTerapia == -1){
        alert("No hay terapias con el nombre introducido")
        initProgram()
    } else {
        alert (`La terapia eliminada es ${terapiasArr[eliminarTerapia].nombre}`)
        terapiasArr.splice(eliminarTerapia, 1)
        initProgram()
    }
    console.log (terapiaEncontrada)
}

//Case 4
function buscarTerapia() {
    let nombre = prompt("Introduce el nombre de la terapia que deseas buscar");
    const terapiaEncontrada = terapiasArr.map((terapia) => terapia.nombre).indexOf(nombre)
    if (terapiaEncontrada == -1){
        alert("No hay terapias con el nombre introducido")
        initProgram()
    } else {
        alert (`La terapia encontrada es ${terapiasArr[terapiaEncontrada].nombre}\nY su precio es de $:${terapiasArr[terapiaEncontrada].precio}`)
    }
    console.log (terapiaEncontrada)
}

//Case 5
function agendarTurno() {
    const nombre = prompt("Ingrese su nombre completo")
    const dni = prompt("Ingrese su dni")
    const cel = prompt("Ingrese su numero de celular")
    const dia = prompt("Ingrese dia de turno en formato dd")
    const mes = prompt("Ingrese mes de turno en formato mm")
    const anio = prompt("Ingrese anio de turno en formato aaaa")
    const hora = prompt("Ingrese hora de turno en formato hh")
    const minutos = prompt("Ingrese minutos de turno en formato mm")
    const fecha = new Date(anio, mes, dia, hora, minutos)
    const turno = {
        nombre: nombre,
        dni: dni,
        cel: cel,
        fecha: fecha,
    }
    turnosArr.push(turno)
    alert("Su turno fue agendado con exito")
    console.log(turnosArr)
    initProgram()

}

//Case 6
function buscarTurno() {
    const nombre = prompt("Ingrese el nombre completo del usuario")
    let turnoEncontrado = turnosArr.find((turno) => {
        return turno.nombre === nombre
    })
    if (turnoEncontrado) {
        alert(`
        Nombre: ${turnoEncontrado.nombre}
        Dni: ${turnoEncontrado.dni}
        Celular: ${turnoEncontrado.cel}
        Turno: ${turnoEncontrado.fecha.toLocaleString()}
        `)
    } else {
        alert("No se encontro turno")
    }
    initProgram()
}