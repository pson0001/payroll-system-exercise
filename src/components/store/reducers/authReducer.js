const initState = {
  authError: null
}

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case "LOGIN_ERROR":
      return { ...state, authError: "Your username or password is incorrect." }
    case "LOGIN_SUCCESS":
      console.log("Login success")
      return { ...state, authError: null }
    case "SIGNOUT_SUCCESS":
      console.log("signout success")
      return state

    case "SIGNUP_SUCCWSS":
      console.log("sign up success")
      return {
        ...state,
        authError: null
      }
    case "SIGNUP_SUCCESS":
      console.log("sign up success")
      return {
        ...state,
        authError: null
      }

    case "SIGNUP_ERROR":
      console.log("sign up error")
      return {
        ...state,
        authError: action.err.message
      }
    default:
      return state
  }
}

export default authReducer
