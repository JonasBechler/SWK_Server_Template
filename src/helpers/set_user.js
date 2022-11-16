var fs = require('fs');

const userDataPath = './data/accounts.json';

function set_user(user){
    const userData = JSON.parse(fs.readFileSync(userDataPath, {encoding:'utf8', flag:'r'}));

    userData.users.push(user)
    fs.writeFileSync(userDataPath, JSON.stringify(userData, null, 4),{encoding:'utf8',flag:'w'})
 
}


module.exports = set_user
