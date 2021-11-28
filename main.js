'use strict'

const openModal = () => document.getElementById('modal')
    .classList.add('active')

const closeModal = () => {
    limparCampos()
    document.getElementById('modal')
        .classList.remove('active')

}


const tempCliente = {
    nome: "kayque",
    email: "kayque@gmail.com",
    celular: "(11) 99090-9090",
    cidade: "Santo André"
}


const getLocalStorage = () => JSON.parse(localStorage.getItem("db_cliente")) ?? [] // passando de string para objeto de novo e verificando se é nulo, se for, retorna um array vazio

const setLocalStorage = (db_cliente) => localStorage.setItem("db_cliente", JSON.stringify(db_cliente))


//DELETE
const deleteCliente = (index) => {
    const db_cliente = readCliente()
    db_cliente.splice(index, 1)
    setLocalStorage(db_cliente)
}

//UPDATE
const updateCliente = (index, cliente) => {
    const db_cliente = readCliente()
    db_cliente[index] = cliente
    setLocalStorage(db_cliente)
}


//READ
const readCliente = () => getLocalStorage()


//CREATE
const createClient = (cliente) => {

    const db_cliente = getLocalStorage()
    db_cliente.push(cliente)
    setLocalStorage(db_cliente)

}

const camposValidos = () => {
    return document.getElementById("form").reportValidity() // retorna verdadeiro se todos os requisitos do html foram atendidos
}

const limparCampos = () => {
    const campos = document.querySelectorAll('.modal-field')
    campos.forEach(campo => campo.value = "") // deixando cada campo vazio depois do cadastro
}

//Interação com o usuario
const saveCliente = () => {
    if (camposValidos()) {
        const cliente = {
            nome: document.getElementById("nome").value,
            email: document.getElementById("email").value,
            celular: document.getElementById("celular").value,
            cidade: document.getElementById("cidade").value

        }
        createClient(cliente)
        closeModal()
    }
}




document.getElementById('cadastrarCliente') // abrir o modal quando o usuario clicar em cadastrar cliente
    .addEventListener('click', openModal)

document.getElementById('modalClose')  // fechar o modal quando o usuario clicar em  fechar
    .addEventListener('click', closeModal)

document.getElementById('salvar').addEventListener('click', saveCliente)