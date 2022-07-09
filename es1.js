/*
- Lavoriamo sul DOM. Creare 3 paragrafi in HTML e 3 bottoni. Il primo bottone dovra’ nascondere i 3 paragrafi e farli ricomparire, il secondo bottone dovra’ cambiare i colori dei paragrafi in maniera casuale ed il terzo bottone dovra’ renderli in grassetto e farli tornare come prima.
- Provate a manipolare il DOM dei template che avete realizzato
*/

let showHideBtn = document.querySelector("#showHideBtn");
let paragraphColorBtn = document.querySelector("#paragraphColorBtn");
let boldToggleBtn = document.querySelector("#boldToggleBtn");
let wrapper = document.querySelector("#wrapper");

let open = false;

wrapper.innerHTML = `
    <div class="col-12">
    <p>Paragrafo</p>
    </div>
    <div class="col-12">
    <p>Paragrafo</p>
    </div>
    <div class="col-12">
    <p>Paragrafo</p>
    </div>
    `;

let p = document.querySelectorAll("p");

showHideBtn.addEventListener('click', ()=> {

    if(open){
        open=false;
        wrapper.innerHTML = `
            <div class="col-12">
                <p>Paragrafo</p>
            </div>
            <div class="col-12">
                <p>Paragrafo</p>
            </div>
            <div class="col-12">
                <p>Paragrafo</p>
            </div>
        `;
        p=document.querySelectorAll("p")
    }else{
        open=true;
        wrapper.innerHTML = "";
    }

})

paragraphColorBtn.addEventListener('click', ()=> {

    p.forEach((element)=> element.style.color = `rgb(${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)}`);
})

boldToggleBtn.addEventListener('click', ()=> {

    p.forEach((element)=> element.classList.toggle('bold'));
})