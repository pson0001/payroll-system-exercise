import authReducer from "./authReducer"
import payslipReducer from "./payslipReducer"
import { combineReducers } from "redux"
import { firestoreReducer } from "redux-firestore"
import { firebaseReducer } from "react-redux-firebase"

const rootReducer = combineReducers({
  auth: authReducer,
  payslip: payslipReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer
})

export default rootReducer
