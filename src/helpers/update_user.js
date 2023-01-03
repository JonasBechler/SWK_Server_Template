module.exports = function(userDataPath){
    var fs = require('fs');


    function update_user(user_details){
        
        const userData = JSON.parse(fs.readFileSync(userDataPath, {encoding:'utf8', flag:'r'}));

        userData.users.forEach(user => {
            if (user_details.uuid === user.uuid) {
                Object.keys(user).forEach(key => {
                    user[key] = user_details[key]
                })
            }
        });

        fs.writeFileSync(userDataPath, JSON.stringify(userData, null, 4),{encoding:'utf8',flag:'w'})
    }
    
    return update_user
}

