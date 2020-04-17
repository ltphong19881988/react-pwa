const fs = require('fs');
const path = require('path');

class GameCards {
    constructor() {
        this.decks = [];
        this.countDeal = 0;
    }
    
    LoadFrames(clients, listPlayers){
        // console.log('start LoadFrames');
        return new Promise((resolve) => {
            Promise.all([GameCards.LoadFrames()])
            .then(data => {
                
                this.decks = data[0];
                Promise.all([this.DealCards(),this.DealCards(),this.DealCards()]).then(arr=>{
                    arr.push(data[0]);
                    console.log(arr);
                    var i = 0;
                    for (let [key, value] of Object.entries(clients)) {
                        this[key] = arr[i];
                        listPlayers[key].cards = arr[i];
                        i++;
                    }
                    resolve(listPlayers);
                })
                
            })
        })
        // this.listCards = await Cards.LoadFrames();
        
    }

    DealCards(){
        
        this.countDeal ++;
        console.log('count', this.countDeal);
        return new Promise((resolve) => {
            var arr = [];
            for(var i = 0; i < 13 ; i++){
                arr.push(this.decks.splice(Math.random()*this.decks.length, 1)[0]);
            }
            // console.log('end DealCards', arr);
            this.isDealing = true;
            resolve( arr);
        })
            
        // console.log('start DealCards');
    }


}

module.exports = GameCards;

module.exports.LoadFrames = async function(){
    var cardsJson = JSON.parse(fs.readFileSync(path.join(__dirname, '../public/assets/atlas/cards.json')));
    var arr = [];
    return new Promise((resolve) => {
        Promise.all(cardsJson.frames.map(async (element) => {
            // console.log('a');
            if(element.filename != 'back' && element.filename != 'joker')
                arr.push(element.filename);
        })).then(()=>{
            resolve (arr);
        });
    })
    
    // console.log('het await', arr);
    
}