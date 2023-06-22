//VARIABLES
const formFlores = document.getElementById("formFlores")
const reservarTurno = document.getElementById("reservarTurno")
const turno = document.getElementById("turno")
const edad = document.getElementById("edad")
const inputsForm = document.querySelectorAll(".inputsForm")
const formPendulo = document.getElementById("formPendulo")
const reservarTurnoPendulo = document.getElementById("reservarTurnoPendulo")
const turnoPendulo = document.getElementById("turnoPendulo")
const edadPendulo = document.getElementById("edadPendulo")
const inputsFormPendulo = document.querySelectorAll(".inputsFormPendulo")
const urlTerapias = "https://6494a2c70da866a9536810ed.mockapi.io/terapias"

let validar = false
let turnosArr = []
     


//DOCUMENT
document.addEventListener("DOMContentLoaded", () => {
    let turnos = JSON.parse(localStorage.getItem("turnos")) || []    
    turnos.length > 0 && turnos.forEach(turnos =>{
            turnosArr.push(turnos)
        })        
    }
)
//EVENTOS

//flores
formFlores.addEventListener("submit", (event)=> {
    event.preventDefault()
    validar && enviarForm()
    setTimeout(resenia,4000) 
      
})

//pendulo
formPendulo.addEventListener("submit", (event)=> {
    event.preventDefault()
    validar && enviarFormPendulo()
    setTimeout(resenia,4000)
})

//flores
turno.addEventListener("click", () => {
    formFlores.classList.remove("disable")
    agendarTurno()
})

//pendulo
turnoPendulo.addEventListener("click", () => {
   formPendulo.classList.remove("disable")
   agendarTurnoPendulo()
})

//BOTONES SELECT

//flores
inputsForm[3].addEventListener("change",() => {   
})

inputsForm[4].addEventListener("change", () => {   
})

//pendulo

inputsFormPendulo[3].addEventListener("change",() => {   
})

inputsFormPendulo[4].addEventListener("change", () => {   
})

//FUNCIONES

//estas funciones agenda el turno
function agendarTurno() {
    const nombre = inputsForm[0].value
    const edad = parseInt(inputsForm[1].value)
    const cel = inputsForm[2].value
    const fecha = inputsForm[3].value
    const hora = inputsForm[4].value
    
    inputsForm.forEach(input => {
        input.addEventListener("input", () => {
            if (inputsForm[0].value && inputsForm[1].value && inputsForm[2].value && inputsForm[3].value && inputsForm[4].value){                    
                reservarTurno.classList.remove("disableBtn")
                reservarTurno.addEventListener("click", () =>{
                    almacenamiento()
                    validarEdad()
                    .then((res) =>{
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: `${res}`,
                            background: '#e5e3e3',
                            showConfirmButton: false,
                            timer: 1500                        
                        })
                    })
                    .catch((err) => {
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: `${err}`,
                            background: '#e5e3e3',
                            showConfirmButton: false,
                            timer: 3500                        
                        })
                    })                     
                    formFlores.classList.add("disable")
                    formFlores.reset()                                  
                })                              
            } else {
                reservarTurno.classList.add("disableBtn")
                validar = false                              
            }
        })
    })
}

function agendarTurnoPendulo() {
    const nombre = inputsFormPendulo[0].value
    const edad = parseInt(inputsFormPendulo[1].value)
    const cel = inputsFormPendulo[2].value
    const fecha = inputsFormPendulo[3].value
    const hora = inputsFormPendulo[4].value   
    
    inputsFormPendulo.forEach(input => {
        input.addEventListener("input", () => {
            if (inputsFormPendulo[0].value && inputsFormPendulo[1].value && inputsFormPendulo[2].value && inputsFormPendulo[3].value && inputsFormPendulo[4].value){                                        
                reservarTurnoPendulo.classList.remove("disableBtn")
                reservarTurnoPendulo.addEventListener("click", () =>{
                    almacenamientoPendulo()
                    validarEdadPendulo()
                    .then((reso) =>{
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: `${reso}`,
                            background: '#e5e3e3',
                            showConfirmButton: false,
                            timer: 3500                        
                        })
                    })
                    .catch((erro) => {
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: `${erro}`,
                            background: '#e5e3e3',
                            showConfirmButton: false,
                            timer: 3500                        
                        })
                    })
                    formPendulo.classList.add("disable")
                    formPendulo.reset()
                })                              
            } else {
                reservarTurnoPendulo.classList.add("disableBtn")
                validar = false
            }
        })
    })
}

