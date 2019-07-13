import React, { useState } from "react"
import { Redirect } from "react-router-dom"
import { connect } from "react-redux"
import { signup } from "../store/actions/authActions"
import "./auth.scss"
import background from "../../assets/blueBg.svg"
import formBlue from "../../assets/formBlue.svg"
import formOrange from "../../assets/formOrange.svg"
import coinBlue from "../../assets/coinBlue.svg"
import coinOrange from "../../assets/coinOrange.svg"
import plant from "../../assets/Plant.svg"

const Signup = props => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [validError, setValidError] = useState(false)
  const [errorEmailMessage, setErrorEmailMessage] = useState("")
  const [errorPasswordMessage, setErrorPasswordMessage] = useState("")
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
    setErrorEmailMessage()
    setErrorPasswordMessage()
    console.log(password, password.length)
    if (validateEmail(email)) {
      console.log("valid")
    } else {
      setValidError(true)
      setErrorEmailMessage("Please enter a valid email address")
    }

    if (password.length > 6) {
      console.log("valid password")
    } else {
      setErrorPasswordMessage("Please enter please enter at least 6 characters")
    }
    props.signup({ email, password })
  }

  if (props.auth.uid) return <Redirect to="/" />

  return (
    <div>
      <div className="formSection">
        <h1>Sign Up</h1>
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
            <button>Sign up</button>
          </div>
          <div className="errorMessage">
            {validError ? (
              <div>
                <p> {errorEmailMessage}</p>
                <p> {errorPasswordMessage}</p>
              </div>
            ) : null}
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
    auth: state.firebase.auth
  }
}

const mapDispatchToProps = dispatch => {
  return {
    signup: newUser => dispatch(signup(newUser))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Signup)
