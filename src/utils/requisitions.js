import api from "../services/api";
import { getItem } from "./storage";

const token = getItem('token');

export async function fillCategories() {
    try {
        const response = await api.get('/categoria', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        // Para ordenar a resposta da api em ordem alfabética
        const orderedCategories = response.data.sort((a, b) => a - b)

        return orderedCategories //Para setCategories receber a resposta da api em ordem alfabética
    } catch (error) {

    }
}

export async function loadTransactions() {

    try {
        const response = await api.get('/transacao', {
            headers: {
                Authorization: `Bearer ${token}` //Enviar o token no cabeçalho da api para solicitar acesso 
            }
        })
        //Retornar todo o conteúdo da response
        return response.data

    } catch (error) {
        console.log(error.response)
    }
}