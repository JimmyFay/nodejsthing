export default class Discard{
    constructor(card){
        const cards=[];
        this.cards=cards;
        this.cards.push(card)
    }
    add(card){
        this.cards.push(card)
    }
    deal(){
        return this.cards.pop()
    }
    show(){
        this.cards.forEach(element => {
            console.log(element)
        });
    }
    top(){
        return this.cards[this.cards.length-1]
    }
}