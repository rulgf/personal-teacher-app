import * as firebase from 'firebase';

class Auth {
    static async getCurrentUser(){
        var user = firebase.auth().currentUser;
        //var name, email, photoUrl, uid;
        var email;

        var current = {};

        if (user != null) {
            email = user.email;
            //photoUrl = user.photoURL;

            var  userId = email.split('.').join('%2E');
            let userPath = "/user/" + userId;
            var ref = firebase.database().ref(userPath);
             await ref.once("value").then((snapshot) => {
                current = snapshot.val();
            });
            return current;
        }else{
            return({error: 'No se pudo recuperar la información del usuario actual'});
        }
    }
}

module.exports = Auth;