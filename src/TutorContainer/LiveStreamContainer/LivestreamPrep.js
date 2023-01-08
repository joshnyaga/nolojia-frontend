import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LivestreamPrep = () => {
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchRooms = async () => {
      const res = await axios.get(
        "https://nolojia-backend.onrender.com/api/nolojia/v1/rooms/",
        { withCredentials: true }
      );
      setRooms(res.data);
    };
    fetchRooms();
  }, []);

  return (
    <section className="content-tutor schedule">
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
              <th>
                {room.status === "active" ? (
                  <>
                    <button
                      onClick={async () => {
                        await axios.put(
                          `https://nolojia-backend.onrender.com/api/nolojia/v1/rooms/${room._id}`,
                          { status: "inactive" },
                          { withCredentials: true }
                        );
                        window.location.reload();
                      }}
                      className="btn"
                    >
                      Deactivate
                    </button>
                    <button
                      onClick={() => {
                        navigate(`/admin/liveTutor/${room.roomName}`);
                      }}
                      className="btn"
                    >
                      Enter room
                    </button>
                  </>
                ) : (
                  <button
                    onClick={async () => {
                      await axios.put(
                        `https://nolojia-backend.onrender.com/api/nolojia/v1/rooms/${room._id}`,
                        { status: "active" },
                        { withCredentials: true }
                      );
                      window.location.reload();
                    }}
                    className="btn"
                  >
                    Activate
                  </button>
                )}
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default LivestreamPrep;
