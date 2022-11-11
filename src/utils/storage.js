//Para leitura e escrita dentro do local storage

export function setItem(key, value) {
    localStorage.setItem(key, value)
}

export function getItem(key) {
    return localStorage.getItem(key)
}

export function clear() {
    localStorage.clear()
}

export function removeItem(key) {
    localStorage.removeItem(key)
}

//Todos são localStorage.métodos. O primeiro parâmetro de cada método é o nome de cada informação
// que está no localStorage; o segundo (no caso do setItem) é o valor a ser passado pra dentro desses campos.