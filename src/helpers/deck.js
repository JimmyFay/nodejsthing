import Card from "./card"
export default class Deck{
    constructor(cards){
        this.cards=cards;
        if(this.cards===undefined){
            this.cards=[];
            for(let i=1;i<4;i++){
                for(let j=1;j<11;j++){
                    this.cards.push(new Card(i,j))
                    this.cards.push(new Card(i,-j))
                }
            }
            this.cards.push(new Card(0,0))
            this.cards.push(new Card(0,0))
            this.cards = this.cards.sort((a, b) => 0.5 - Math.random());
        }
    }
    deal(){
        return this.cards.pop()
    }
    showDeck(){
        this.cards.forEach(element => {
            console.log(element)
        });
    }
    top(){
        return this.cards[this.cards.length-1]
    }
}