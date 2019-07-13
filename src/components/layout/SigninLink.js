import React from "react"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import { signout } from "../store/actions/authActions"

const SigninLink = props => {
  return (
    <nav>
      <div>
        <a onClick={props.signout} className="signout">
          Sign out
        </a>
      </div>
    </nav>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    signout: () => dispatch(signout())
  }
}

export default connect(
  null,
  mapDispatchToProps
)(SigninLink)
