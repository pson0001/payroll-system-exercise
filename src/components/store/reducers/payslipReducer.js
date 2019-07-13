const initState = {
  payslips: [
    {
      id: "1",
      name: "John Smith",
      salary: "$1234",
      super: "9%",
      paydate: "30 Jan"
    },
    {
      id: "2",
      name: "John Smith",
      salary: "$1234",
      super: "9%",
      paydate: "30 Jan"
    }
  ]
}

const payslipReducer = (state = initState, action) => {
  switch (action.type) {
    case "CREATE_PAYSLIP":
      return state
    case "CREATE_PAYSLIP_ERROR":
      return state
    default:
      return state
  }
}

export default payslipReducer
