import React from "react"
import { connect } from "react-redux"
import { firestoreConnect } from "react-redux-firebase"
import { compose } from "redux"
import { Redirect } from "react-router-dom"
import { Link } from "react-router-dom"
import blueSection from "../../assets/blueSection.svg"

const PayslipPreview = props => {
  if (!props.auth.uid) return <Redirect to="/signin" />

  if (props.payslip) {
    return (
      <div>
        <div className="blueSection">
          <img src={blueSection} alt="" />
        </div>
        <div className="preview">
          <div>
            PaySlip Preview for {props.payslip.firstname}{" "}
            {props.payslip.lastname}
          </div>
          <table>
            <thead>
              <tr>
                <th>Item</th>
                <th>Employ Details</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Employee</td>
                <td>
                  {props.payslip.firstname} {props.payslip.lastname}
                </td>
              </tr>
              <tr>
                <td>Pay Date</td>
                <td> {props.payslip.payDate}</td>
              </tr>
              <tr>
                <td>Pay Frequency</td>
                <td>Monthly</td>
              </tr>
              <tr>
                <td>Annual Income</td>
                <td>${props.payslip.annualSalary}</td>
              </tr>
              <tr>
                <td>Gross Income</td>
                <td>${props.payslip.grossIncome}</td>
              </tr>
              <tr>
                <td>Income Tax</td>
                <td>${props.payslip.tax}</td>
              </tr>
              <tr>
                <td>Net Income</td>
                <td>${props.payslip.netIncome}</td>
              </tr>
              <tr>
                <td>Super</td>
                <td>${props.payslip.superFee}</td>
              </tr>
              <tr>
                <td>Pay</td>
                <td>${props.payslip.pay}</td>
              </tr>
            </tbody>
          </table>
          <Link to="/" className="backButton">
            <button>Back to dashboard</button>
          </Link>
        </div>
      </div>
    )
  } else {
    return <div>Loading</div>
  }
}

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id
  const payslips = state.firestore.data.payslips

  const payslip = payslips ? payslips[id] : null
  return {
    payslip: payslip,
    auth: state.firebase.auth
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    {
      collection: "payslips"
    }
  ])
)(PayslipPreview)
