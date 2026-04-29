import ENVIRONMENT from "../config/environment"
import { LOCALSTORAGE_TOKEN_KEY } from "../Context/AuthContext"

export async function uploadFile (file_name, file){
    //FormData te permite generar formularios
    const body = new FormData()
    //.append agrega un campo y su valor
    body.append('file', file)
    body.append('file_name', file_name)
    const response_http = await fetch (`${ENVIRONMENT.API_URL}/api/file/upload`,{
        method: "POST",
        headers: {
           /*  "Content-Type": 'multipart/form-data', */
            "Authorization": `Bearer ${localStorage.getItem(LOCALSTORAGE_TOKEN_KEY)}`
        },
        body: body
    })
    const response = response_http.json()
    return response
}

