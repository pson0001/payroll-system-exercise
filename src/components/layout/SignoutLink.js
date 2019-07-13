import React from "react"
import { Link } from "react-router-dom"

const SignoutLink = () => {
  return (
    <nav>
      <div>
        <Link to="/signup" className="navLink">
          Sign up
        </Link>
      </div>
    </nav>
  )
}

export default SignoutLink
