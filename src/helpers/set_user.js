module.exports = function(userDataPath){
    var fs = require('fs');
    var { v4: uuidv4 } = require('uuid');


    function set_user(user){
        const userData = JSON.parse(fs.readFileSync(userDataPath, {encoding:'utf8', flag:'r'}));
        console.log(user);
        let new_uuid = uuidv4();
        user["account_id"] = new_uuid
        userData.users.push(user)
        fs.writeFileSync(userDataPath, JSON.stringify(userData, null, 4),{encoding:'utf8',flag:'w'})
    }
    
    return set_user
}

