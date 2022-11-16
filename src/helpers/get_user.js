var fs = require('fs');

const userDataPath = './data/accounts.json';

function getUserByEmail(email) {

    const userData = JSON.parse(fs.readFileSync(userDataPath, {encoding:'utf8', flag:'r'}));
    var selected_user = null;
    
    userData.users.forEach(user => {
        if (email === user.email) {
            selected_user = user;
        }
    });

    return {details: userData.details, user: selected_user }
}

function getDetails() {
    const userData = JSON.parse(fs.readFileSync(userDataPath, {encoding:'utf8', flag:'r'}));

    return {details: userData.details }
}


module.exports.by_mail = getUserByEmail
module.exports.details = getDetails
