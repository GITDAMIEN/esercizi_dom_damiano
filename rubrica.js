
// Variabili
let shown = false;
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
let removeContactModalCloseBtn = document.querySelector('#removeContactModalCloseBtn');
let chooseContactModalCloseBtn = document.querySelector('#chooseContactModalCloseBtn');
let trashes;

// Inputs
let nameInput = document.querySelector('#nameInput');
let numberInput = document.querySelector('#numberInput');

//body
let body = document.querySelector('#bodyElement');

//removeContactModal
let removeContactModal = document.querySelector('#removeContactModal');
let backdropFade = document.querySelector('#backdropFade');

//chooseContactModal
let chooseContactModal = document.querySelector('#chooseContactModal');
let chooseContactModalFooter = document.querySelector('#chooseContactModalFooter');
let contactsContainerInModal = document.querySelector('#contactsContainerInModal')

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
        contactsWrapper.innerHTML='';

        array.forEach((contact)=>{
            let div = document.createElement('div')
            div.classList.add('col-12', 'col-md-4', 'my-2')
            div.innerHTML = `
                <div class="cardPersonalized">
                    <p>${contact.contactName}</p>
                    <p>${contact.contactNumber}</p>
                    <i class="fa-solid fa-trash matrig"></i>
                </div>    
            `;    
            contactsWrapper.appendChild(div);
        })    
        trashes = document.querySelectorAll('.fa-trash');

        trashes.forEach((trash,i)=>{
            trash.addEventListener('click', ()=>{
                let trashing = contacts.contactList[i].contactNumber;
                contacts.removeContact('',trashing);
            })
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
                shown=false;
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
                shown=false;
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

            if(removeContactIndex>=0){
                // contacts.removeConfirmationModal(removeContactIndex)
                this.contactList.splice(removeContactIndex, 1);
                alert('Contatto rimosso correttamente')
    
                if(shown)
                    contactsWrapper.innerHTML='';
                contacts.showContacts(contacts.contactList)
                showContactsBtn.innerHTML='Nascondi contatti'
                shown=true;
            }
            else
                alert('Contatto non presente in rubrica')

        }
        else {  //cerca per nome
            filtered = this.contactList.filter((contact)=>contact.contactName.toLowerCase() == nameToRemove.toLowerCase());
            // console.log(filtered);

            if(filtered.length>1){ //se trovi più omonimie
                contacts.chooseContactToRemoveModal(filtered)
            }
            else if(filtered.length==1){ //se trovi solo 1 corrispondenza
                // contacts.removeConfirmationModal(//)
                removeContactIndex=this.contactList.indexOf(filtered[0]);

                this.contactList.splice(removeContactIndex, 1);
                alert('Contatto rimosso correttamente')

                if(shown)
                    contactsWrapper.innerHTML='';
                contacts.showContacts(contacts.contactList)
                showContactsBtn.innerHTML='Nascondi contatti'
                shown=true;
            }
            else //se non ne trovi
                alert('Contatto non presente in rubrica')

        }

    },
    
    //metodo per l'apertura del modale che richiede conferma di cancellazione contatto
    //il modale però sballa tutto e interferisce sulla cancellazione dei contatti
    removeConfirmationModal : function(removeContactIndex){
        body.classList.add('modal-open');
        body.style.overflow='hidden';
        body.style.paddingRight= '0px';
        removeContactModal.style.display='block';
        removeContactModal.role='dialog';
        removeContactModal.classList.add('show');
        backdropFade.style.display='block';

        cancelBtn.addEventListener('click',()=>{
            removeContactModal.style.display = 'none'
            removeContactModal.removeAttribute('role')
            removeContactModal.classList.remove('show');
            backdropFade.style.display='none';
            body.style.overflow='none';
            body.style.paddingRight= '';
            body.classList.remove('modal-open');
        })

        removeContactModalCloseBtn.addEventListener('click',()=>{
            removeContactModal.style.display = 'none'
            removeContactModal.removeAttribute('role')
            removeContactModal.classList.remove('show');
            backdropFade.style.display='none';
            body.style.overflow='none';
            body.style.paddingRight= '';
            body.classList.remove('modal-open');
        })

        confirmRemovalBtn.addEventListener('click', ()=>{
            removeContactModal.style.display = 'none'
            removeContactModal.removeAttribute('role')
            removeContactModal.classList.remove('show');
            backdropFade.style.display='none';
            body.style.overflow='none';
            body.style.paddingRight= '';
            body.classList.remove('modal-open');

            // this.contactList.splice(removeContactIndex, 1);
            // alert('Contatto rimosso correttamente')

            // if(shown)
            //     contactsWrapper.innerHTML='';
            // contacts.showContacts(contacts.contactList)
            // showContactsBtn.innerHTML='Nascondi contatti'
            // shown=true;
        })
        
    },

    chooseContactToRemoveModal : function(arrayOfContacts){
        body.classList.add('modal-open');
        body.style.overflow='hidden';
        body.style.paddingRight= '0px';
        chooseContactModal.style.display='block';
        chooseContactModal.role='dialog';
        chooseContactModal.classList.add('show');
        backdropFade.style.display='block';

        let arrayOfButtons = [];
        let dataArray = [];
        contactsContainerInModal.innerHTML='';

        arrayOfContacts.forEach((contact, i)=>{
            let contactButton = document.createElement('button')
            contactButton.setAttribute('id',`contact${i}Btn`)
            contactButton.setAttribute('type',`button`)
            contactButton.classList.add('btn', 'matrixg', 'btn-outline-custom', 'my-2')
            contactButton.innerHTML=`Elimina ${contact.contactName} con numero ${contact.contactNumber}`
            contactsContainerInModal.appendChild(contactButton)

            arrayOfButtons.push(document.querySelector(`#contact${i}Btn`))
            dataArray.push(contact)

            arrayOfButtons[i].addEventListener('click', ()=>{
                let eliminateIndex = contacts.contactList.indexOf(dataArray[i])
                contacts.contactList.splice(eliminateIndex, 1);
                alert('Contatto rimosso correttamente')

                if(shown)
                    contactsWrapper.innerHTML='';
                contacts.showContacts(contacts.contactList)
                showContactsBtn.innerHTML='Nascondi contatti'
                shown=true;

                chooseContactModal.style.display = 'none'
                chooseContactModal.removeAttribute('role')
                chooseContactModal.classList.remove('show');
                backdropFade.style.display='none';
                body.style.overflow='none';
                body.style.paddingRight= '';
                body.classList.remove('modal-open');
            })
        })

        chooseContactModalCloseBtn.addEventListener('click',()=>{
            chooseContactModal.style.display = 'none'
            chooseContactModal.removeAttribute('role')
            chooseContactModal.classList.remove('show');
            backdropFade.style.display='none';
            body.style.overflow='none';
            body.style.paddingRight= '';
            body.classList.remove('modal-open');

            arrayOfButtons = []
            dataArray = [];
        })

    }

}    

//Event Listeners
showContactsBtn.addEventListener('click', ()=>{
    if(!shown){
        contacts.showContacts(contacts.contactList)
        showContactsBtn.innerHTML='Nascondi contatti'
        shown=true;
    }else{
        contactsWrapper.innerHTML= '';
        shown=false;
        showContactsBtn.innerHTML='Mostra contatti'
    }

})

addContactBtn.addEventListener('click', ()=>{

    if(nameInput.value!=''&&numberInput.value!=''){

        if(!shown){
            contacts.addContact(nameInput.value, numberInput.value);
            contacts.showContacts(contacts.contactList)
            showContactsBtn.innerHTML='Nascondi contatti'
            shown=true;
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


// contacts.chooseContactToRemoveModal(contacts.contactList)