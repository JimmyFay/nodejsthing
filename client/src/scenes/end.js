import io from 'socket.io-client';
export default class End extends Phaser.Scene {
    constructor() {
        super({
            key: 'End'
        });
    }
    init(data){
        this.socket=data.sock
        this.lob=data.lob
        this.username=data.username
        this.users=data.users
        this.winner=data.winner
    }
    preload(){

    }
    create(){
        this.endT=this.add.text(75, 170, ["GAME OVER"]).setFontSize(18).setFontFamily('Trebuchet MS').setColor('#00ffff')
        this.winT=this.add.text(75, 150, ["Winner is: "+this.winner]).setFontSize(18).setFontFamily('Trebuchet MS').setColor('#00ffff')
    
    }
    update(){

    }
}