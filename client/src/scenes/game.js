import io from 'socket.io-client';
export default class Lobby extends Phaser.Scene {
    constructor() {
        super({
            key: 'MGame'
        });
    }
    init(data){
        this.socket=data.sock
        this.lob=data.lob
        this.username=data.username
        this.users=data.users
        this.gameState=data.state
    }
    preload() {
        this.w=this.sys.game.canvas.width
        this.h=this.sys.game.canvas.height
    }
    create() {
        console.log(this.users)
        let p=[[this.w/2,this.h/8*7],[this.w/2,this.h/8],[this.w/4,this.h/2],[this.w/4*3,this.h/2],[this.w/16*5,this.h/4*3],[this.w/16*11,this.h/4*3],[this.w/16*5,this.h/4],[this.w/16*11,this.h/4]]
        //              0                     1                   2                     3                     4                       5                       6                     7
        //console.log(p[0][0])
        let y=0
        let ord=[]
        let d=undefined
        let disc=undefined
        let turn=0
        //let spots=[]
        let hands=undefined
        let ownCards=[]
        let otherCards=[]
        let lastClicked=undefined
        let action=true
        let round=1
        let d1=1
        let d2=1
        let win=''
        for(let i=0;i<this.users.length;i++){ //find index of this user in users
            if(this.users[i][0]==this.socket.id){
                break;
            }
            else{
                y++;
            }
        }
        ord.push([this.users[y],y,0])
        for(let i=y+1;i<this.users.length;i++){
            ord.push([this.users[i][1],i,0])
        }
        for(let i=0;i<y;i++){
            ord.push([this.users[i][1],i,0])
        }
        let x=this.users.length
        switch(x){//this will correctly plop all people on the board
            case 2:
                this.add.text(p[1][0],p[1][1], [ord[1][0]]).setFontSize(18).setFontFamily('Trebuchet MS').setColor('#00ffff').setOrigin(0.5, 0.5)//.setInteractive(); i dont use this
                ord[1][2]=1
                break;
            case 3:
                this.add.text(p[6][0],p[6][1], [ord[1][0]]).setFontSize(18).setFontFamily('Trebuchet MS').setColor('#00ffff').setOrigin(0.5, 0.5)//.setInteractive(); i dont use this
                this.add.text(p[7][0],p[7][1], [ord[2][0]]).setFontSize(18).setFontFamily('Trebuchet MS').setColor('#00ffff').setOrigin(0.5, 0.5)//.setInteractive(); i dont use this
                ord[1][2]=6
                ord[2][2]=7
                break;
            case 4:
                this.add.text(p[2][0],p[2][1], [ord[1][0]]).setFontSize(18).setFontFamily('Trebuchet MS').setColor('#00ffff').setOrigin(0.5, 0.5)//.setInteractive(); i dont use this
                this.add.text(p[1][0],p[1][1], [ord[2][0]]).setFontSize(18).setFontFamily('Trebuchet MS').setColor('#00ffff').setOrigin(0.5, 0.5)//.setInteractive(); i dont use this
                this.add.text(p[3][0],p[3][1], [ord[3][0]]).setFontSize(18).setFontFamily('Trebuchet MS').setColor('#00ffff').setOrigin(0.5, 0.5)//.setInteractive(); i dont use this
                ord[1][2]=2
                ord[2][2]=1
                ord[3][2]=3
                break;
            case 5:
                this.add.text(p[4][0],p[4][1], [ord[1][0]]).setFontSize(18).setFontFamily('Trebuchet MS').setColor('#00ffff').setOrigin(0.5, 0.5)//.setInteractive(); i dont use this
                this.add.text(p[6][0],p[6][1], [ord[2][0]]).setFontSize(18).setFontFamily('Trebuchet MS').setColor('#00ffff').setOrigin(0.5, 0.5)//.setInteractive(); i dont use this
                this.add.text(p[7][0],p[7][1], [ord[3][0]]).setFontSize(18).setFontFamily('Trebuchet MS').setColor('#00ffff').setOrigin(0.5, 0.5)//.setInteractive(); i dont use this
                this.add.text(p[5][0],p[5][1], [ord[4][0]]).setFontSize(18).setFontFamily('Trebuchet MS').setColor('#00ffff').setOrigin(0.5, 0.5)//.setInteractive(); i dont use this  
                ord[1][2]=4
                ord[2][2]=6
                ord[3][2]=7
                ord[4][2]=5
                break;
            case 6:
                this.add.text(p[4][0],p[4][1], [ord[1][0]]).setFontSize(18).setFontFamily('Trebuchet MS').setColor('#00ffff').setOrigin(0.5, 0.5)//.setInteractive(); i dont use this
                this.add.text(p[6][0],p[6][1], [ord[2][0]]).setFontSize(18).setFontFamily('Trebuchet MS').setColor('#00ffff').setOrigin(0.5, 0.5)//.setInteractive(); i dont use this
                this.add.text(p[1][0],p[1][1], [ord[3][0]]).setFontSize(18).setFontFamily('Trebuchet MS').setColor('#00ffff').setOrigin(0.5, 0.5)//.setInteractive(); i dont use this
                this.add.text(p[7][0],p[7][1], [ord[4][0]]).setFontSize(18).setFontFamily('Trebuchet MS').setColor('#00ffff').setOrigin(0.5, 0.5)//.setInteractive(); i dont use this  
                this.add.text(p[5][0],p[5][1], [ord[5][0]]).setFontSize(18).setFontFamily('Trebuchet MS').setColor('#00ffff').setOrigin(0.5, 0.5)//.setInteractive(); i dont use this
                ord[1][2]=4
                ord[2][2]=6
                ord[3][2]=1
                ord[4][2]=7
                ord[5][2]=5
                break;
            case 7:
                this.add.text(p[4][0],p[4][1], [ord[1][0]]).setFontSize(18).setFontFamily('Trebuchet MS').setColor('#00ffff').setOrigin(0.5, 0.5)//.setInteractive(); i dont use this
                this.add.text(p[2][0],p[2][1], [ord[2][0]]).setFontSize(18).setFontFamily('Trebuchet MS').setColor('#00ffff').setOrigin(0.5, 0.5)//.setInteractive(); i dont use this
                this.add.text(p[6][0],p[6][1], [ord[3][0]]).setFontSize(18).setFontFamily('Trebuchet MS').setColor('#00ffff').setOrigin(0.5, 0.5)//.setInteractive(); i dont use this
                this.add.text(p[7][0],p[7][1], [ord[4][0]]).setFontSize(18).setFontFamily('Trebuchet MS').setColor('#00ffff').setOrigin(0.5, 0.5)//.setInteractive(); i dont use this  
                this.add.text(p[3][0],p[3][1], [ord[5][0]]).setFontSize(18).setFontFamily('Trebuchet MS').setColor('#00ffff').setOrigin(0.5, 0.5)//.setInteractive(); i dont use this
                this.add.text(p[5][0],p[5][1], [ord[6][0]]).setFontSize(18).setFontFamily('Trebuchet MS').setColor('#00ffff').setOrigin(0.5, 0.5)//.setInteractive(); i dont use this
                ord[1][2]=4
                ord[2][2]=2
                ord[3][2]=6
                ord[4][2]=7
                ord[5][2]=3
                ord[6][2]=5
                break;
            case 8:
                this.add.text(p[4][0],p[4][1], [ord[1][0]]).setFontSize(18).setFontFamily('Trebuchet MS').setColor('#00ffff').setOrigin(0.5, 0.5)//.setInteractive(); i dont use this
                this.add.text(p[2][0],p[2][1], [ord[2][0]]).setFontSize(18).setFontFamily('Trebuchet MS').setColor('#00ffff').setOrigin(0.5, 0.5)//.setInteractive(); i dont use this
                this.add.text(p[6][0],p[6][1], [ord[3][0]]).setFontSize(18).setFontFamily('Trebuchet MS').setColor('#00ffff').setOrigin(0.5, 0.5)//.setInteractive(); i dont use this
                this.add.text(p[1][0],p[1][1], [ord[4][0]]).setFontSize(18).setFontFamily('Trebuchet MS').setColor('#00ffff').setOrigin(0.5, 0.5)//.setInteractive(); i dont use this  
                this.add.text(p[7][0],p[7][1], [ord[5][0]]).setFontSize(18).setFontFamily('Trebuchet MS').setColor('#00ffff').setOrigin(0.5, 0.5)//.setInteractive(); i dont use this
                this.add.text(p[3][0],p[3][1], [ord[6][0]]).setFontSize(18).setFontFamily('Trebuchet MS').setColor('#00ffff').setOrigin(0.5, 0.5)//.setInteractive(); i dont use this
                this.add.text(p[5][0],p[5][1], [ord[7][0]]).setFontSize(18).setFontFamily('Trebuchet MS').setColor('#00ffff').setOrigin(0.5, 0.5)//.setInteractive(); i dont use this  
                ord[1][2]=4
                ord[2][2]=2
                ord[3][2]=6
                ord[4][2]=1
                ord[5][2]=7
                ord[6][2]=3
                ord[7][2]=5
                break;
        }
        this.turnB=this.add.text(900,600,["Next"]).setFontSize(18).setFontFamily('Trebuchet MS').setColor('#00ffff').setInteractive().setPadding(10).setStyle({ backgroundColor: '#003030' })
        this.tText=this.add.text(75, 170, [this.users[0][1]+"\'s turn"]).setFontSize(18).setFontFamily('Trebuchet MS').setColor('#00ffff')
        this.totalT=this.add.text(p[0][0]+50, p[0][1]-30, ["Total: "]).setFontSize(18).setFontFamily('Trebuchet MS').setColor('#00ffff')
        this.scoreT=this.add.text(p[0][0]+50, p[0][1]-5, ["Score: "]).setFontSize(18).setFontFamily('Trebuchet MS').setColor('#00ffff')
        this.titleT=this.add.text(p[0][0]+50, p[0][1]+20, ["Title: "]).setFontSize(18).setFontFamily('Trebuchet MS').setColor('#00ffff')
        this.diceT=this.add.text(this.w/2,this.h/2-70,["Dice are: "]).setFontSize(18).setFontFamily('Trebuchet MS').setColor('#00ffff')
        this.roundT=this.add.text(75, 190, ["Round: "]).setFontSize(18).setFontFamily('Trebuchet MS').setColor('#00ffff')
        //calcs the user hand
        var calcHand=function(arr){
            let vals=[]
            let abs=[]
            let total=0
            let score=0
            let title=''
            arr.forEach(element =>{
                vals.push(element[1])
                abs.push(Math.abs(element[1]))
                total+=element[1]
            })
            vals.sort((a,b)=>a-b)
            abs.sort((a,b)=>a-b)
            if(total==0){ //player has some form of sabbac check for named solutions
                if(abs[0]==0){//any combo w zero
                    if(abs.length==2){
                        //pure
                        score=14
                        title='Pure Sabacc'
                    }
                    else if(abs.length==5){//any 5 card combo w 0
                        if(abs[1]==10){
                            //ful sabacc
                            score=13
                            title='Full Sabacc'
                        }
                        else if(abs.filter(function(item){return item==abs[1]}).length==4){
                            //fleet
                            score=12
                            title='Fleet'
                        }
                        else if(abs.filter(function(item){return item==abs[1]}).length==2){
                            //the council
                            score=11
                            title='The Council'
                        }
                    }
                    else if(abs.length==3){
                        //happy landing
                        score=10
                        title="Happy Landing"
                    }
                    else{
                        //the chosen one
                        score=9
                        title='The Chosen One'
                    }
                }
                else{// no zero card
                    if((abs[0]==abs[2] && abs[3]==abs[4] && abs.length==5) || (abs[0]==abs[1] && abs[2]==abs[4] && abs.length==5)){
                        //rhylet
                        score=8
                        title='Rhylet'
                    }
                    else if(abs[0]==abs[3] && abs.length==4){
                        //squadron
                        score=7
                        title='Squadron'
                    }
                    else if(abs[0]==1 && abs[1]==2 && abs[2]==3 && abs[3]==4 && abs[4]==10){
                        //its a trap
                        score=6
                        title='It\'s a Trap!'
                    }
                    else if(abs[3]-abs[0]==3){
                        //straight khyron
                        score=5
                        title='Straight Khyron'
                    }
                    else{
                        let x=undefined
                        let t=1 //current in a row count
                        let c=1 //highest in a row count
                        let y=1 //num of distinct elements
                        abs.forEach(element =>{
                            if(x!=undefined){//not first run thru
                                if(x==element){
                                    t++
                                }
                                else{
                                    if(c<t){//new high count
                                        c=t
                                    }
                                    //reset temp count
                                    t=1
                                    y++
                                }
                            }
                            x=element //move laat element
                        }) 
                        if(c==3){
                            //banthas wild
                            score=4
                            title='Bantha\'s Wild'
                        }
                        else if(c==2){
                            if(y!=abs.length-1){
                                //rule of two
                                score=3
                                title='Rule of Two'
                            }
                            else{
                                //thats your sister
                                score=2
                                title='That\'s Your Sister'
                            }
                        }
                        else{
                            //sabacc
                            score=1
                            title='Sabacc'
                        }
                    }
                }
            }
            else{//no sabacc
                //nuhlrek
                score=0
                title='Nuhlrek'
            }
            return [total,score,title]
        }.bind(this);
        //show hand to self
        var drawCards=function(){
            var results=[]
            if(ownCards.length>0){
                ownCards.forEach(element =>{
                    element.destroy()
                })
                ownCards=[]
            }
            let x=0
            hands[y].forEach(element => {
                console.log("Hand")
                console.log(element)
                var w=this.add.text(p[0][0]-20*(hands[y].length-1)+45*x-5,p[0][1]-65,[element[0]+','+element[1]]).setFontSize(18).setFontFamily('Trebuchet MS').setColor('#00ffff').setInteractive().setFixedSize(40,60).setStyle({ backgroundColor: '#003030' }).setOrigin(0.5, 0.5)
                ownCards.push(w)
                x++;
            });
            results=calcHand(hands[y])
            this.totalT.setText('Total: '+results[0])
            this.scoreT.setText('Score: '+results[1])
            this.titleT.setText('Title: '+results[2])

        }.bind(this);
        //show everyone elses cards
        var drawOthers = function(){
            if(otherCards.length>0){
                otherCards.forEach(element =>{
                    element.destroy()
                })
                otherCards=[]
            }
            for(let i=ord.length-1;i>0;i--){//stop before zero bc you are zero, this will be adjusted on everyone elses init
                x=0;
                hands[ord[i][1]].forEach(element => {
                    var w=this.add.rectangle(p[ord[i][2]][0]-20*(hands[ord[i][1]].length-1)+45*x-5,p[ord[i][2]][1]-65,40,60,0x003030).setOrigin(0.5, 0.5)
                    otherCards.push(w)
                    x++;
                })
            }
        }.bind(this);
        var calcWin=function(){
            var i=0
            var hi=0
            var temp=0
            var results=[]
            var hiScore=0
            results=calcHand(hands[i])
            hiScore=results[1]
            temp=results[1]
            for(i=1;i<this.users.length;i++){
                results=calcHand(hands[i])
                temp=results[1]
                if(temp>hiScore){
                    hiScore=temp
                    hi=i
                }
            }
            win=this.users[hi][1]
            console.log(this.win)
        }.bind(this)
        if(y==0){ //init everyone
            //init deck
            d=[]    
            for(let i=1;i<4;i++){
                for(let j=1;j<11;j++){
                    d.push([i,j])
                    d.push([i,-j])}}
            d.push([0,0])
            d.push([0,0])
            d=d.sort((a, b) => 0.5 - Math.random());
            //init discard
            disc=[]
            disc.push(d.pop())
            //init everyones hand for them
            hands=[]
            console.log("Users")
            console.log(this.users)
            for(let i=0;i<this.users.length;i++){
                console.log("pushing")
                let e=[d.pop(),d.pop()]
                //console.log(e)
                hands.push(e)
            }
            console.log("Hands")
            console.log(hands)
            //display
            this.deckVal=this.add.text(this.w/2+25,this.h/2,["Deck"]).setFontSize(18).setFontFamily('Trebuchet MS').setColor('#00ffff').setOrigin(0.5, 0.5).setFixedSize(40,60).setStyle({ backgroundColor: '#003030' }).setInteractive()
            this.discVal=this.add.text(this.w/2-25,this.h/2,[disc[disc.length-1][0]+','+disc[disc.length-1][1]]).setFontSize(18).setFontFamily('Trebuchet MS').setColor('#00ffff').setOrigin(0.5, 0.5).setFixedSize(40,60).setStyle({ backgroundColor: '#003030' }).setInteractive()
            this.turnB.setStyle({ backgroundColor: '#006060' })
            this.tText.setText("Your turn")
            this.diceT.setText("Dice: "+d1+','+d2)
            this.roundT.setText("Round: "+round)
            drawCards()
            drawOthers()
            this.gameState=[this.lob,d,disc,turn,hands,d1,d2,round]
            this.socket.emit('init',this.gameState)
            action=false
        }
        else{ //being initted
            if(this.gameState.length>0){//already caught init in pregame
                console.log("early init")
                //console.log(this.gameState)
                d=this.gameState[1]
                //d.forEach(element => {console.log(element)});
                disc=this.gameState[2]
                turn=this.gameState[3]
                hands=this.gameState[4]
                d1=this.gameState[5]
                d2=this.gameState[6]
                round=this.gameState[7]
                //display
                this.deckVal=this.add.text(this.w/2+25,this.h/2,["Deck"]).setFontSize(18).setFontFamily('Trebuchet MS').setColor('#00ffff').setOrigin(0.5, 0.5).setFixedSize(40,60).setStyle({ backgroundColor: '#003030' }).setInteractive()
                this.discVal=this.add.text(this.w/2-25,this.h/2,[disc[disc.length-1][0]+','+disc[disc.length-1][1]]).setFontSize(18).setFontFamily('Trebuchet MS').setColor('#00ffff').setOrigin(0.5, 0.5).setFixedSize(40,60).setStyle({ backgroundColor: '#003030' }).setInteractive()
                drawCards()
                drawOthers()
                this.diceT.setText("Dice: "+d1+','+d2)
                this.roundT.setText("Round: "+round)
            }
        }
        this.lobText=this.add.text(75, 150, ['Game Screen']).setFontSize(18).setFontFamily('Trebuchet MS').setColor('#00ffff')//.setInteractive(); i dont use this
        this.add.circle(p[0][0],p[0][1],30,0x003030)
        this.add.text(p[0][0],p[0][1], ['You']).setFontSize(18).setFontFamily('Trebuchet MS').setColor('#00ffff').setOrigin(0.5, 0.5)//.setInteractive(); i dont use this
        //sockets
        this.socket.on('INIT',function(newState){
            console.log("Got init")
            if(y!=0){
                d=newState[1]
                disc=newState[2]
                turn=newState[3]
                hands=newState[4]
                d1=newState[5]
                d2=newState[6]
                round=newState[7]
                //display
                this.deckVal=this.add.text(this.w/2+25,this.h/2,["Deck"]).setFontSize(18).setFontFamily('Trebuchet MS').setColor('#00ffff').setOrigin(0.5, 0.5).setFixedSize(40,60).setStyle({ backgroundColor: '#003030' }).setInteractive()
                this.discVal=this.add.text(this.w/2-25,this.h/2,[disc[disc.length-1][0]+','+disc[disc.length-1][1]]).setFontSize(18).setFontFamily('Trebuchet MS').setColor('#00ffff').setOrigin(0.5, 0.5).setFixedSize(40,60).setStyle({ backgroundColor: '#003030' }).setInteractive()
                drawCards()
                drawOthers()
                this.diceT.setText("Dice: "+d1+','+d2)
                this.roundT.setText("Round: "+round)
            }
        }.bind(this))
        this.socket.on('NEXT',function(newState){
            d=newState[1]
            disc=newState[2]
            turn=newState[3]
            hands=newState[4]
            d1=newState[5]
            d2=newState[6]
            round=newState[7]
            //display
            this.discVal.setText(disc[disc.length-1][0]+','+disc[disc.length-1][1])
            drawCards()
            drawOthers()
            if(turn==y){
                action=false
                this.turnB.setStyle({ backgroundColor: '#006060' })
            }
            this.diceT.setText("Dice: "+d1+','+d2)
            this.roundT.setText("Round: "+round)
            if(turn!=y){
                this.tText.setText(this.users[turn][1]+"\'s turn")
            }
            else{
                this.tText.setText("YOUR turn")
            }
            
        }.bind(this))
        this.socket.on('GAMEOVER',function(newState){
            calcWin()
            this.scene.start('End',{sock:this.socket,lob:parseInt(this.lob),username:this.username,users:this.users,winner:win})
        }.bind(this))
        //click handler
        this.input.on('pointerdown',(pointer,gameObjects) => { //click handler
            if(gameObjects.length<1){
                if(lastClicked!=undefined){
                    console.log(lastClicked)
                    lastClicked.setStyle({ backgroundColor: '#003030' })
                    lastClicked=undefined
                }
            }
            var swap = function(c){
                console.log("Swap")
                hands[y]=hands[y].filter(function(item){return JSON.stringify(item)!==JSON.stringify(c)})
                hands[y].push(d.pop())
                drawCards()
                //now put old card into the discard
                disc.push(c)
                this.discVal.setText(disc[disc.length-1][0]+','+disc[disc.length-1][1])
            }.bind(this);
            var snipe=function(c){
                console.log("Snipe")
                hands[y]=hands[y].filter(function(item){return JSON.stringify(item)!==JSON.stringify(c)})
                hands[y].push(disc.pop())
                drawCards()
                //now put old card into the discard
                disc.push(c)
                this.discVal.setText(disc[disc.length-1][0]+','+disc[disc.length-1][1])
            }.bind(this);
            for(const obj of gameObjects){
                if(!action){//user not made a move yet
                    if(obj==this.deckVal){ //deck clicked
                        this.deckVal.setStyle({ backgroundColor: '#006060' })
                        if(lastClicked==this.deckVal){ //Gain
                            action=true
                            hands[y].push(d.pop())
                            drawCards()
                            console.log("Gain")
                            this.deckVal.setStyle({ backgroundColor: '#003030' })
                            lastClicked=undefined
                            action=true
                        }
                        else{//check if it was reversed swap
                            if(lastClicked!=undefined){
                                lastClicked.setStyle({ backgroundColor: '#003030' })
                                if(lastClicked!=this.discVal){//reversed swap
                                    let l=lastClicked.text.split(',')
                                    let s=l[0];
                                    let v=l[1];
                                    let c=[parseInt(s),parseInt(v)]
                                    swap(c)
                                    this.deckVal.setStyle({ backgroundColor: '#003030' })
                                    lastClicked=undefined
                                    action=true
                                }
                                else{ //last was discard
                                    lastClicked=this.deckVal
                                }
                            }
                            else{  //last click was nothing
                                lastClicked=this.deckVal
                            }
                        }
                        console.log("deck clicked")
                    }
                    else if(obj==this.discVal){ //discard clicked
                        if(lastClicked==this.discVal){ //last was disc
                            this.discVal.setStyle({ backgroundColor: '#003030' })
                            lastClicked=undefined
                        }
                        else{ //last was not disc
                            this.discVal.setStyle({ backgroundColor: '#006060' })
                            console.log("discard clicked")
                            if(lastClicked!=undefined){ //last was not nothing
                                lastClicked.setStyle({ backgroundColor: '#003030' })
                                if(lastClicked!=this.deckVal){ //last was a card, do snipe
                                    let l=lastClicked.text.split(',')
                                    let s=l[0];
                                    let v=l[1];
                                    let c=[parseInt(s),parseInt(v)]
                                    snipe(c)
                                    this.discVal.setStyle({ backgroundColor: '#003030' })
                                    lastClicked=undefined
                                    action=true
                                }
                                else{ //last was deck
                                    lastClicked=this.discVal
                                }
                            } 
                            else{ // last was nothing
                                lastClicked=this.discVal
                            }
                        }
                    }
                    else{//a card clicked
                        obj.setStyle({ backgroundColor: '#006060' })
                        let l=obj.text.split(',')
                        let s=l[0];
                        let v=l[1];
                        let c=[parseInt(s),parseInt(v)]
                        //Swap                   
                        if(lastClicked==this.deckVal){
                            swap(c)
                            this.deckVal.setStyle({ backgroundColor: '#003030' })
                            lastClicked=undefined
                            action=true
                        }
                        //Snipe
                        else if(lastClicked==this.discVal){
                            snipe(c)
                            this.discVal.setStyle({ backgroundColor: '#003030' })
                            lastClicked=undefined
                            action=true
                        }
                        else{
                            if(lastClicked!=undefined){lastClicked.setStyle({ backgroundColor: '#003030' })}
                            if(lastClicked==obj){lastClicked=undefined}
                            else{lastClicked=obj}
                        }
                        console.log("card clicked: "+obj.text)
                    }
                } 
                //for other clicky stuff like turn button etc
                if(obj==this.turnB && y==turn){
                    console.log("Next")
                    if(lastClicked!=undefined){
                        lastClicked.setStyle({ backgroundColor: '#003030' })
                    }
                    this.turnB.setStyle({ backgroundColor: '#003030' })
                    lastClicked=undefined
                    //update turn and send turn to next player
                    if(y==this.users.length-1){//reset turn to zero
                        turn=0
                        if(this.users.length==1){//solo game, no dice
                            action=false
                        }
                        else{
                            //do dice here and inc round
                            if(round!=5){//not end
                                round++
                                d1=Math.floor(Math.random() * 6) + 1
                                d2=Math.floor(Math.random() * 6) + 1
                                if(d1==d2){//dice are same all cards back
                                    for(let i=0;i<this.users.length;i++){//go thru all users
                                        let q=hands[i].length
                                        console.log("reset")
                                        for(let j=0;j<q;j++){//go thru all cards in users hand
                                            disc.push(hands[i].pop())
                                        }               
                                        for(let j=0;j<q;j++){
                                            hands[i].push(d.pop())
                                        }
                                    } 
                                }
                            }
                            else{//game over
                                this.socket.emit("GAMEOVER",this.gameState)
                                calcWin()
                                this.scene.start('End',{sock:this.socket,lob:parseInt(this.lob),username:this.username,users:this.users,winner:this.win})
                        
                            } 
                        }
                    }
                    else{//just inc turn then send, then update all
                        turn++
                    }
                    console.log(this.gameState)
                    this.gameState=[this.lob,d,disc,turn,hands,d1,d2,round]
                    this.socket.emit("nextTurn",this.gameState)
                    this.tText.setText(this.users[turn][1]+"\'s turn")
                }
            }
        })
    }  
    update() {

    }
}