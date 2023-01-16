import React from "react";
import { FaRegWindowClose } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import "./dashboard.css";
const Payment = ({ setOpen, title, price }) => {
  const navigate = useNavigate()
  const handlePayment = async () => {
    navigate("/payments")
  };
  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <div className="modal-title">Choose a Payment method</div>
          <FaRegWindowClose size={30} onClick={() => setOpen(false)} />
        </div>
        <div className="modal-body">
          <p className="payment-info">
            The course({title}) is not free. You are required to pay KSH {price}{" "}
            to access the course. Choose your payment method.
          </p>
          <table className="styled-table">
            <thead>
              <tr>
                <th>Method</th>
                <th>Operational in</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Mpesa</td>
                <td>Kenya</td>
                <td>
                  <button onClick={handlePayment} className="btn">Choose</button>
                </td>
              </tr>
              <tr>
                <td>Paypal</td>
                <td>Globally</td>
                <td>
                  <button className="btn">Not available</button>
                </td>
              </tr>
              <tr>
                <td>Stripe</td>
                <td>Globally</td>
                <td>
                  <button className="btn">Not available</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="modal-footer">
          
          <button onClick={() => setOpen(false)} className="btn">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Payment;
