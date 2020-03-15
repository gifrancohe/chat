var bodyParser = require('body-parser'),
    http       = require('http'),
    express    = require('express'),
    socketio   = require('socket.io')

    chat       = require('./Chat')

var port       = port = process.env.PORT || 3000,
    app        = express(),
    Server     = http.createServer(app),
    io         = socketio(Server)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('public'))
app.use('/chat', chat)

Server.listen(port, function(){
    console.log("Server is running on port " + port);
})

io.on('Connection', function(socket) {
    console.log('new user connected, socket: ' + socket.id)

    socket.on('userJoin', function(user){
        socket.user = user
        socket.broadcast.emit('userJoin', user)
    })


    socket.on('message', function(message){
        socket.broadcast.emit('message', message)
    })

    socket.on('disconnect', function(){
        if(socket.hasOwnProperty('user')){
            deleteUser(socket.user, function(err, confirm){
                if(err) throw err
            })
        }
    })
})