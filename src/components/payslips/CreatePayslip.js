import React, { useState, useEffect } from "react"
import { connect } from "react-redux"
import { createPayslipAction } from "../store/actions/payslipActions"
import { Redirect } from "react-router-dom"
import "./payslips.scss"
import blueSection from "../../assets/blueSection.svg"
import close from "../../assets/round-clear-24px.svg"

const monthNames = [
  "31 January",
  "28 February",
  "31 March",
  "30 April",
  "31 May",
  "30 June",
  "31 July",
  "31 August",
  "30 September",
  "31 October",
  "30 November",
  "31 December"
]
const monthNamesLeap = [
  "31 January",
  "29 February",
  "31 March",
  "30 April",
  "31 May",
  "30 June",
  "31 July",
  "31 August",
  "30 September",
  "31 October",
  "30 November",
  "31 December"
]

const CreatePayslip = props => {
  const [firstname, setFirstname] = useState("")
  const [lastname, setLastname] = useState("")
  const [annualSalary, setAnnualSalary] = useState("")
  const [superRate, setSuperRate] = useState("")
  const [openModal, setOpenModal] = useState(false)

  const [payDate, setPaydate] = useState("")
  const [grossIncome, setGrossIncome] = useState(0)
  const [tax, setTax] = useState(0)
  const [netIncome, setNetIcome] = useState(0)
  const [superFee, setSuperFee] = useState(0)
  const [pay, setPay] = useState(0)

  const [validError, setValidError] = useState(false)
  const [errorMessage, setErrorlMessage] = useState("")

  const handleFirstnameChange = e => {
    setFirstname(e.target.value)
  }
  const handleLastnameChange = e => {
    setLastname(e.target.value)
  }
  const handleAnnualSalaryChange = e => {
    setAnnualSalary(e.target.value)
  }
  const handleSuperRateChange = e => {
    setSuperRate(e.target.value)
  }
  // const handleSubmit = e => {
  //   e.preventDefault()

  // }

  const calculateTax = value => {
    let valueInt = parseInt(value)

    if (0 < valueInt && value <= 18200) {
      valueInt = 0
    } else if ((18200 < valueInt && valueInt < 37000) || valueInt === 37000) {
      valueInt = ((valueInt - 18200) * 0.19) / 12
    } else if ((37001 < valueInt && valueInt < 87000) || valueInt === 87000) {
      valueInt = ((valueInt - 37000) * 0.325 + 3572) / 12
    } else if ((87001 < valueInt && valueInt < 180000) || valueInt === 180000) {
      valueInt = ((valueInt - 87000) * 0.37 + 19822) / 12
    } else if (180001 < valueInt) {
      valueInt = ((valueInt - 18000) * 0.45 + 54232) / 12
    }
    return Math.round(valueInt)
  }

  const validateNumber = number => {
    var re = /^\d*$/
    return re.test(number)
  }

  const valid = e => {
    e.preventDefault()
    if (validateNumber(annualSalary) && validateNumber(superRate)) {
      openConfirmationModal()
    } else {
      setValidError(true)
      setErrorlMessage("Please enter a valid number.")
    }
  }

  const openConfirmationModal = e => {
    //Set Pay Date
    let today = new Date()
    // let dd = String(today.getDate())
    let mm = today.getMonth() + 1
    let yyyy = today.getFullYear()

    if (Number.isInteger(yyyy / 100)) {
      if (Number.isInteger(yyyy / 400)) {
        today = monthNamesLeap[mm] + " " + yyyy
      } else {
        today = monthNames[mm] + " " + yyyy
      }
    } else if (Number.isInteger(yyyy / 4)) {
      today = monthNamesLeap[mm] + " " + yyyy
    } else {
      today = monthNames[mm] + " " + yyyy
    }

    setPaydate(today)

    //Set Gross Income
    setGrossIncome(Math.round(annualSalary / 12))

    //Set Income Tax
    setTax(calculateTax(annualSalary))

    //Set SUper
    setSuperFee(Math.round((annualSalary / 12) * superRate * 0.01))

    setOpenModal(true)
  }

  useEffect(() => {
    //Set Net Income

    setNetIcome(grossIncome - tax)
    //Set Pay
    setPay(netIncome - superFee)
  }, [grossIncome, tax, netIncome, superFee])

  const handleClose = e => {
    setOpenModal(false)
  }

  const handlePay = e => {
    props.createPayslipAction({
      firstname,
      lastname,
      annualSalary,
      superRate,
      payDate,
      grossIncome,
      tax,
      netIncome,
      superFee,
      pay
    })
    props.history.push("/")
  }

  if (!props.auth.uid) return <Redirect to="/signin" />

  return (
    <div>
      {openModal && (
        <div className="confirmationModal">
          <div className="modalBg">
            <img src={close} onClick={handleClose} className="close" alt="" />
            <div className="modalTable">
              <div className="modalTitle">
                <span>
                  Pay Slip for {firstname} {lastname}
                </span>
              </div>

              <div>
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
                        {firstname} {lastname}
                      </td>
                    </tr>
                    <tr>
                      <td>Pay Date</td>
                      <td>{payDate}</td>
                    </tr>
                    <tr>
                      <td>Pay Frequency</td>
                      <td>Monthly</td>
                    </tr>
                    <tr>
                      <td>Annual Income</td>
                      <td>${annualSalary}</td>
                    </tr>
                    <tr>
                      <td>Gross Income</td>
                      <td>${grossIncome}</td>
                    </tr>
                    <tr>
                      <td>Income Tax</td>
                      <td>${tax}</td>
                    </tr>
                    <tr>
                      <td>Net Income</td>
                      <td>${netIncome}</td>
                    </tr>
                    <tr>
                      <td>Super</td>
                      <td>${superFee}</td>
                    </tr>
                    <tr>
                      <td>Pay</td>
                      <td>${pay}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div>
                <button className="modalButton" onClick={handlePay}>
                  Pay
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="blueSection">
        <img src={blueSection} alt="" />
      </div>

      <div className="generate">
        <h1>Generate new Pay Slip for</h1>
        <form onSubmit={valid} className="form generateFrom">
          <div className="inputClass -float">
            <input
              id="firstname"
              className="field"
              type="text"
              onChange={handleFirstnameChange}
              required
            />
            <label className="title" htmlFor="firstname">
              First Name
            </label>
          </div>
          <div className="inputClass -float">
            <input
              id="lastname"
              className="field"
              type="text"
              onChange={handleLastnameChange}
              required
            />
            <label className="title" htmlFor="lastname">
              Last Name
            </label>
          </div>
          <div className="inputClass -float">
            <input
              id="annualSalary"
              className="field"
              type="text"
              onChange={handleAnnualSalaryChange}
              required
            />
            <label className="title" htmlFor="annualSalary">
              Annual Salary
            </label>
          </div>
          <div className="inputClass -float">
            <input
              id="superRate"
              className="field"
              type="text"
              onChange={handleSuperRateChange}
              required
            />
            <label className="title" htmlFor="superRate">
              Superannuation Rate
            </label>
          </div>
          <div>
            <button className="generateButton">Generate</button>
          </div>
          <div className="errorMessage">
            {validError ? (
              <div>
                <p> {errorMessage}</p>
              </div>
            ) : null}
          </div>
        </form>
      </div>
    </div>
  )
}
const mapStateToProps = state => {
  return {
    auth: state.firebase.auth
  }
}

const mapDispatchProps = dispatch => {
  return {
    createPayslipAction: payslip => {
      dispatch(createPayslipAction(payslip))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchProps
)(CreatePayslip)
