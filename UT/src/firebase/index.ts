import { AngularFireModule, AuthMethods } from 'angularfire2';


const firebaseConfig = {
  apiKey: 'AIzaSyAW6R-x1CJcjaN3imnR4hP9wSoXmP71OkU',
  authDomain: 'angular-ut.firebaseapp.com',
  databaseURL: 'https://angular-ut.firebaseio.com',
  storageBucket: 'angular-ut.appspot.com'
};

const firebaseAuthConfig = {
  method: AuthMethods.Popup,
  remember: 'default'
};


export const FirebaseModule = AngularFireModule.initializeApp(firebaseConfig, firebaseAuthConfig);
