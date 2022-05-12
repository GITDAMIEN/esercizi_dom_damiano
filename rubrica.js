
// Variabili
let show = false;
let removed = false;
let searchedContacts;

// Wrapper
let contactsWrapper = document.querySelector('#contactsWrapper');

// Buttons
let showContactsBtn = document.querySelector('#showContactsBtn');
let addContactBtn = document.querySelector('#addContactBtn');
let removeContactBtn = document.querySelector('#removeContactBtn');
let searchContactBtn = document.querySelector('#searchContactBtn');

// Inputs
let nameInput = document.querySelector('#nameInput');
let numberInput = document.querySelector('#numberInput');

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

    removeContact : function(nameToRemove, numberToRemove){

        let filtered, index;

        if(numberToRemove!=''){  //cerca per numero
            filtered = this.contactList.filter((contact)=>contact.contactNumber == numberToRemove)[0];
            index=this.contactList.indexOf(filtered);
        }
        else {  //cerca per nome
            filtered = this.contactList.filter((contact)=>contact.contactName.toLowerCase() == nameToRemove.toLowerCase())[0];
            index=this.contactList.indexOf(filtered);
        }

        if(index>=0){
            this.contactList.splice(index, 1);
            alert('Contatto rimosso correttamente')
            removed=true;
        }
        else
            alert('Contatto non presente in rubrica')
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