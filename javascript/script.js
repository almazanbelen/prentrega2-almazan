//variables
const formFlores = document.getElementById("formFlores")
const reservarTurno = document.getElementById("reservarTurno")
const turno = document.getElementById("turno")
const nombreInput = document.getElementById("nombre")
const dniInput = document.getElementById("dni")
const celInput = document.getElementById("cel")
const fechaInput = document.getElementById("fecha")
const horaInput = document.getElementById("hora")
const inputsForm = document.querySelectorAll(".inputsForm")
const aviso = document.getElementById("aviso")

let validar = false
let turnosArr = []

//document
document.addEventListener("DOMContentLoaded", () => {
    let turnos = JSON.parse(localStorage.getItem("turnos")) || []    
    if (turnos.length > 0){
         turnos.forEach(turnos =>{
            turnosArr.push(turnos)
        })        
    }
})

//eventos
formFlores.addEventListener("submit", (event)=> {
    event.preventDefault()
    validar && enviarForm()
    
})

fechaInput.addEventListener("change",() => {   
})

horaInput.addEventListener("change", () => {   
})

turno.addEventListener("click", () => {
     formFlores.classList.remove("disable")
     agendarTurno()
 })

//funciones
function agendarTurno() {
    const nombre = nombreInput.value
    const dni = dniInput.value

    const cel = celInput.value
    const fecha = fechaInput.value
    const hora = horaInput.value
    
    inputsForm.forEach(input => {
        input.addEventListener("input", () => {
            if (inputsForm[0].value && inputsForm[1].value && inputsForm[2].value && fechaInput[0].value && horaInput[0].value){
                reservarTurno.classList.remove("disableBtn")
                validar = true
                reservarTurno.addEventListener("click", () =>{
                    aviso.classList.remove("avisoDisable")
                    aviso.innerText = `Hola ${nombreInput.value} ¡Tu turno fue agendado con éxito!`
                })                              
            } else {
                reservarTurno.classList.add("disableBtn")
                validar = false
            }
        })
    })
}

function enviarForm() {
    const nombre = inputsForm[0].value
    const dni = inputsForm[1].value
    const cel = inputsForm[2].value
    const dia = fechaInput.value
    const hora = horaInput.value

    const datos = {
        nombre,
        dni,
        cel,
        dia,
        hora
    }
    formFlores.reset()
    formFlores.classList.add("disable")
    reservarTurno.classList.add("disableBtn")
    validar = false
    turnosArr.push(datos)
    localStorage.setItem("Turnos", JSON.stringify(turnosArr))
}



