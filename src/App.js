import React from "react"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import Navbar from "./components/layout/Navbar"
import Dashboard from "./components/dashboard/Dashboard"
import PayslipPreview from "./components/payslips/PayslipPreview"
import Signin from "./components/auth/Signin"
import Signup from "./components/auth/Signup"
import CreatePayslip from "./components/payslips/CreatePayslip"
import "./App.scss"

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route path="/payslip/:id" component={PayslipPreview} />
          <Route path="/signin" component={Signin} />

          <Route path="/signup" component={Signup} />
          <Route path="/createpayslip" component={CreatePayslip} />
        </Switch>
      </div>
    </BrowserRouter>
  )
}

export default App
