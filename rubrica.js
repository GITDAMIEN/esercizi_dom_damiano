
// Variabili
let show = false;

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
        this.contactList.push({contactName : newName , contactNumber : newNumber})
    }
}    


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
        alert('Contatto aggiunto correttamente')
    }else if(nameInput.value!=''&&numberInput.value==''){
        alert('Devi inserire un numero')
    }else if(nameInput.value==''&&numberInput.value!=''){
        alert('Devi inserire un nome')
    }else{
        alert('Devi inserire un nome e un numero')
    }

    nameInput.value ='';
    numberInput.value ='';
})
