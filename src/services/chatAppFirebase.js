
import firebase from 'firebase';

// with Practice of concise method notation
const chatAppFirebase = {
    
    length() {
        return firebase.apps.length;
    },
    initialize() {
        firebase.initializeApp({
            apiKey: 'AIzaSyDFlY0a3c8dACo3t-nVL9g5VI631oFpdx8',
            databaseURL: 'myspace-a310c.firebaseio.com',
            authDomain: 'myspace-a310c.firebaseapp.com',
            messagingSenderId: '581264642196',
            projectId: 'myspace-a310c',
        });
    },
    onChange(callback){
        return firebase.auth().onAuthStateChanged(callback);
    },
    signInWithPopup(){
        const provider = new firebase.auth.GoogleAuthProvider();
        return firebase.auth().signInWithPopup(provider);
    },
    signOut(){
        return firebase.auth().signOut();
    }
}

export default chatAppFirebase;