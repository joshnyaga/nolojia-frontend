import React from 'react'
import "./payments.css"
const Successful = () => {
  return (
    <div>
      <div className="mainbox">
        <div className="error">Request sent to Phone Number</div>
        <div className="guide">Thank you</div>
        <a href='/payments' className="btn big">Back</a>
      </div>
    </div>
  )
}

export default Successful