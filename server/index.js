const bodyParser = require('body-parser'),
    http       = require('http'),
    express    = require('express'),
    socketio   = require('socket.io')

    chat       = require('./Chat')

const port       = port = process.env.PORT || 3000,
    app        = express(),
    Server     = http.createServer(app),
    io         = socketio(Server)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('public'))
app.use('/chat', chat)

Server.listen(port, () => console.log("Server is running on port " + port))

io.on('Connection', function(socket) {
    console.log('new user connected, socket: ' + socket.id)

    socket.on('userJoin', user => {
        socket.user = user
        socket.broadcast.emit('userJoin', user)
    })


    socket.on('message', message => {
        socket.broadcast.emit('message', message)
    })

    socket.on('disconnect', () => {
        if(socket.hasOwnProperty('user')){
            deleteUser(socket.user, err, confirm => {
                if(err) throw err
            })
        }
    })
})