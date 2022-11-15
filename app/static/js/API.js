import { obtenerNumeroSolicitudes } from "./paginador.js"

export const creaUsuario = async usuario => {

    try {
        const solicitud = await fetch('/api/users', {
            method:'POST',
            body: JSON.stringify(usuario),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const data = await solicitud.json()
        console.log(data)
    } catch (error) {
        console.log(error + " errorFatal")
    }
}


export const eliminaUsuario = async id => {
    try {
       await fetch(`/api/users/${id}`,{
        method:'DELETE'
       })
    } catch (error) {
        console.log(error)
    }
}


export const obtenerSolicitudes = async () => {

    try {
        const solicitud = await fetch('http://107.180.100.184:5011/api/solicitudes')
        const respuesta = await solicitud.json()
        return respuesta
    } catch (error) {
        console.log(`${error} obtener solicitudes API`)
    }
}

export const aprobarSolicitudes = async solicitud => {
    try {
        const {id, aprobacion} = solicitud
        await fetch(`http://107.180.100.184:5011/api/solicitudes/${solicitud}`,{
            method:'PUT',
            body: JSON.stringify(solicitud),
            headers: {
                'Content-Type': 'application/json',
            }
        })

    } catch (error) {
        console.log(`${error} obtener solicitudes API`)
    }
}


export const rechazoSolicitudes = async solicitud => {
    try {
        const {id, aprobacion} = solicitud
        await fetch(`http://107.180.100.184:5011/api/solicitudes/${solicitud}`,{
            method:'PUT',
            body: JSON.stringify(solicitud),
            headers: {
                'Content-Type': 'application/json',
            }
        })

    } catch (error) {
        console.log(`${error} obtener solicitudes API`)
    }
}