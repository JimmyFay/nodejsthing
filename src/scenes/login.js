import io from 'socket.io-client';
export default class Login extends Phaser.Scene {
    constructor() {
        super({
            key: 'Login'
        });
    }
    
    preload() {
        this.load.html("form","form.html")
    }

    create() {
        let self = this;
        this.socket = io('http://localhost:3000');
        
        this.socket.on('connect', function () {
            console.log('Connected!');
        });
        
        this.nameInput = this.add.dom(640, 360).createFromCache("form");

        this.dealText = this.add.text(75, 350, ['Enter username:']).setFontSize(18).setFontFamily('Trebuchet MS').setColor('#00ffff')//.setInteractive(); i dont use this
        
        this.returnKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

        this.returnKey.on("down", event => {
            let name = this.nameInput.getChildByName("name");
            if(name.value != "") {
                this.dealText.setText("Hello, " + name.value);
                //name.value = ""; this resets the namespace to empty
                this.socket.emit('name',name.value)
                //delayed=this.time.delayedCall(30000,this.scene.start('Lobby'),[],this);
                this.time.addEvent({
                    delay: 500,
                    callback: ()=>{
                        this.scene.start('Lobby',{sock:this.socket,username:name.value})
                    },
                    loop: false
                })
            }
        });
    }
    
    update() {
    
    }
}