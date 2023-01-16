import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR'




export function dateFormat(date) {
    const dateGenerator = new Date(date);

    return format(dateGenerator, 'dd/MM/yyyy')
}


export function moneyFormat(value) {
    return value.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
}


export function upperCase(word) {
    return word[0].toUpperCase() + word.slice(1, word.length)
}


export function dayFormat(date) {
    const dateGenerator = new Date(date);

    const weekDay = format(dateGenerator, 'eee', {
        locale: ptBR
    })
    return upperCase(weekDay)

}
