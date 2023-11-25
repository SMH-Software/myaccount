import { addDataFragment, addAccount, getAccount, updateAccount, deleteAccount, createElement, quickRefresh, slowRefresh} from "./functions.js"

const containerEl = document.querySelector('.accounts-container')
const form = document.querySelector('.form')
const formInputs = form.querySelectorAll('input')

const formUpdate = document.querySelector('.form-update')
const formInputsUpdate = formUpdate.querySelectorAll('input')

formUpdate.style.display = 'none'

const message = document.querySelector('.message')
const messageSuccess = document.querySelector('.message-success')



const getAccounts = async (endpoint) => {
    try {
        const data = await fetch(endpoint)
        const jsonData = await data.json()
        containerEl.innerHTML = ''

        if(jsonData.length == 0){
            const span = createElement('span', `Not found account (${jsonData.length})`)
            span.className = 'empty-data'
            containerEl.appendChild(span)
        }

        //Read account function
        addDataFragment('my-template', 'templateEl', jsonData, containerEl) 
       
        //Get a sinple account function and put in form for update
        getAccount('update', messageSuccess)

        //Delete account function
        deleteAccount('delete', messageSuccess) 
 
    } catch (error) {
        containerEl.innerHTML = 'Faild Loading Accounts...' 
    }
}


//Get all Accounts
getAccounts('server-murex-five.vercel.app/api/accounts-register')


//Add a new account 
addAccount('server-murex-five.vercel.app/api/accounts-register', form, formInputs, message)

//Update account 
updateAccount(formUpdate, formInputsUpdate, messageSuccess)






