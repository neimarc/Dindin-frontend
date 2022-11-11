import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR'
//Par importar os dias da semana em português


//Para fazer a data recebida em uma data válida
export function dateFormat(date) {
    const dateGenerator = new Date(date);

    return format(dateGenerator, 'dd/MM/yyyy') //Tipo de formato de data 
}

//Para formatar o dinheiro recebido
export function moneyFormat(value) {
    return value.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
}

export function upperCase(word) {
    return word[0].toUpperCase() + word.slice(1, word.length)
}

//O 'eee' é o formato de dia da semana em um palavra simples
export function dayFormat(date) {
    const dateGenerator = new Date(date);

    const weekDay = format(dateGenerator, 'eee', {
        locale: ptBR
    })
    return upperCase(weekDay)

}
