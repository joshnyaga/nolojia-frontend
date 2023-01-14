import React,{useState, useEffect} from 'react'
import "./other.css"
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
const HelpFund = () => {
    const navigate = useNavigate()
    const id = useLocation().pathname.split("/")[2];
    const [amount, setAmount] = useState();
    const [number, setNumber] = useState();
    const [user, setUser] = useState({})
   
   useEffect(()=>{
    if(!id){
        navigate("/invalidpath")
    }
    const fetchUser = async()=>{
        const res = await axios.get(`/api/nolojia/v1/users/${id}`, {withCredentials:true})
        setUser(res.data)
    }
    fetchUser()
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
          
            // add the detail to database
            await axios.post("/api/nolojia/v1/payments",
            {
                studentId: id,
                studentName: user.name,
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
    <>
        <main>
            <div className="wrapper-fund">
                <div className="jumbotron">
                    <h2 className='text-center'>Nolojia</h2>
                    <p className='padded-p'>Help raise fund for {user.name}</p>
                </div>
                <div className="panel-contents centered">
                <input className='p-input' onChange={(e)=>setNumber(e.target.value)} type="number" placeholder='Phone Number to Pay' />
                <input className='p-input' onChange={(e)=>setAmount(e.target.value)} type="number" placeholder='Amount you want to pay' /><br/>
                    <button onClick={payNow} className='btn medium'>Proceed</button>
                </div>
            </div>
            <ToastContainer/>
        </main>
    </>
  )
}

export default HelpFund