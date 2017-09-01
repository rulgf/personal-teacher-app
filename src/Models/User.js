import * as firebase from 'firebase';

class User {

    /**
     * Inicializar usuario
     * @param userId
     * @param name
     * @param lastnames
     * @param birthday
     * @param address
     * @param longitude
     * @param latitude
     * @returns {firebase.Promise<any>|!firebase.Promise.<void>}
     */
    static setUserInfo(userId, name, lastnames, birthday, address, longitude, latitude) {

        userId = userId.split('.').join('%2E');
        let userPath = "/user/" + userId;

        return firebase.database().ref(userPath).set({
            name: name,
            lastnames: lastnames,
            birthday: birthday,
            address: address,
            longitude: longitude,
            latitude: latitude,
            user: true,
            email: userId,
            active: true
        })

    }

    /**
     * Inicializar usuario por Facebook
     * @param userId
     * @param name
     * @param lastnames
     * @param birthday
     * @param fbId
     * @returns {firebase.Promise<any>|!firebase.Promise.<void>}
     */
    static setUserFbInfo(userId, name, lastnames, birthday, fbId) {
        userId = userId.split('.').join('%2E');
        let userPath = "/user/" + userId;
        var ref = firebase.database().ref('user/'+userId);
        ref.once("value").then((snapshot) => {
            var verified = snapshot.child("verified").val();
            if(verified === null){
                verified = false;
            }
            firebase.database().ref(userPath).set({
                name: name,
                lastnames: lastnames,
                birthday: birthday,
                fbId: fbId,
                verified: verified
            })
        });

    }

    /**
    * Chacar los permisos del usuario
    * @param userID
    * @param permission
    * @returns true / false
    */
    static async checkPermissions(userId,permission){

        userId = encodeURIComponent(userId).split('.').join('%2E');
        let userPath = "/user/" + userId;
        var ref = firebase.database().ref(userPath);
        var access = false;

        try{
            var ref = firebase.database().ref(userPath);
            await ref.once("value").then((snapshot) => {
                access = snapshot.child(permission).val();
            });

            return access;
        }catch(error){
            console.log(error)
        }
    }

    /**
     * Confirmar información facebook
     * @param userId
     * @param name
     * @param lastnames
     * @param birthday
     * @param fbId
     * @returns {firebase.Promise<any>|!firebase.Promise.<void>}
     */
    static confirmUserFbInfo(userId, name, lastnames, birthday, fbId) {

        userId = userId.split('.').join('%2E');
        let userPath = "/user/" + userId;

        return firebase.database().ref(userPath).set({
            name: name,
            lastnames: lastnames,
            birthday: birthday,
            fbId: fbId,
            email: userId,
            verified: true
        })

    }

    /**
     * Obtener la información de un usuario
     * @return JSObject of the user
     */
    static async getUserInfo(userId){
        userId = userId.split('.').join('%2E');
        try{
            var userInfo = {};
            var ref = firebase.database().ref('user');
            await ref.once("value").then((snapshot) => {
                userInfo = snapshot.child(userId).val();
            });

            return userInfo;
        }catch(error){
            console.log(error);
        }
    }

}

module.exports = User;