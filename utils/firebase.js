import firebase from "firebase";

var config = {
	apiKey: `${process.env.NEXT_PUBLIC_FIREAPIKEY}`,
  	authDomain: `${process.env.NEXT_PUBLIC_FIREAUTHDOMAIN}`,
  	projectId: `${process.env.NEXT_PUBLIC_FIREPROJECTID}`,
  	storageBucket: `${process.env.NEXT_PUBLIC_FIRESTORAGEBUCKET}`,
  	messagingSenderId: `${process.env.NEXT_PUBLIC_FIREMESSAGINGSENDERID}`,
  	appId: `${process.env.NEXT_PUBLIC_FIREAPPID}`,
  	measurementId: `${process.env.NEXT_PUBLIC_MEASUREMENTID}`
}

const shortitApp = !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();

var authe = firebase.auth();

var googleProvider = new firebase.auth.GoogleAuthProvider();
var githubProvider = new firebase.auth.GithubAuthProvider();

export { authe, googleProvider, githubProvider }; 