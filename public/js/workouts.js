import { createElement, refresh, refreshPost} from "./functions.js"

const containerEl = document.querySelector('.workouts-container')
const form = document.querySelector('.form')
const message = document.querySelector('.message')
const messageSuccess = document.querySelector('.message-success')

const getUsers = async (endpoint) => {
    try {
        const data = await fetch(endpoint)
        const jsonData = await data.json()
        containerEl.innerHTML = ''

        if(jsonData.length == 0){
            const span = createElement('span', `Not found data (${jsonData.length})`)
            span.className = 'empty-data'
            containerEl.appendChild(span)
        }

        addTemplate('my-template', 'templateEl', jsonData, containerEl)
       
        deleteData()

       updateData()  
    
         
 
    } catch (error) {
        containerEl.innerHTML = 'Faild Loading Data...' 
    }
}

const addTemplate = (fragment, fragElement, data, AddElementContainer) => {
            
    data.forEach((dataElement) => {
        let createDate = new Date(dataElement.createdAt).toLocaleDateString('fr-FR')
       
        const template = document.querySelector(`#${fragment}`)
        const content = template.content.cloneNode(true)
        const templateEl = content.querySelectorAll(`#${fragElement}`)

        templateEl[0].innerText = `N°${dataElement.number}`

        const strong = createElement('strong', 'Firstname : ')
        templateEl[1].innerText = dataElement.firstname
        templateEl[1].prepend(strong)

        const strong2 = createElement('strong', 'Lastname : ')
        templateEl[2].innerText = dataElement.lastname
        templateEl[2].prepend(strong2)

        const strong3 = createElement('strong', 'Email Address : ')
        templateEl[3].innerText = dataElement.email
        templateEl[3].prepend(strong3)

        templateEl[4].innerText = `This data was created on ${createDate}`

        templateEl[5].setAttribute('data-id', dataElement._id)
        templateEl[6].setAttribute('data-id', dataElement._id)

        
        AddElementContainer.appendChild(content)   

        
    })

}

const deleteData = () => {
    const deleteID = document.querySelectorAll('.delete')
        deleteID.forEach((deleteOne) => {
            deleteOne.addEventListener('click', async () => {
                const id = deleteOne.getAttribute('data-id')

               const response = await fetch(`http://localhost:4000/api/workouts/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
               
                const json = await response.json()

                if(!response.ok){
                    messageSuccess.innerHTML = json.error
                    messageSuccess.classList.add('error')   
                }
            
             
                messageSuccess.innerHTML = json.success
                messageSuccess.classList.add('success')   
                
                refreshPost()

            })
        })   
}

const updateData = () => {
    const updateID = document.querySelectorAll('.update')
    updateID.forEach((updateOne) => {
        updateOne.addEventListener('click', () => {
            console.log(`This is my id -> ${updateOne.getAttribute('data-id')}`)
        })
    }) 
}

//Get all Data
getUsers('http://localhost:4000/api/workouts')





form.addEventListener('submit', async (e) => {
    e.preventDefault()
   
    const newWorkout = {
        number: Math.floor(Math.random() * 9999),
        firstname: document.querySelector('#firstname').value,
        lastname: document.querySelector('#lastname').value,
        email: document.querySelector('#email').value,
    }
   
    const response = await fetch('http://localhost:4000/api/workouts', {
        method: 'POST',
        body: JSON.stringify(newWorkout),
        headers: {
            'Content-Type': 'application/json'
        }
    })

    const json = await response.json()

    if(!response.ok){
        message.innerHTML = json.error
        message.classList.add('error')   

        form.reset()
        refresh()
    }

    if(response.ok){
        message.innerHTML = json.success
        message.classList.add('success')  
        form.reset()
        refreshPost() 
    }

   
    
    
    
})






/*document.addEventListener('DOMContentLoaded', () => {
   
})*/


// Loop through each 'actions-group'
/*actionsGroups.forEach((actionsGroup) => {
    // Get all <a> elements within the current 'actions-group'
    const links = actionsGroup.querySelectorAll('#idUpdate')

    // Loop through each <a> element+
    links.forEach((link) =>{
        // Get the value of the 'dataid' attribute
        var dataId = link.getAttribute('dataid');

        // Log or use the 'dataid' value as needed
        console.log(dataId)
    });
});*/





