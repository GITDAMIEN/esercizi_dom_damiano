let newGameBtn = document.querySelector('#newGameBtn')
let resultsBtn = document.querySelector('#resultsBtn')
let playersWrapper = document.querySelector('#playersWrapper')

let bowling = {

    players : [

        {playerName : 'Rocky', scores : [], finalScore: 0, image : 'https://i.dailymail.co.uk/i/pix/2016/07/28/15/36AB9FA500000578-0-image-a-5_1469716574018.jpg'},
        {playerName : 'Ciccio', scores : [], finalScore: 0, image : 'https://media.istockphoto.com/photos/half-lenght-portrait-of-the-happy-shirtless-old-man-senior-showing-picture-id1203073335?k=20&m=1203073335&s=612x612&w=0&h=SyQGBH9Ksrk7ilC88qSTyv7uxISyqkOndFcD0r3rgpY='},
        {playerName : 'Amilcare', scores : [], finalScore: 0, image : 'https://piximus.net/media2/52919/strong-old-men-10.jpg'},
        {playerName : 'Bepi', scores : [], finalScore: 0, image : 'https://laprovinciadibiella.it/wp-content/uploads/2016/11/Vecchietto-terribile-spia-la-vicina-con-il-binocolo-583173be36e501.jpg'}
    ],

    showPlayers : function(arrayOfPlayers){
        
        playersWrapper.innerHTML = ''

        arrayOfPlayers.forEach((player)=>{
            let card = document.createElement('div')
            card.classList.add('col-12', 'col-md-3')
            card.innerHTML= `
                <div class="card colored custom-card winnerCard">
                    <img class="imm" src=${player.image} alt="Old man ${player.playerName}">
                    <h2>${player.playerName}</h2>
                    <p>Punteggio: <span>0</span></p>
                    <p id="winnerP" class="text-bold"></p>
                </div>
            `
            playersWrapper.appendChild(card)
        })
    },

    setScores : function(){
        this.players.forEach(player=>{
            for(let i=0;i<10;i++)
                player.scores.push(Math.floor(Math.random()*11))
        })
    },

    setFinalScore : function(){
        this.players.forEach(player=>{
            player.finalScore = player.scores.reduce((acc, n) => acc+n)
        })

        let spans = document.querySelectorAll('span')

        spans.forEach((el,i) => {

            let counter = 0;
            let interval = setInterval(() => {
                
                if(counter<this.players[i].finalScore){
                    counter++
                    el.innerHTML = `${counter}`
                }
                else{
                    clearInterval(interval)
                }

            }, 25);

        })

        this.players.forEach(player=>{
            player.scores = []
        })
    },

    setWinner : function(){
        this.players.sort((a,b)=> b.finalScore - a.finalScore)
        this.showPlayers(this.players)
        let spans = document.querySelectorAll('span')

        spans.forEach((el,i)=>{
            el.innerHTML = `${this.players[i].finalScore}`
        })

        let winnerP = document.querySelector('#winnerP')
        let winnerCard = document.querySelector('.winnerCard')
        winnerP.innerHTML = 'Vincitore!!'
        winnerCard.classList.add('scaleW')
    }
}


bowling.showPlayers(bowling.players)


newGameBtn.addEventListener('click', ()=> { 
    bowling.showPlayers(bowling.players)
    bowling.setScores()
    bowling.setFinalScore()
    console.log(bowling.players);
})

resultsBtn.addEventListener('click', ()=> {
    bowling.setWinner()
    // bowling.showPlayers(bowling.players)
})

