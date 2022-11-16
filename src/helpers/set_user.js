module.exports = function(userDataPath){
    var fs = require('fs');


    function set_user(user){
        const userData = JSON.parse(fs.readFileSync(userDataPath, {encoding:'utf8', flag:'r'}));

        userData.users.push(user)
        fs.writeFileSync(userDataPath, JSON.stringify(userData, null, 4),{encoding:'utf8',flag:'w'})
    
    }
    return set_user
}

