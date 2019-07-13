import React from "react"
import { Link } from "react-router-dom"

const PayslipList = ({ payslips }) => {
  return (
    <div className="dashboardTable">
      <div>Pay Slip History</div>
      <table>
        <thead>
          <tr>
            <th>Employee</th>
            <th>Annual Salary</th>
            <th>Super Rate</th>
            <th>Actions</th>
          </tr>
        </thead>
        {payslips &&
          payslips.map(payslip => {
            return (
              <tbody key={payslip.id}>
                <tr>
                  <td>
                    {payslip.firstname} {payslip.lastname}
                  </td>
                  <td>${payslip.annualSalary}</td>
                  <td>{payslip.superRate}%</td>
                  <td>
                    <Link to={"/payslip/" + payslip.id}>
                      <span key={payslip.id} className="viewButton">
                        View
                      </span>
                    </Link>
                  </td>
                </tr>
              </tbody>
            )
          })}
      </table>
    </div>
  )
}
export default PayslipList
