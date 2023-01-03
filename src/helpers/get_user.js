module.exports = function(userDataPath){
    var fs = require('fs');

    const blank_user = details => {
        
		let user = Object.assign({}, details);
		Object.keys(user).forEach(key => {
			user[key] = ""
		});
        return user
    }

    function getUserByEmail(email) {

        const userData = JSON.parse(fs.readFileSync(userDataPath, {encoding:'utf8', flag:'r'}));
        var selected_user = null;
        
        userData.users.forEach(user => {
            if (email === user.email) {
                selected_user = user;
            }
        });

        if (selected_user === null){
            return {details: userData.details, blank_user: blank_user(userData.details)}
        }
        else{
            return {details: userData.details, user: selected_user}
        }
    }

    function getUserByFusionAuthIntrospect(introspectResponse) {

        const userData = JSON.parse(fs.readFileSync(userDataPath, {encoding:'utf8', flag:'r'}));
        var selected_user = null;
        
        userData.users.forEach(user => {
            if (introspectResponse.sub === user.fusionauth_id) {
                selected_user = user;
            }
        });

        if (selected_user === null){
            const fusionauth_user = blank_user(userData.details);
            fusionauth_user.fusionauth_id = introspectResponse.sub
            fusionauth_user.email = introspectResponse.email

            return {details: userData.details, fusionauth_user: fusionauth_user }
        }
        else{
            return {details: userData.details, user: selected_user }
        }

    }

    function getUserByUUID(uuid) {

        const userData = JSON.parse(fs.readFileSync(userDataPath, {encoding:'utf8', flag:'r'}));
        var selected_user = null;
        
        userData.users.forEach(user => {
            if (uuid === user.uuid) {
                selected_user = user;
            }
        });

        return {details: userData.details, user: selected_user }

    }

    function getDetails() {
        const userData = JSON.parse(fs.readFileSync(userDataPath, {encoding:'utf8', flag:'r'}));

        return {details: userData.details, blank_user: blank_user(userData.details)}
    }


    return {
        by_mail: getUserByEmail, 
        by_fusionauthIntrospect: getUserByFusionAuthIntrospect, 
        by_uuid: getUserByUUID,
        details: getDetails,
    }
}
