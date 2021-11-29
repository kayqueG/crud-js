'use strict'

const openModal = () => document.getElementById('modal')
    .classList.add('active')

const closeModal = () => {
    limparCampos()
    document.getElementById('modal')
        .classList.remove('active')

}

const getLocalStorage = () => JSON.parse(localStorage.getItem("db_cliente")) ?? [] // passando de string para objeto de novo e verificando se é nulo, se for, retorna um array vazio

const setLocalStorage = (db_cliente) => localStorage.setItem("db_cliente", JSON.stringify(db_cliente))


//DELETE
const deletarCliente = (index) => {
    const db_cliente = lerCliente()
    db_cliente.splice(index, 1)
    setLocalStorage(db_cliente)
}

//UPDATE
const atualizarCliente = (index, cliente) => {
    const db_cliente = lerCliente()
    db_cliente[index] = cliente
    setLocalStorage(db_cliente)
}


//READ
const lerCliente = () => getLocalStorage()


//CREATE
const criarCliente = (cliente) => {

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
    document.getElementById('nome').dataset.index = 'new'
}

//Interação com o usuario
const salvarCliente = () => {
    if (camposValidos()) {
        const cliente = {
            nome: document.getElementById("nome").value,
            email: document.getElementById("email").value,
            celular: document.getElementById("celular").value,
            cidade: document.getElementById("cidade").value

        }
        const index = document.getElementById("nome").dataset.index
        if (index == "new") {
            criarCliente(cliente)
            atualizarTabela()
            closeModal()
        } else {
            atualizarCliente(index, cliente)
            atualizarTabela()
            closeModal()
        }
    }
}

const criarLinha = (cliente, index) => {
    const novaLinha = document.createElement('tr')
    novaLinha.innerHTML = `
    <td>${cliente.nome}</td>
    <td>${cliente.email}</td>
    <td>${cliente.celular}</td>
     <td>${cliente.cidade}</td>
     <td>
        <button id="editar-${index}" type="button" class="button green" > editar</button>
        <button id="deletar-${index}" type="button" class="button red"> excluir</button>
        </td>
     `
    document.querySelector('#tableClient>tbody').appendChild(novaLinha) // inserindo no tbody

}

const limparTabela = () => {
    const linhas = document.querySelectorAll('#tableClient>tbody tr')
    linhas.forEach(linha => linha.parentNode.removeChild(linha))
}
const atualizarTabela = () => {
    const db_cliente = lerCliente()
    limparTabela()
    db_cliente.forEach(criarLinha)
}

const preencherCampos = (cliente) => {
    document.getElementById("nome").value = cliente.nome
    document.getElementById("email").value = cliente.email
    document.getElementById("celular").value = cliente.celular
    document.getElementById("cidade").value = cliente.cidade
    document.getElementById("nome").dataset.index = cliente.index
}

const editarCliente = (index) => {

    const cliente = lerCliente()[index]
    cliente.index = index
    preencherCampos(cliente)
    openModal()
}

const editarDeletar = (evento) => {
    if (evento.target.type == 'button') {
        const [action, index] = evento.target.id.split('-')

        if (action == 'editar') {
            editarCliente(index)
        } else {
            const cliente = lerCliente()[index]
            const response = confirm(`Você tem certeza que deseja excluir o cliente: ${cliente.nome}`)//Confirmando se o usuario quer deletar mesmo
            if (response) {
                deletarCliente(index)
                atualizarTabela()
            }

        }
    }

}

atualizarTabela()

document.getElementById('cadastrarCliente') // abrir o modal quando o usuario clicar em cadastrar cliente
    .addEventListener('click', openModal)

document.getElementById('modalClose')  // fechar o modal quando o usuario clicar em  fechar
    .addEventListener('click', closeModal)

document.getElementById('salvar').addEventListener('click', salvarCliente)

document.querySelector('#tableClient>tbody').addEventListener('click', editarDeletar)