import io from 'socket.io-client';

export default class Lobby extends Phaser.Scene {
    constructor() {
        super({
            key: 'Lobby'
        });
    }
    init(data){
        this.socket=data.sock
        this.username=data.username
    }
    preload() {
        
    }
    create() {
        this.testText=this.add.text(75, 350, ['Lobby Screen']).setFontSize(18).setFontFamily('Trebuchet MS').setColor('#00ffff')//.setInteractive(); i dont use this
        this.socket.emit('lobby')
        this.next = this.add.text(675, 350, ['New Lobby']).setFontSize(18).setFontFamily('Trebuchet MS').setColor('#00ffff').setOrigin(0.5).setPadding(10).setStyle({ backgroundColor: '#111' }).setInteractive({ useHandCursor: true })
        this.socket.on('lobs', function(lobbies){//print off all lobbies
            var x=0;
            lobbies.forEach(element => {
                this.add.text(400,300+x*30,['Lobby '+element[0]+': '+element[1].length+' Online']).setFontSize(18).setFontFamily('Trebuchet MS').setColor('#00ffff').setInteractive()
                console.log(element);
                x+=1;
            });
        }.bind(this))
        this.socket.on('new',function(lobby){//no open lobbies
            this.testText.setText("No open lobbies...making new lobby.")
            this.next.setVisible(false)
            this.lob=lobby
            console.log("new")
            this.time.addEvent({
                delay: 1500,
                callback: ()=>{
                    this.scene.start('PreGame',{sock:this.socket,lob:this.lob,username:this.username})
                },
                loop: false
            })
        }.bind(this))
        this.socket.on('Created',function(lobby){
            this.testText.setText("Creating new lobby.")
            this.next.setVisible(false)
            this.lob=lobby
            console.log("new")
            this.time.addEvent({
                delay: 1500,
                callback: ()=>{
                    this.scene.start('PreGame',{sock:this.socket,lob:this.lob,username:this.username})
                },
                loop: false
            })
        }.bind(this))
        this.input.on('pointerdown',(pointer,gameObjects) => { //click handler
            for(const obj of gameObjects){
                obj.setInteractive(false)
                if(obj.text=='New Lobby'){//new lob button
                    console.log("Button!")
                    this.socket.emit('New')
                }
                else{ //lobby click
                    let l=obj.text.split(' ')
                    let lob=l[1].slice(0,-1)
                    //console.log(l[1].slice(0,-1))
                    this.socket.emit('selected',parseInt(lob))
                    this.add.text(75, 450, ['Joining lobby: '+lob]).setFontSize(18).setFontFamily('Trebuchet MS').setColor('#00ffff')//.setInteractive(); i dont use this
                    this.time.addEvent({
                        delay: 1000,
                        callback: ()=>{
                            this.scene.start('PreGame',{sock:this.socket,lob:parseInt(lob),username:this.username})
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