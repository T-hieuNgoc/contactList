

const $ = document.querySelector.bind(document)

const addBtn = $('#submitBtn')
const cancelBtn = $('#cancelBtn')
const resetBtn = $('#resetBtn')
const deleteBtn = $('#deleteBtn')
const recordContainer = $('.recordContainer')

const name = $('#name')
const address = $('#address')
const number = $('#number')


let contactArray =[]
let id = 0

// obj constructor for contact
function Contact(id, name, address, number){
    this.id = id
    this.name = name
    this.address = address
    this.number = number
}

// display valiable record
document.addEventListener('DOMContentLoaded', function(){
    if(localStorage.getItem('contacts') ==null){
        contactArray=[]
    }else{
        contactArray = JSON.parse(localStorage.getItem('contacts'))
    }
    displayRecord()
})

// display function
function displayRecord(){
    contactArray.forEach(singleContact =>{
        addToList(singleContact)
    })
}

// addding contact record
addBtn.onclick = ()=>{
    if(checkInputFields([name, address, number ])){
        setMessage('success','record added successly!')
        id++
        const contact = new Contact(id, name.value, address.value, number.value)
        contactArray.push(contact)
        addToList(contact)
        clearInputValue()
        
        //localSStorage
        localStorage.setItem('contacts', JSON.stringify(contactArray))
    }else{
        setMessage('error','empty input fields or invalid input!')
    }
}

//clearInputValue
cancelBtn.onclick =()=>{
    clearInputValue()
}
function clearInputValue(){
    name.value = ''
    address.value = ''
    number.value = ''
}


// adding to list (on the DOM)
{
    function addToList(item){
        const newRecordDiv = document.createElement('div')
        newRecordDiv.classList.add('recordItem')
        newRecordDiv.innerHTML=`
        <div class="record-el">
            <span id="labelling">contact ID:</span>
            <span id="contact-id-content">${item.id}</span>
        </div>

        <div class="record-el">
            <span id="labelling">name:</span>
            <span id="name-content">${item.name}</span>
        </div>

        <div class="record-el">
            <span id="labelling">address:</span>
            <span id="address-content">${item.address}</span>
        </div>

        <div class="record-el">
            <span id="labelling">contact number:</span>
            <span id="contactNum-content">${item.number}</span>
        </div>

        <button id="deleteBtn">
            <span>
                <i class='bx bxs-trash'></i>
            </span>delete
        </button>
        `
        recordContainer.appendChild(newRecordDiv)
    }
}

// displaying status/alerts
function setMessage(status, Message){
    let messageBox = document.querySelector('.message')
    if(status == 'error'){
        messageBox.innerHTML = `${Message}`
        messageBox.classList.add('error')
        removeMessage(status, messageBox)
    }

    if(status == 'success'){
        messageBox.innerHTML = `${Message}`
        messageBox.classList.add('success')
        removeMessage(status, messageBox)
    }
}

// removing status/alert
function removeMessage(status, messageBox){
    setTimeout(function(){
        messageBox.classList.remove(`${status}`)
    }, 1000)
}

// input field validation
function checkInputFields(inputArr){
    for(var i = 0; i < inputArr.length; i++){
        if(inputArr[i].value ===''){
            return false
        }
    }
    if(!phoneNumCheck(inputArr[2].value)){
        return false
    }
    return true
}

 
// phone number validation function
function phoneNumCheck(inputTxt){
    let phoneNo = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if(inputTxt.match(phoneNo)){
        return true
    }else{
        return false
    }
}

// delete record
recordContainer.onclick = (e)=>{
   if(e.target.id =='deleteBtn'){
       const recordItem = e.target.parentElement
       recordContainer.removeChild(recordItem)
       let tempContactList = contactArray.filter(function(record){
            // return (record.id != parseInt(recordItem.firstElementChild))
           return (record.id != parseInt(recordItem.firstElementChild.lastElementChild.innerText));
       })
      contactArray = tempContactList
       localStorage.setItem('contacts', JSON.stringify(contactArray))
   }
}

// reset anything
resetBtn.onclick = ()=>{
    contactArray = []
    localStorage.setItem('contacts', JSON.stringify(contactArray))
    location.reload()
}
