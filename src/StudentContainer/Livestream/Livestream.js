import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./livestream.css";
const Livestream = () => {
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchRooms = async () => {
      const res = await axios.get(
        "/api/nolojia/v1/rooms/active/",
        { withCredentials: true }
      );
      setRooms(res.data);
    };
    fetchRooms();
  }, []);
  return (
    <>
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
          <div className="code-livestream">No LiveStream</div>
          <div className="error-livestream">
            Currently there is no livestream. Please check the schedule to
            confirm
          </div>
          <div className="guide-livestream">
            Contact the admin incase there is an error
          </div>
          <Link to="/schedule" className="btn medium">
            Go to Schedule
          </Link>
        </section>
      )}
    </>
  );
};

export default Livestream;
