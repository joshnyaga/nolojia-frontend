import React,{useState, useEffect} from 'react'
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./payments.css"
const MyPayments = () => {
    const currentUser = useSelector((state) => state.currentUser);
    const navigate = useNavigate()
    const [amount, setAmount] = useState();
    const [number, setNumber] = useState();
    const [payments, setPayments] = useState([])
    let count =1
    useEffect(()=>{
        const fetchPaymentDetails = async()=>{
            const res = await axios.get(`api/nolojia/v1/payments/${currentUser._id}`, {withCredentials:true})
            setPayments(res.data)
        }
        fetchPaymentDetails()
    },[])
    const payNow = async()=>{
        var url = " https://tinypesa.com/api/v1/express/initialize";
        try {
            await axios.post(url,`amount=${amount}&msisdn=${number}&account_no=024000042019`,{headers: {
                Apikey: "F1QUdPBDBP6",
                "Content-Type": "application/x-www-form-urlencoded",
            },} )
            const success = () => toast("Check your Phone");
                    success()
            navigate("/successful")
            // add the detail to database
            await axios.post("api/nolojia/v1/payments",
            {
                studentId: currentUser._id,
                studentName: currentUser.name,
                amountPayed:amount,
                phoneNumber: number,
                date: new Date()
            },{withCredentials:true}
            )
        } catch (error) {
            toast.error("An error occurred")
        }
    // fetch(url, {
    //     body: `amount=${amountToPay}&msisdn=0796143149&account_no=1281607312`,
    //     headers: {
    //         Apikey: "R94FFx0TGqw",
    //         "Content-Type": "application/x-www-form-urlencoded",
    //     },
    //     method: "POST",
    // });
      }
  return (
    <div>
        <section className="payment-section">
            <div className="panel-contents">
                <input className='p-input' onChange={(e)=>setNumber(e.target.value)} type="number" placeholder='Phone Number to Pay' />
                <input className='p-input' onChange={(e)=>setAmount(e.target.value)} type="number" placeholder='Amount you want to pay' />
                <button type='button' onClick={payNow} className='btn'>Pay</button>
            
            </div>
            <div className="panel-contents">
                <h4 className='title'>Raise Funds</h4>
                <p>Share the following link to raise funds</p>
                <span>nolojia.com/helpfund/{currentUser._id}</span>
            </div>
            <table className="styled-table">
            <thead>
              <tr>
                <th>No</th>
                <th>Phone Number</th>
                <th>Amount</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
            {payments.map((payment) => (
                <tr key={payment._id}>
                    <td>{count++}</td>
                  <td>{payment.phoneNumber}</td>
                  <td>{payment.amountPayed}</td>
                  <td>{payment.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
        <ToastContainer/>
    </div>
  )
}

export default MyPayments