//estas funciones envia el formulario
function enviarForm() {
    const nombre = inputsForm[0].value
    const edad = inputsForm[1].value
    const cel = inputsForm[2].value
    const fecha = inputsForm[3].value
    const hora = inputsForm[4].value

    const datos = {
        nombre,
        edad,
        cel,
        fecha,
        hora
    }    

    formFlores.reset()
    formFlores.classList.add("disable")
    reservarTurno.classList.add("disableBtn")  
    validar = false  
    turnosArr.push(datos)   
}

function enviarFormPendulo() {
    const nombre = inputsFormPendulo[0].value
    const edad = inputsFormPendulo[1].value
    const cel = inputsFormPendulo[2].value
    const fecha = inputsFormPendulo[3].value
    const hora = inputsFormPendulo[4].value

    const datos = {
        nombre,
        edad,
        cel,
        fecha,
        hora
    }

    formPendulo.reset()
    formPendulo.classList.add("disable")
    reservarTurnoPendulo.classList.add("disableBtn")
    validar = false    
    turnosArr.push(datos)
}

//esta funcion pide requerimientos especificos
function resenia() {
    Swal.fire({
        title: 'Ingresa una breve descripcion de las herramientas de apoyo que necesites durante la terapia',
        input: 'text',
        customClass: {
          validationMessage: 'my-validation-message'
        },
        preConfirm: (value) => {
          if (!value) {
            Swal.showValidationMessage(
              '<i class="fa fa-info-circle"></i> Este campo debe ser completado'
            )
          }
        }
      })
}
//esta funcion valida la edad por si el usuario es menor
function validarEdad() {
    return new Promise ((resolve, reject) => {
        const validacion = edad.value >= 18;
        setTimeout(() => {
            if(validacion){
                resolve("Tu turno fue agendado con éxito");
            } else {
                reject("Por favor comunicate con nuestro equipo para gestionar los permisos correspondientes de tus padres o tutores");
            }
        }, 1000)
        })
}

function validarEdadPendulo() {
    return new Promise ((resolve, reject) => {
        const validacion = edadPendulo.value >= 18;
        setTimeout(() => {
            if(validacion){
                resolve("Tu turno fue agendado con éxito");
            } else {
                reject("Por favor comunicate con nuestro equipo para gestionar los permisos correspondientes de tus padres o tutores");
            }
        }, 1000)
        })
}

//funcion asincrona para crear terapias por el momento no cumple ninguna funcion, es solo demostrativa
async function crearTerapia(terapia){
    const resp = await fetch(urlTerapias, {
        method: "GET",
        body: JSON.stringify(terapia),
        headers: {
            "Content-type": "application/json",
        }
    })
    const data = await resp.json()
    console.log(data)
}

crearTerapia()

//function localstorage
function almacenamiento(){
    const datos = {
        nombre : inputsForm[0].value,
        edad : inputsForm[1].value,
        cel : inputsForm[2].value,
        fecha : inputsForm[3].value,
        hora : inputsForm[4].value
    }
    localStorage.setItem("turno", JSON.stringify(datos))
}

function almacenamientoPendulo() {
    const datos = {
        nombre : inputsFormPendulo[0].value,
        edad : inputsFormPendulo[1].value,
        cel : inputsFormPendulo[2].value,
        fecha : inputsFormPendulo[3].value,
        hora : inputsFormPendulo[4].value,
    }
    localStorage.setItem("turno", JSON.stringify(datos))
}
