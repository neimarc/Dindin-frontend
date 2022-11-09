import axios from 'axios';

//Configuração básico de axios que serve para fazer a integração com o backend
export default axios.create({
    baseURL: 'http://localhost:3000', //Local ende está a api do backend
    timeout: 10000,
    headers: {
        'Content-Type': 'aplication/json' //Para sinalizar que os dados que serão transitados estão em formato json
    }
})