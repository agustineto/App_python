import { obtenerSolicitudes, aprobarSolicitudes, rechazoSolicitudes } from "./API.js" 


const tablaSolicitudes = document.querySelector('.cuerpo-tabla')
const solicitudes = document.querySelector('.selectorSolicitudes')

window.addEventListener( 'load', () => {   
    muestraSolicitudes()
    tablaSolicitudes.addEventListener('click',cambiaSolicitud)
    solicitudes.addEventListener('change', muestraSolicitudes)

})

const muestraSolicitudes = async () => {
 
    const tipo = parseInt(solicitudes.value)
    console.log(solicitudes.value)

    if(tipo === 1){
        limpiarHtml()
        const listaSolicitudes = await obtenerSolicitudes()
            listaSolicitudes.map( data  => {
                if(data[7] === 3 ){
                    let date = new Date(data[4])
                    let dia =  date.getDay()
                    let mes =  date.getMonth()
                    let anio =  date.getFullYear()
                    let fecha = dia.toString.length > 1 ? dia : "0"+ dia +`/${mes}/${anio}`
                    const tr = document.createElement('tr')
                    tr.innerHTML = `
                                    <td>${fecha}</td>
                                    <td>${data[0]} ${data[1]} ${data[2]}</td>
                                    <td>${data[3]}</td>
                                    <td>${data[10]}</td>
                                    <td>
                                     ${data[7] == 1 ? `<span class="solicitud-proceso">En proceso</span>` : data[7] == 2 ? `<span class="solicitud-rechazada">Rechazada</span>`: `<span class="solicitud-aprobada">Aprobada</span>`}
                                    </td>
                                    <td>$ ${data[5]}</td>
                                    <td>$ ${data[6]}</td>
                                    <td> <img class="check aprobar" id="aprobar" data-id="${data[9]}" src="../static/img/check.png"></img> </td>
                                    <td> <img class="check rechazar" id="rechazar" data-id="${data[9]}" src="../static/img/cancel.png"></img> </td>
                                    `
                    tablaSolicitudes.appendChild(tr)
                }
            })
        
    }

    if(tipo === 2){
        limpiarHtml()
        const listaSolicitudes = await obtenerSolicitudes()
            listaSolicitudes.map( data  => {
                if(data[7] === 2 ){
                    let date = new Date(data[4])
                    let dia =  date.getDay()
                    let mes =  date.getMonth()
                    let anio =  date.getFullYear()
                    let fecha = dia.toString.length > 1 ? dia : "0"+ dia +`/${mes}/${anio}`
                    const tr = document.createElement('tr')
                    tr.innerHTML = `
                                    <td>${fecha}</td>
                                    <td>${data[0]} ${data[1]} ${data[2]}</td>
                                    <td>${data[3]}</td>
                                    <td>${data[10]}</td>
                                    <td>
                                     ${data[7] == 1 ? `<span class="solicitud-proceso">En proceso</span>` : data[7] == 2 ? `<span class="solicitud-rechazada">Rechazada</span>`: `<span class="solicitud-aprobada">Aprobada</span>`}
                                    </td>
                                    <td>$ ${data[5]}</td>
                                    <td>$ ${data[6]}</td>
                                    <td> <img class="check aprobar" id="aprobar" data-id="${data[9]}" src="../static/img/check.png"></img> </td>
                                    <td> <img class="check rechazar" id="rechazar" data-id="${data[9]}" src="../static/img/cancel.png"></img> </td>
                                    `
                    tablaSolicitudes.appendChild(tr)
                }
            })
        
    }

    if(tipo === 0){
        limpiarHtml()
        const listaSolicitudes = await obtenerSolicitudes()
            listaSolicitudes.map( data  => {
    
                    let date = new Date(data[4])
                    let dia =  date.getDay()
                    let mes =  date.getMonth()
                    let anio =  date.getFullYear()
                    let fecha = dia.toString.length > 1 ? dia : "0"+ dia +`/${mes}/${anio}`
                    const tr = document.createElement('tr')
                    tr.innerHTML = `
                                    <td>${fecha}</td>
                                    <td>${data[0]} ${data[1]} ${data[2]}</td>
                                    <td>${data[3]}</td>
                                    <td>${data[10]}</td>
                                    <td>
                                     ${data[7] == 1 ? `<span class="solicitud-proceso">En proceso</span>` : data[7] == 2 ? `<span class="solicitud-rechazada">Rechazada</span>`: `<span class="solicitud-aprobada">Aprobada</span>`}
                                    </td>
                                    <td>$ ${data[5]}</td>
                                    <td>$ ${data[6]}</td>
                                    <td> <img class="check aprobar" id="aprobar" data-id="${data[9]}" src="../static/img/check.png"></img> </td>
                                    <td> <img class="check rechazar" id="rechazar" data-id="${data[9]}" src="../static/img/cancel.png"></img> </td>
                                    `
                    tablaSolicitudes.appendChild(tr)
                
            })
        
    }
    
}


function cambiaSolicitud(e){
    e.preventDefault()
    if(e.target.classList.contains('aprobar')){
        const id = e.target.getAttribute('data-id')
        const objSolicitud = {
            id: parseInt(id),
            aprobacion:3
        }
    
        aprobarSolicitudes(objSolicitud)
        bootbox.alert({
            message: "La solicitud sera aprobada.",
            backdrop: true,
            callback: function (result) {
                location.reload()
            }
        });
    }
    if(e.target.classList.contains('rechazar')){

        const id = e.target.getAttribute('data-id')
        const objSolicitud = {
            id: parseInt(id),
            aprobacion:2
        }
        rechazoSolicitudes(objSolicitud)
        bootbox.alert({
            message: "La solicitud sera rechazada.",
            backdrop: true,
            callback: function (result) {
                location.reload()
            }
        });
        
    }
}


function limpiarHtml(){
    while(tablaSolicitudes.firstElementChild){
        tablaSolicitudes.removeChild(tablaSolicitudes.firstElementChild)
    }
}


