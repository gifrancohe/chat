var fs      = require('fs'),
    path    = require('path')

module.exports = {

    saveData: function(datatype, newData, data) {
        var dataPath = datatype == 'users' ? __dirname + path.join('data/users.json'):
                    __dirname + path.join('data/messages.json')
        data.current.push(newData)
        return new Promise(function(resolver, reject) {
            fs.writeFile(dataPath, JSON.stringify(data), function(err){
                if(err) reject(err)
                resolver("OK")
            })
        })
    },
    getData: function(dataType) {
        var dataPath = dataType == 'users' ? 
                        __dirname + path.join('/data/users.json') :
                        __dirname + path.join('/data/messages.json')
        return new Promise(function(resolve, reject){
            fs.readFile(dataPath, 'utf8', function(err, readData) {
                if(err) reject(err)
                resolve(JSON.parse(readData))
            })
        })
    }
}