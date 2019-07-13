import React from "react"
import PayslipList from "../payslips/PayslipsList"
import { connect } from "react-redux"
import { firestoreConnect } from "react-redux-firebase"
import { compose } from "redux"
import { Redirect } from "react-router-dom"
import { Link } from "react-router-dom"
import blueSection from "../../assets/blueSection.svg"

const Dashboard = props => {
  console.log(props)
  if (!props.auth.uid) return <Redirect to="/signin" />
  return (
    <div>
      <div className="blueSection">
        <img src={blueSection} alt="" />
      </div>
      <div>
        <PayslipList payslips={props.payslips} />
        <Link to="createpayslip" className="newButton">
          <button>Generate New Payslip</button>
        </Link>
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  console.log(state)
  return {
    auth: state.firebase.auth,
    payslips: state.firestore.ordered.payslips
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: "payslips" }])
)(Dashboard)
