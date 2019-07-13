import firebase from "firebase/app"
import "firebase/firestore"
import "firebase/auth"

var firebaseConfig = {
  apiKey: "AIzaSyCjNVd5kA-4IMq56nHY3G7Yb3vYFQQjZ38",
  authDomain: "payroll-system-exercise-auth.firebaseapp.com",
  databaseURL: "https://payroll-system-exercise-auth.firebaseio.com",
  projectId: "payroll-system-exercise-auth",
  storageBucket: "payroll-system-exercise-auth.appspot.com",
  messagingSenderId: "274677445623",
  appId: "1:274677445623:web:cf118d1ddf46f2d0"
}
firebase.initializeApp(firebaseConfig)

export default firebase
