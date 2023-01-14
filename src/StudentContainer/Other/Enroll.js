import React, { useState } from "react";
import "./other.css";
import {MdOutlineKeyboardBackspace} from "react-icons/md"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Enroll = () => {
     
  const [physicalStudy, setPhysicalStudy] = useState(false);
  const [input, setInput] = useState({});
  const [error, setError] = useState(false);
  const [amountToPay, setAmountToPay] = useState("")
  const [errorDesc, setErrorDesc] = useState("");
  const notify = () => toast("Enrolling");
  const navigate=useNavigate()
  const handleStudy = (e) => {
    if (e.target.value === "Physical") {
      setPhysicalStudy(true);
    } else {
      setPhysicalStudy(false);
    }
    setInput((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const handleChange = (e) => {
    setInput((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  
  const payNow = async()=>{
    var url = " https://tinypesa.com/api/v1/express/initialize";
    try {
        await axios.post(url,`amount=${amountToPay}&msisdn=0796143149&account_no=1281607312`,{headers: {
            Apikey: "F1QUdPBDBP6",
            "Content-Type": "application/x-www-form-urlencoded",
        },} )
        const success = () => toast("Check your Phone");
                success()
        navigate("success")
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
  const handleEnroll = () => {
    
    console.log("clicked")
    if(!input.fullName){
        setError(true)
        setErrorDesc("Full name is required")
    }else if(!input.about){
        setError(true)
        setErrorDesc("About information is required")
    }
    else if(!input.county){
        setError(true)
        setErrorDesc("We need to know the county you come from")
    }
    else if(!input.town){
        setError(true)
        setErrorDesc("We need to know which town you live")
    }
    else if(!input.phone){
        setError(true)
        setErrorDesc("Please input your phone number")
    }
    else if(!input.gender){
        setError(true)
        setErrorDesc("What is your gender")
    }
    else if(!input.education){
        setError(true)
        setErrorDesc("Select your level of education")
    }
    else if(!input.email){
        setError(true)
        setErrorDesc("Input your email")
    }
    else if(!input.mode){
        setError(true)
        setErrorDesc("Select your preffered mode of study")
    }
    else if(physicalStudy === true && !input.courses){
        setError(true)
        setErrorDesc("Select a course")
    }
    else{
        setError(false)
        notify()
        // call the api now
        const enrollUser = async()=>{
            try {
                await axios.post("api/nolojia/customers/add", input)
                const success = () => toast("You have enrolled successfully");
                success()
            } catch (error) {
                toast.error("An error occurred")
                console.log(Object.keys(error))
            }
            
        }
        enrollUser()
     }
  };
  return (
    <>
      <main>
        <div className="wrapper">
          <div className="column-left">
            <h2>Enroll today to get started!</h2>
            <a className="link" href="http://www.nolojia.com"><MdOutlineKeyboardBackspace/>Back to the website</a>

            {error && 
            <div className="error-input">
                <p>{errorDesc}</p>
            </div>}
            <input className="input-e"
              type="text"
              onChange={handleChange}
              name="fullName"
              placeholder="Full Name"
            />
            <input className="input-e" 
              type="text"
              onChange={handleChange}
              name="email"
              placeholder="Email Address"
            />
            <input className="input-e"
              type="text"
              onChange={handleChange}
              name="phone"
              placeholder="Phone Number"
            />
            <div className="input-row">
              <select className="select-e" onChange={handleChange} name="county" id="coutny">
                <option value="Mombasa">Mombasa</option>
                <option value="Kiambu">Kiambu</option>
                <option value="Nairobi">Nairobi</option>
                <option value="Muranga">Muranga</option>
                <option value="Kirinyaga">Kirinyaga</option>
                <option value="Meru">Meru</option>
                <option value="Kwale">Kwale</option>
                <option value="Tharaka Nithi">Tharaka Nithi</option>
                <option value="Embu">Embu</option>
              </select>
              <input className="input-e"
                type="text"
                name="town"
                onChange={handleChange}
                placeholder="Town"
              />
            </div>
            <select className="select-e" onChange={handleChange} name="gender" id="gender">
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div className="column-right">
            <label htmlFor="about">About yourselve</label>
            <br />
            <textarea className="textarea-e"
              onChange={handleChange}
              name="about"
              id="about"
              cols="30"
              rows="10"
            ></textarea>
            <select className="select-e" onChange={handleChange} name="education" id="education">
              <option value="">Level of education</option>
              <option value="Primary">Primary</option>
              <option value="High School">High School</option>
              <option value="College">College</option>
              <option value="University">University</option>
            </select>
            <select className="select-e" onChange={handleStudy} name="mode" id="education">
              <option value="">Mode of study</option>
              <option value="Physical">Physical</option>
              <option value="Online">Online</option>
            </select>
            {physicalStudy && (
              <>
                <select className="select-e" onChange={handleChange} name="courses" id="courses">
                <option value="">Select course</option>
                <option value="Web Design">Web Design - 10k - 2 months</option>
                <option value="Web Development">
                  Web Development - 17k - 2 months
                </option>
                <option value="Full Stack Web Development">
                  Full Stack Web Development - 25k - 3 months
                </option>
                <option value="App Development">
                  App Development - 25k - 3 months
                </option>
                <option value="Full Stack App Development">
                  Full Stack App Development - 35k - 4 months
                </option>
                <option value="Graphics Design">
                  Graphics Design - 5k - 2 months
                </option>
                <option value="Animations">Animations - 45k - 9 months</option>
                <option value="Interview Questions">
                  Interview Questions - 15k - 2 months
                </option>
              </select>
              <input className="input-e" onChange={(e)=>{setAmountToPay(e.target.value)}}  name="amount" type="number" placeholder="Amount you would like to pay now" />
              <button onClick={payNow} className="btn">Pay Now</button>
              </>
            )}

            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <button onClick={handleEnroll} className="btn">
              Enroll
            </button>
          </div>
        </div>
      </main>
      <footer></footer>
      <ToastContainer />
    </>
  );
}

export default Enroll