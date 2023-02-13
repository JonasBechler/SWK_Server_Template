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

    function create_fusionAuth_data(introspectResponse){
        const iat_date = new Date(introspectResponse.iat*1000)
        const exp_date = new Date(introspectResponse.exp*1000)

        const data = {
            "details": {
                "email": "E-Mail",
                "email_verified": "E-Mail verifiziert",
                "knlogin_id": "FusionAuth-ID",
                "iat_date":"Erstellungszeit",
                "exp_date":"Ablaufzeit",								
                
            },
            "user": {
                "email": ""+introspectResponse.email,
                "email_verified": introspectResponse.email_verified?"verifiziert":"nicht verifiziert",
                "knlogin_id": ""+introspectResponse.sub,
                "iat_date":""+(iat_date.getHours()+1)+":"+iat_date.getMinutes()+":"+iat_date.getSeconds(),
                "exp_date":""+(exp_date.getHours()+1)+":"+exp_date.getMinutes()+":"+exp_date.getSeconds(),		
            }
        }
        return data;
    }

    function getUserByFusionAuthIntrospect(introspectResponse) {

        const userData = JSON.parse(fs.readFileSync(userDataPath, {encoding:'utf8', flag:'r'}));
        var selected_user = null;
        
        userData.users.forEach(user => {
            if (introspectResponse.sub === user.knlogin_id) {
                selected_user = user;
            }
        });

        if (selected_user === null){
            const fusionauth_user = blank_user(userData.details);
            fusionauth_user.knlogin_id = introspectResponse.sub
            fusionauth_user.email = introspectResponse.email

            return {details: userData.details, fusionauth_user: fusionauth_user }
        }
        else{
            return {details: userData.details, user: selected_user, fusionAuth_data: create_fusionAuth_data(introspectResponse)}
        }

    }

    function getUserByAccount_id(account_id) {

        const userData = JSON.parse(fs.readFileSync(userDataPath, {encoding:'utf8', flag:'r'}));
        var selected_user = null;
        
        userData.users.forEach(user => {
            if (account_id === user.account_id) {
                selected_user = user;
            }
        });

        return {details: userData.details, user: selected_user}

    }

    function getDetails() {
        const userData = JSON.parse(fs.readFileSync(userDataPath, {encoding:'utf8', flag:'r'}));

        return {details: userData.details, blank_user: blank_user(userData.details)}
    }


    return {
        by_mail: getUserByEmail, 
        by_fusionauthIntrospect: getUserByFusionAuthIntrospect, 
        by_account_id: getUserByAccount_id,
        details: getDetails,
    }
}
