'use strict'
import { openModal, closeModal } from "./modal.js"
import { readCustomers, creatCustomer, deleteCustomer } from "./customers.js"

const creatRows = (cliente) => {
    const row  = document.createElement('tr');
    row.innerHTML = `  <td>${cliente.nome}</td>
    <td>${cliente.email}</td>
    <td>${cliente.celular}</td>
    <td>${cliente.cidade}</td>
    <td>
        <button type="button" class="button green" id="editar-${cliente.id}" >editar</button>
        <button type="button" class="button red" id="excluir-${cliente.id}" >excluir</button>
    </td>`
  return row
}

const updateTable = async () => {

    const customersContainer = document.getElementById('customers-container')

    //ler a API e armazenar o resultado
    const customers = await readCustomers()

    //criar uma nova linha na tbl
    const rows = customers.map(creatRows)
    customersContainer.replaceChildren(...rows)
}

const saveCustomer = async () => {

    //Criar um json com as info do cliente
    const client = {
        'id': '' , 
        'nome': document.getElementById('nome').value , 
        'email': document.getElementById('email').value , 
        'celular': document.getElementById('celular').value , 
        'cidade': document.getElementById('cidade').value 
    }
    console.log(client)
    //emvar o json pra api
    await creatCustomer(client)
    //fechar modal
    closeModal()
    //atualizar tabela
    updateTable()
}

const selectClient = async () => {
    if (event.target.type == "button") {
        const [action, id] = event.target.id.split("-")

        if (action == "excluir") {
            await deleteCustomer(id)
            updateTable()
        }else if (action == "editar") {
            console.log( id + " EXCLUIR" )
        }
    }
}

updateTable()

document.getElementById('cadastrarCliente').addEventListener('click', openModal)
document.getElementById('salvar').addEventListener('click', saveCustomer)
document.getElementById('customers-container').addEventListener('click', selectClient)