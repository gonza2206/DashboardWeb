import axios from 'axios';


// configuracion por defecto para axios 

export default axios.create(
    {
        baseURL: 'http://10.0.0.111:3010',// de donde obtengo los datos
        responseType: 'json',// tipo de respuesta que espera
        timeout: 6000 // si la peticion falla despues de 6 segundos tiro un error
    }
)