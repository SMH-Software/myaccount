
/**
 * 
 * @param {String} fragment 
 * @param {String} fragElement 
 * @param {Array} data 
 * @param {HTMLElement} AddElementContainer 
 */
export function addDataFragment (fragment, fragElement, data, AddElementContainer) {
            
    data.forEach((dataElement) => {
        let createDate = new Date(dataElement.createdAt).toLocaleDateString('fr-FR')
       
        const template = document.querySelector(`#${fragment}`)
        const content = template.content.cloneNode(true)
        const templateEl = content.querySelectorAll(`#${fragElement}`)

        templateEl[0].innerText = `${dataElement.title}`

        const strongUsername = createElement('strong', 'Username : ')
        templateEl[1].innerText = dataElement.username
        templateEl[1].prepend(strongUsername)

        const strongPassword = createElement('strong', 'Password : ')
        const spanPassword = createElement('span', `${dataElement.password}`)
        templateEl[2].prepend(strongPassword)
        templateEl[2].appendChild(spanPassword)

       if(dataElement.website !== ""){
            const strongWebsite = createElement('strong', 'Website : ')
            const aWebsite = createElement('a', `${dataElement.website}`)
            aWebsite.href = dataElement.website 
            aWebsite.setAttribute('target', '_blank')
            templateEl[3].prepend(strongWebsite)
            templateEl[3].appendChild(aWebsite)
        }



        templateEl[4].innerText = `This account was added on ${createDate}`

        templateEl[5].setAttribute('data-id', dataElement._id)
        templateEl[6].setAttribute('data-id', dataElement._id)

        
        return AddElementContainer.appendChild(content)   

        
    })

}

/**
 * 
 * @param {String} endpoint 
 * @param {HTMLFormElement} idForm 
 * @param {NodeListOf<HTMLInputElement>} formInput 
 * @param {HTMLDivElement} alert 
 */
export function addAccount (endpoint , idForm, formInput, alert)  {
    idForm.addEventListener('submit', async (e) => {
        e.preventDefault()
       
        const newAccount = {
            title: formInput[0].value,
            username: formInput[1].value,
            password: formInput[2].value,
            website: formInput[3].value,
        }

        const response = await fetch(`${endpoint}`, {
            method: 'POST',
            body: JSON.stringify(newAccount),
            headers: {
                'Content-Type': 'application/json'
            }
        })
    
        const json = await response.json()
    
        if(!response.ok){
            alert.innerHTML = json.error
            alert.classList.add('error')   
    
            idForm.reset()
            slowRefresh()
        }
    
        if(response.ok){
            alert.innerHTML = json.success
            alert.classList.add('success') 

            idForm.reset()
            quickRefresh() 
        }
    
    })
}


/**
 * 
 * @param {String} elementID 
 * @param {HTMLDivElement} alert 
 */
export function getAccount (elementID, alert)  {
    const updateID = document.querySelectorAll(`.${elementID}`)
    updateID.forEach((updateOne) => {
        updateOne.addEventListener('click', async () => {
            const id = updateOne.getAttribute('data-id')

            const form = document.querySelector('.form')
            form.style.display = 'none'

            const response = await fetch(`server-murex-five.vercel.app/api/accounts-register/${id}`)
            const json = await response.json()   
            
            if(!response.ok){
                alert.innerHTML = json.error
                alert.classList.add('error')   
            }

            const formUpdate = document.querySelector('.form-update')
            const formInput = formUpdate.querySelectorAll('input')

            formInput[0].value = json.title
            formInput[1].value = json.username
            formInput[2].value = json.password
            formInput[3].value = json.website
            formInput[4].value = json._id

            formUpdate.style.display = 'flex'

        })
    }) 
}

/**
 * 
 * @param {HTMLElement} idForm 
 * @param {NodeListOf<HTMLInputElement>} formInput 
 * @param {HTMLDivElement} alert 
 */
export function updateAccount(idForm, formInput, alert) {
    idForm.addEventListener('submit', async (e) => {
        e.preventDefault()
        const newAccount = {
            title: formInput[0].value,
            username: formInput[1].value,
            password: formInput[2].value,
            website: formInput[3].value,
        }
    
        const response = await fetch(`server-murex-five.vercel.app/api/accounts-register/${formInput[4].value}`, {
            method: 'PATCH', 
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newAccount),
        })
        
        const json = await response.json()

        if(!response.ok){
            alert.innerHTML = json.error
            alert.classList.add('error')   
        }
    
     
        alert.innerHTML = json.success
        alert.classList.add('success')  
            
        quickRefresh()

    })
}

/**
 * 
 * @param {String} elementID 
 * @param {HTMLDivElement} alert 
 */
export function deleteAccount (elementID, alert) {
    const deleteID = document.querySelectorAll(`.${elementID}`)
        deleteID.forEach((deleteOne) => {
            deleteOne.addEventListener('click', async () => {
                const id = deleteOne.getAttribute('data-id')

               const response = await fetch(`server-murex-five.vercel.app/api/accounts-register/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
               
                const json = await response.json()

                if(!response.ok){
                    alert.innerHTML = json.error
                    alert.classList.add('error')   
                }
            
             
                alert.innerHTML = json.success
                alert.classList.add('success')   
                
                quickRefresh()

            })
        })   
}


/**
 * 
 * @param {string} tagName 
 * @param {string} content 
 * @returns {HTMLElement}
 */
export function createElement (tagName, content) {
    const element = document.createElement(tagName)

    if(!content){
        return element
    }else{
        element.innerText = content
        return element
    }
}

/**
 * 
 * Refresh page function in 2s
 */
export function slowRefresh() {
    return setTimeout(() => {
        const page =  window.location.href
        location.reload(page)
    }, 3000)
}

/**
 * 
 * Refresh page function in 1s
 */
export function quickRefresh() {
    return setTimeout(() => {
        const page =  window.location.href
        location.reload(page)
    }, 1000)
}

