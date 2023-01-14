import React from 'react'
import "./payments.css"
const ErrorPayments = () => {
  return (
    <div>
      <div className="mainbox">
        <div className="error">An error occured processing your payment</div>
        <div className="guide">For more details contact us - +254717084877</div>
        <button className="btn big">Home</button>
      </div>
    </div>
  )
}

export default ErrorPayments