import React, { useState } from "react"
import { connect } from "react-redux"
import { signin } from "../store/actions/authActions"
import { Redirect } from "react-router-dom"
import "./auth.scss"
import background from "../../assets/blueBg.svg"
import formBlue from "../../assets/formBlue.svg"
import formOrange from "../../assets/formOrange.svg"
import coinBlue from "../../assets/coinBlue.svg"
import coinOrange from "../../assets/coinOrange.svg"
import plant from "../../assets/Plant.svg"

const Signin = props => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [validError, setValidError] = useState(false)
  const [errorEmailMessage, setErrorEmailMessage] = useState("")
  const [errorPasswordMessage, setErrorPasswordMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const handleEmailChange = e => {
    setEmail(e.target.value)
  }
  const handlePasswordChange = e => {
    setPassword(e.target.value)
  }

  const validateEmail = email => {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(email)
  }

  const handleSubmit = e => {
    e.preventDefault()
    setLoading(true)
    setErrorEmailMessage()
    setErrorPasswordMessage()

    if (validateEmail(email)) {
      console.log("valid")
    } else {
      setValidError(true)
      setErrorEmailMessage("Please enter a valid email address.")
    }

    if (password.length > 6) {
      console.log("valid password")
    } else {
      setErrorPasswordMessage(
        "Please enter please enter at least 6 characters."
      )
    }
    props.signin({ email, password })
  }

  if (props.auth.uid) return <Redirect to="/" />

  return (
    <div>
      <div className="formSection">
        <h1>Pay Slip Generator</h1>
        <span className="subDesc">
          With pay slip generator, it’s easy to calculate your payroll, income
          tax, superannuation and send payslips to your employees.
        </span>

        <form onSubmit={handleSubmit} className="form">
          <div className="inputClass -float">
            <input
              className="field"
              type="text"
              required
              onChange={handleEmailChange}
            />
            <label className="title" htmlFor="email">
              Email
            </label>
          </div>

          <div className="inputClass -float">
            <input
              className="field"
              type="text"
              required
              onChange={handlePasswordChange}
              id="password"
            />
            <label className="title" htmlFor="email">
              Password
            </label>
          </div>

          <div>
            <button>{loading ? "Loading..." : "Sign in"}</button>
          </div>
          <div className="errorMessage">
            {validError ? (
              <div>
                <p> {errorEmailMessage}</p>
                <p> {errorPasswordMessage}</p>
              </div>
            ) : null}

            {props.authError ? <p>{props.authError}</p> : null}
          </div>
        </form>
      </div>
      <div className="graphicBg">
        <img className="blueBg" src={background} alt="" />
        <img className="formBlue" src={formBlue} alt="" />
        <img className="formOrange" src={formOrange} alt="" />
        <img className="coinBlue" src={coinBlue} alt="" />
        <img className="coinOrange" src={coinOrange} alt="" />
        <img className="coinOrangeSecond" src={coinOrange} alt="" />
        <img className="plant" src={plant} alt="" />
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    authError: state.auth.authError,
    auth: state.firebase.auth
  }
}

const mapDispatchToProps = dispatch => {
  return {
    signin: creds => dispatch(signin(creds))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Signin)
