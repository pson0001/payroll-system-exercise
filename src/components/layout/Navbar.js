import React from "react"
import { Link } from "react-router-dom"
import SigninLink from "./SigninLink"
import SignoutLink from "./SignoutLink"
import { connect } from "react-redux"
import "./Navbar.scss"
import logo from "../../assets/MYOBLogo.png"

const Navbar = props => {
  const links = props.auth.uid ? <SigninLink /> : <SignoutLink />

  return (
    <nav>
      <div className="navLayout">
        <div>
          <Link to="/">
            <img src={logo} alt="MYOB LOGO" height="30" />
          </Link>
        </div>
        <div className="links">{links}</div>
      </div>
    </nav>
  )
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth
  }
}

export default connect(mapStateToProps)(Navbar)
