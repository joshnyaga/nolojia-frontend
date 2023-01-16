import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./livestream.css";
import ReactLoading from "react-loading";
import { toast } from "react-toastify";
const Livestream = () => {
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchRooms = async () => {
   try {
    setLoading(true)
    const res = await axios.get(
      "https://nolojia-backend.onrender.com/api/nolojia/v1/rooms/active/",
      { withCredentials: true }
    );
    setRooms(res.data);
    setLoading(false)
   } catch (error) {
    toast.error("An error occurred while fetching rooms")
    setLoading(false)
   }
      
    };
    fetchRooms();
  }, []);
  return (
    <>
    {loading?<div className="middle">
          <ReactLoading type="spin" color="#101050" height={200} width={75} />
        </div>:<>
      {rooms.length > 0 ? (
        <section className="schedule">
          <br />
          <h3 className="heading center">Choose a room</h3>
          <table className="styled-table">
            <thead>
              <tr>
                <th>Room Name</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {rooms.map((room) => (
                <tr key={room._id}>
                  <td>{room.roomName}</td>
                  <td>{room.status}</td>
                  <td>
                    <button
                      onClick={() => {
                        navigate(`/live/${room.roomName}`);
                      }}
                      className="btn"
                    >
                      Enter room
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      ) : (
        <section className="mainbox-livestream">
          
          <div className="error-livestream">
            Currently there is no livestream. Please check the schedule to
            confirm
          </div>
          
          <Link to="/schedule" className="btn medium">
            Go to Schedule
          </Link>
        </section>
      )}</>
}
    </>
  );
};

export default Livestream;
