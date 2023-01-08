import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
const Ongoing = () => {
  const id = useLocation().pathname.split("/")[3];
  console.log(id);
  const navigate = useNavigate();
  const handleLeftMeeting = () => {
    navigate("/livestream");
    document.body.firstChild.remove();
    window.location.reload();
  };
  let callFrame;
  useEffect(() => {
    const domain = "https://joshkish.daily.co/";

    axios
      .get(`/api/nolojia/v1/rooms/video-call/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.status === 200) {
          const script = document.createElement("script");
          callFrame = window.DailyIframe.createFrame({
            iframeStyle: {
              position: "relative",
              width: "92%",
              height: "100%",
              marginLeft: "8%",
              marginRight: "1%",
              overflowx: "hidden",
              border: "0",
            },
            showLeaveButton: true,
            showFullscreenButton: true,
          });
          script.innerHTML = callFrame.join({
            url: `${domain}${id}`,
          });

          document.body.appendChild(script);
          callFrame.on("left-meeting", handleLeftMeeting);
        }
      })
      .catch((err) => console.log(err));
  }, [id]);

  return <div>Room name -{id}</div>;
};

export default Ongoing;
