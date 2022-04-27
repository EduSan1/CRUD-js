'use strict'

const url = 'https://testeleonid.herokuapp.com/clientes';
const readCustomers = async () => {
    
    const response = await fetch(url);
    return await response.json()
}

const creatCustomer = async (customer) => {
    const options = {
        "method": 'POST',
        'body':JSON.stringify(customer),
        'headers': {
            'content-type': 'application/json'
        }

    }

    const response = await fetch(url,options)
}

const deleteCustomer= async (id) => {

    const options = {
        "method": 'DELETE'
        }
        const response = await fetch(`${url}/${id}`, options) ;
        // return await response.json()
}

export { readCustomers , creatCustomer , deleteCustomer } 