export const signin = credential => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase()
    firebase
      .auth()
      .signInWithEmailAndPassword(credential.email, credential.password)
      .then(() => {
        dispatch({ type: "LOGIN_SUCCESS" })
      })
      .catch(err => {
        dispatch({ type: "LOGIN_ERROR", err })
      })
  }
}

export const signout = () => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase()
    firebase
      .auth()
      .signOut()
      .then(() => {
        dispatch({ type: "SIGNOUT_SUCCESS" })
      })
  }
}

export const signup = newUser => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase()
    const firestore = getFirestore()
    firebase
      .auth()
      .createUserWithEmailAndPassword(newUser.email, newUser.password)
      .then(res => {
        return firestore
          .collection("users")
          .doc(res.user.uid)
          .set({
            initials: newUser.email[0]
          })
      })
      .then(() => {
        dispatch({ type: "SIGNUP_SUCCESS" })
      })
      .catch(err => {
        dispatch({ type: "SIGNUP_ERROR", err })
      })
  }
}
