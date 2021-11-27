'use strict'

const openModal = () => document.getElementById('modal')
    .classList.add('active')

const closeModal = () => document.getElementById('modal')
    .classList.remove('active')


const tempCliente = {
    nome: "Kayque",
    email: "kayque@gmail.com",
    celular: "(11) 99090-9090",
    cidade: "Santo André"
}


const getLocalStorage = () => JSON.parse(localStorage.getItem("db_cliente")) ?? [] // passando de string para objeto de novo e verificando se é nulo, se for, retorna um array vazio

const setLocalStorage = (db_cliente) => localStorage.setItem("db_cliente", JSON.stringify(db_cliente))


//CREATE
const createClient = (cliente) => {

    const db_cliente = getLocalStorage()
    db_cliente.push(cliente)
    setLocalStorage(db_cliente)

}




document.getElementById('cadastrarCliente') // abrir o modal quando o usuario clicar em cadastrar cliente
    .addEventListener('click', openModal)

document.getElementById('modalClose')  // fechar o modal quando o usuario clicar em  fechar
    .addEventListener('click', closeModal)