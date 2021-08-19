import firebase from "firebase";

var config = {
	apiKey: "AIzaSyDmSHyTlTvf0WdW_22cL4LC7ESM6EydIII",
  	authDomain: "short-it-links.firebaseapp.com",
  	projectId: "short-it-links",
  	storageBucket: "short-it-links.appspot.com",
  	messagingSenderId: "660642584245",
  	appId: "1:660642584245:web:ea207fbcc6c41f72a510fc",
  	measurementId: "G-N3VYJDH0XF"
}

const shortitApp = !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();

var authe = firebase.auth();

var googleProvider = new firebase.auth.GoogleAuthProvider();
var githubProvider = new firebase.auth.GithubAuthProvider();

export { authe, googleProvider, githubProvider }; 