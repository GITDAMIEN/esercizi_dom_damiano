
// Variabili
let show = false;
let removed = false;
let searchedContacts;
let removeContactIndex;

// Wrapper
let contactsWrapper = document.querySelector('#contactsWrapper');

// Buttons
let showContactsBtn = document.querySelector('#showContactsBtn');
let addContactBtn = document.querySelector('#addContactBtn');
let removeContactBtn = document.querySelector('#removeContactBtn');
let searchContactBtn = document.querySelector('#searchContactBtn');
let confirmRemovalBtn = document.querySelector('#confirmRemovalBtn');
let cancelBtn = document.querySelector('#cancelBtn');


// Inputs
let nameInput = document.querySelector('#nameInput');
let numberInput = document.querySelector('#numberInput');

//body
let body = document.querySelector('#bodyElement');

//Modal
let exampleModal = document.querySelector('#exampleModal');
let backdropFade = document.querySelector('#backdropFade');

// Rubrica
let contacts = {

    contactList :[
       {contactName : 'Damiano' , contactNumber : 1111111111}, 
       {contactName : 'Matteo' , contactNumber : 2222222222},
       {contactName : 'Filippo' , contactNumber : 3333333333},
       {contactName : 'Dario' , contactNumber : 4444444444},
       {contactName : 'Francesca' , contactNumber : 5555555555},
       {contactName : 'Sofia' , contactNumber : 6666666666},
       {contactName : 'Carlo' , contactNumber : 7777777777},
       {contactName : 'Marco' , contactNumber : 8888888888},
    ],

    showContacts : function(array){
        contactsWrapper.innerHTML='';   //aggiunta da verificare

        array.forEach((contact)=>{
            let div = document.createElement('div')
            div.classList.add('col-12', 'col-md-4', 'my-2')
            div.innerHTML = `
                <div class="cardPersonalized">
                    <p>${contact.contactName}</p>
                    <p>${contact.contactNumber}</p>
                </div>    
            `;    
            contactsWrapper.appendChild(div);
        })    
    },

    addContact : function(newName, newNumber){
        let double=false;
        contacts.contactList.forEach((contact)=>{
            if(contact.contactNumber==newNumber)
                double=true;
        })
        if(!double){
            this.contactList.push({contactName : capitalizeFirstLetter(newName) , contactNumber : newNumber})
            alert('Contatto aggiunto correttamente')
        }else{
            alert('Contatto già presente in rubrica')
        }
    },
    
    searchContact : function(nameToSearch, numberToSearch){
        
        if(numberToSearch!=''){  //cerca per numero
            searchedContacts=this.contactList.filter((contact)=>
            contact.contactNumber==numberToSearch)
            if(searchedContacts.length>0){
                contactsWrapper.innerHTML= '';
                show=false;
                showContactsBtn.innerHTML='Mostra contatti'; 
                contacts.showContacts(searchedContacts);
                alert('Contatto trovato');
            }else{
                alert('Contatto non presente in rubrica')
            }
            
        }else if(nameToSearch!=''){  //cerca per nome
            searchedContacts=this.contactList.filter((contact)=>
            contact.contactName.toLowerCase()==nameToSearch.toLowerCase())
            if(searchedContacts.length>0){
                if(searchedContacts.length>1){
                    alert('Ho trovato i seguenti contatti')
                }
                else{
                    alert('Contatto trovato')
                }
                contactsWrapper.innerHTML= '';
                show=false;
                showContactsBtn.innerHTML='Mostra contatti'; 
                contacts.showContacts(searchedContacts);
                
            }else{
                alert('Contatto non presente in rubrica')
            }
            
        }else{
            alert('Devi inserire un nome o un numero')
        }
        
    },

    removeContact : function(nameToRemove, numberToRemove){

        let filtered;

        if(numberToRemove!=''){  //cerca per numero
            filtered = this.contactList.filter((contact)=>contact.contactNumber == numberToRemove)[0];
            removeContactIndex=this.contactList.indexOf(filtered);
        }
        else {  //cerca per nome
            filtered = this.contactList.filter((contact)=>contact.contactName.toLowerCase() == nameToRemove.toLowerCase())[0];
            removeContactIndex=this.contactList.indexOf(filtered);
        }

        if(removeContactIndex>=0){
            contacts.removeConfirmationModal(removeContactIndex)
            // this.contactList.splice(index, 1);
            // alert('Contatto rimosso correttamente')
            // removed=true;
        }
        else
            alert('Contatto non presente in rubrica')
    },
    
    removeConfirmationModal : function(removeContactIndex){
        body.classList.add('modal-open');
        body.style.overflow='hidden';
        body.style.paddingRight= '0px';
        exampleModal.style.display='block';
        exampleModal.ariaModal="true";
        exampleModal.role='dialog';
        exampleModal.classList.add('show');
        backdropFade.style.display='block';

        cancelBtn.addEventListener('click',()=>{
            exampleModal.style.display = 'none'
            exampleModal.setAttribute('aria-hidden', true)
            exampleModal.removeAttribute('aria-modal')
            exampleModal.removeAttribute('role')
            exampleModal._isTransitioning = false
            exampleModal._backdrop.hide(() => {
                document.body.classList.remove(CLASS_NAME_OPEN)
                exampleModal._resetAdjustments()
                exampleModal._scrollBar.reset()
                EventHandler.trigger(exampleModal, EVENT_HIDDEN)
            })
            backdropFade.classList.remove('show');
            exampleModal.classList.remove('show');
            exampleModal.classList.remove('fade');
            backdropFade.style.display='none';
            body.classList.remove('modal-open');
            body.style.overflow='none';
            body.style.paddingRight= '';

        })

        confirmRemovalBtn.addEventListener('click', ()=>{
            this.contactList.splice(removeContactIndex, 1);
            alert('Contatto rimosso correttamente')
            removed=true;
            body.classList.remove('modal-open');

        })
        
    }
}    

