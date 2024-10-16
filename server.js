const server = require('express')();
const http = require('http').createServer(server);
const io = require('socket.io')(http,{
    cors: {
        origin: '*',
    }
});
let players=[]
let lobbies=[]
let startedLobs=[]
let currentLob=1
io.on('connection', function (socket) {
    console.log('A user connected: ' + socket.id);
    var name=''
    socket.on('disconnect', function () {
        console.log('A user disconnected: ' + socket.id);
        x=players.filter(function(item){return item[0]==socket.id})
        //console.log(x)
        if(x.length>0 && x[0][2]!=0){//player is in a lobby but left (UPDATE FOR BETTER LATER)
            y=lobbies.filter(function(item){return item[0]==x[0][2]}) //if lobby already started y will be empty
            //console.log(y)
            if(y.length>0){
                if(y[0][1].length==1){ // only one in lobby just remove it
                    lobbies=lobbies.filter(function(item){return item==y})
                }
                else{ // just remove player from lobby
                    y[0][1]=y[0][1].filter(function(item){return item[0]!=socket.id})
                    //update lobby here, same thing as new player
                }
            } 
        }
        players=players.filter(function(item){return item[0]!=socket.id})
        players.forEach((row)=>{
            message=''
            row.forEach((element)=>{
                message=message+" "+element;
            });
            console.log(message);
        });

    });
    socket.on('name', function (username){
        console.log('username entered')
        name=username
        var message=''
        players.push([socket.id,username,0])
        players.forEach((row)=>{
            message=''
            row.forEach((element)=>{
                message=message+" "+element;
            });
            console.log(message);
        });
    })
    socket.on('lobby',function (){ //sends out all (open) lobbies or makes new if none
        console.log("Lobby Screen")
        if(lobbies.length==0){
            io.emit('new',currentLob)
            x=players.filter(function(item){return item[0]==socket.id})
            x[0][2]=currentLob
            lobbies.push([currentLob,[[socket.id,x[0][1]]]])
            socket.join(currentLob)
            console.log(io.sockets.adapter.rooms)
            currentLob+=1
            //console.log(x[0][1])
        }
        else{
            io.emit('lobs',lobbies)
        }
    })
    socket.on('selected',function (lob){ //adds socket to existing channel and to the complicated array
        console.log(lob)
        x=lobbies.filter(function(item){return item[0]==lob})
        y=players.filter(function(item){return item[0]==socket.id})
        y[0][2]=lob
        //console.log(x)//big array
        //console.log(x[0]) //array with lob num
        //console.log(x[0][1]) //players in lob array
        x[0][1].push([socket.id,name])
        socket.join(lob)
        console.log(io.sockets.adapter.rooms)
        io.to(lob).emit("New Member",x[0][1])
    })
    socket.on('New',function(){
        io.emit("Created",currentLob)
        x=players.filter(function(item){return item[0]==socket.id})
        x[0][2]=currentLob
        lobbies.push([currentLob,[[socket.id,x[0][1]]]])
        socket.join(currentLob)
        currentLob+=1
    })
    socket.on('getUsers',function(lob){
        x=lobbies.filter(function(item){return item[0]==lob}) //should return the lobby user is in
        //console.log(x[0][1])
        io.to(lob).emit('lobbyUsers',x[0][1])
    })
    socket.on('Play',function(lob){
        io.to(lob).emit('gameStarted')
        x=lobbies.filter(function(item){return item[0]==lob}) //should return the lobby user is in
        startedLobs.push(x)
        lobbies=lobbies.filter(function(item){return item[0]!=lob}) //updates lobbies to show only non started ones
    })
    socket.on('init',function(gameState){
        io.to(gameState[0]).emit('INIT',gameState)
    })
    socket.on('nextTurn',function(gameState){
        io.to(gameState[0]).emit('NEXT',gameState)
    })
    socket.on('GAMEOVER',function(gameState){
        io.to(gameState[0]).emit('GAMEOVER',gameState)
    })
});

http.listen(3000, function() {
    console.log('Server started!');
});