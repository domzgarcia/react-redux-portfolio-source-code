
import firebase from 'firebase';

// with Practice of concise method notation
let chatAppFirebase = {
    app: null,
    length() {
        return firebase.apps.length;
    },
    initialize() {
        chatAppFirebase.app = firebase.initializeApp({
            apiKey: 'AIzaSyDFlY0a3c8dACo3t-nVL9g5VI631oFpdx8',
            databaseURL: 'myspace-a310c.firebaseio.com',
            authDomain: 'myspace-a310c.firebaseapp.com',
            messagingSenderId: '581264642196',
            projectId: 'myspace-a310c',
        });
    },
    onChange(callback){
        chatAppFirebase.app.auth().onAuthStateChanged(callback);
    },
    onChildAdded(rid, callback){
        chatAppFirebase.app.database().ref(`/rooms/${rid}/messages`)
        .on('child_added', callback);
    },
    onPopulateRooms(callback){
        chatAppFirebase.app.database().ref(`/rooms`)
        .on('child_added', callback);
    },
    // Promise<any>
    signInWithPopup(){
        const provider = new firebase.auth.GoogleAuthProvider();
        return chatAppFirebase.app.auth().signInWithPopup(provider);
    },
    // Promise<any>
    signOut(){
        return chatAppFirebase.app.auth().signOut();
    },
    detachedAddMessages(rid, callback){
        chatAppFirebase.app.database().ref(`/rooms/${rid}/messages`)
        .off('child_added', callback);
    },
    detachedAddRooms(callback){
        chatAppFirebase.app.database().ref(`/rooms`)
        .off('child_added', callback);
    }
}

export default chatAppFirebase;