//Event Listeners
showContactsBtn.addEventListener('click', ()=>{
    if(!show){
        contacts.showContacts(contacts.contactList)
        showContactsBtn.innerHTML='Nascondi contatti'
        show=true;
    }else{
        contactsWrapper.innerHTML= '';
        show=false;
        showContactsBtn.innerHTML='Mostra contatti'
    }

})

addContactBtn.addEventListener('click', ()=>{

    if(nameInput.value!=''&&numberInput.value!=''){

        if(!show){
            contacts.addContact(nameInput.value, numberInput.value);
            contacts.showContacts(contacts.contactList)
            showContactsBtn.innerHTML='Nascondi contatti'
            show=true;
        }else{
            contactsWrapper.innerHTML='';
            contacts.addContact(nameInput.value ,numberInput.value);
            contacts.showContacts(contacts.contactList)
        }
        
        nameInput.value ='';
        numberInput.value ='';

    }else if(nameInput.value!=''&&numberInput.value==''){
        alert('Devi inserire anche un numero')
    }else if(nameInput.value==''&&numberInput.value!=''){
        alert('Devi inserire anche un nome')
    }else{
        alert('Devi inserire un nome e un numero')
    }

})


removeContactBtn.addEventListener('click', ()=>{
    if(nameInput.value==''&&numberInput.value==''){
        alert('Devi inserire un nome o un numero')
    }else{

        contacts.removeContact(nameInput.value,numberInput.value)
        
        if(removed){
            if(show)
                contactsWrapper.innerHTML='';
            contacts.showContacts(contacts.contactList)
            showContactsBtn.innerHTML='Nascondi contatti'
            show=true;
            removed=false;
        }
    }

})

searchContactBtn.addEventListener('click', ()=>{
    contacts.searchContact(nameInput.value,numberInput.value);
    nameInput.value='';
    numberInput.value='';

})

//Prima lettera maiuscola
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}