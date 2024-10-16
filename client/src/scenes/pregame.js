import io from 'socket.io-client';
import Card from "../helpers/card"
import Deck from "../helpers/deck"
import Discard from "../helpers/discard"
export default class Lobby extends Phaser.Scene {
    constructor() {
        super({
            key: 'PreGame'
        });
    }
    init(data){
        this.socket=data.sock
        this.lob=data.lob
        this.username=data.username
    }
    preload() {

    }
    create() {
        let x=0;
        let list=[];
        let gState=[];
        this.testText=this.add.text(75, 350, ['Pre-Game Screen']).setFontSize(18).setFontFamily('Trebuchet MS').setColor('#00ffff')//.setInteractive(); i dont use this
        this.lobText=this.add.text(75, 150, ['Lobby '+this.lob]).setFontSize(18).setFontFamily('Trebuchet MS').setColor('#00ffff')//.setInteractive(); i dont use this
        this.playButton = this.add.text(675, 350, ['Play']).setFontSize(18).setFontFamily('Trebuchet MS').setColor('#00ffff').setOrigin(0.5).setPadding(10).setStyle({ backgroundColor: '#111' }).setInteractive({ useHandCursor: true })
        this.socket.emit('getUsers',this.lob)
        this.socket.on('lobbyUsers',function(users){ //get current lobby memeber
            list=users
            console.log("Recieved current lobby")
            list.forEach(element => {
                //console.log("Socket id is "+this.socket.id+" lists socket id is "+element[0])
                if(element[1]!=this.username || element[0]!=this.socket.id){
                    this.add.text(400,300+x*30,[element[1]]).setFontSize(18).setFontFamily('Trebuchet MS').setColor('#00ffff')
                //console.log(element);
                    x+=1;
                }
                else{
                    this.add.text(400,300+x*30,["You"]).setFontSize(18).setFontFamily('Trebuchet MS').setColor('#00ffff')
                    x+=1;
                }
            });
            x=0;
        }.bind(this))
        this.socket.on('New Member', function(users){//update member list
            list=users
            console.log("Somebody joined")
            list.forEach(element => {
                if(element[1]!=this.username || element[0]!=this.socket.id){
                    this.add.text(400,300+x*30,[element[1]]).setFontSize(18).setFontFamily('Trebuchet MS').setColor('#00ffff')
                //console.log(element);
                    x+=1;
                }
                else{
                    this.add.text(400,300+x*30,["You"]).setFontSize(18).setFontFamily('Trebuchet MS').setColor('#00ffff')
                    x+=1;
                }
            });
            x=0;
        }.bind(this))
        this.socket.on('gameStarted',function(){
            this.playButton.setInteractive(false)
            this.add.text(675, 450, ['Starting game']).setFontSize(18).setFontFamily('Trebuchet MS').setColor('#00ffff')
                    this.time.addEvent({
                        delay: 1000,
                        callback: ()=>{
                            this.scene.start('MGame',{sock:this.socket,lob:parseInt(this.lob),username:this.username,users:list,state:gState})
                        },
                        loop: false
                    })
        }.bind(this))
        this.socket.on('INIT',function(state){
            console.log("Got init")
            console.log(state)
            gState=state;
            console.log(gState)
        }.bind(this))
        this.input.on('pointerdown',(pointer,gameObjects) => { //click handler
            for(const obj of gameObjects){
                obj.setInteractive(false)
                if(obj.text=='Play'){//new lob button
                    this.socket.emit('Play',this.lob)
                    this.add.text(675, 450, ['Starting game']).setFontSize(18).setFontFamily('Trebuchet MS').setColor('#00ffff')
                    this.time.addEvent({
                        delay: 1000,
                        callback: ()=>{
                            this.scene.start('MGame',{sock:this.socket,lob:parseInt(this.lob),username:this.username,users:list,state:gState})
                        },
                        loop: false
                    })
                }
            }
        })
    }
    update() {
        
    }
}