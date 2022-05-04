'use strict'
import { openModal, closeModal } from "./modal.js"
import { readCustomers, creatCustomer, deleteCustomer, updateCustumer } from "./customers.js"

const creatRows = ({nome,email,celular,cidade,id}) => {
    const row  = document.createElement('tr');
    row.innerHTML = `  
    <td>${nome}</td>
    <td>${email}</td>
    <td>${celular}</td>
    <td>${cidade}</td>
    <td>
        <button type="button" class="button green" onClick="editCustomers(${id})" >editar</button>
        <button type="button" class="button red" onClick="delCustomers(${id})" >excluir</button>
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

const isEdit = () => document.getElementById('nome').hasAttribute('data-id')

const saveCustomer = async () => {

    //Criar um json com as info do cliente
    const custumer = {
        'id': '' , 
        'nome': document.getElementById('nome').value , 
        'email': document.getElementById('email').value , 
        'celular': document.getElementById('celular').value , 
        'cidade': document.getElementById('cidade').value 
    }

    if (isEdit()) {
        custumer.id = document.getElementById('nome').dataset.id
        await updateCustumer(custumer)
    }else {
        //enviar o json pra api
        await creatCustomer(custumer)
    }

    //fechar modal
    closeModal()
    //atualizar tabela
    updateTable()
}

globalThis.delCustomers = async (id) => {
    await deleteCustomer(id)
    updateTable()
}

const fillForm = (customer) => {

    document.getElementById('nome').value = customer.nome
    document.getElementById('email').value = customer.email
    document.getElementById('celular').value = customer.celular
    document.getElementById('cidade').value = customer.cidade
    document.getElementById('nome').dataset.id = customer.id

}

globalThis.editCustomers = async (id) => {
    const customer = await readCustomers(id)
    fillForm(customer)

    openModal()
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