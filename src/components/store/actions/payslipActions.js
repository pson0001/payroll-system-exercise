export const createPayslipAction = payslip => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    console.log(payslip)
    const firestore = getFirestore()
    firestore
      .collection("payslips")
      .add({
        ...payslip,
        firstname: payslip.firstname,
        lastname: payslip.lastname,
        annualSalary: payslip.annualSalary,
        superRate: payslip.superRate,
        payDate: payslip.payDate,
        grossIncome: payslip.grossIncome,
        tax: payslip.tax,
        netIncome: payslip.netIncome,
        superFee: payslip.superFee,
        pay: payslip.pay
      })
      .then(() => {
        dispatch({ type: "CREATE_PAYSLIP", payslip })
      })
      .catch(err => {
        dispatch({ type: "CREATE_PAYSLIP_ERROR", err })
      })
  }
}
