import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
const Meeting = () => {
  const id = useLocation().pathname.split("/")[3];
  console.log(id);
  const navigate = useNavigate();
  const handleLeftMeeting = () => {
    document.body.firstChild.remove();

    navigate("/admin/livestream");
    window.location.reload();
  };
  let callFrame;
  useEffect(() => {
    const domain = "https://joshkish.daily.co/";

    axios
      .get(`/rooms/video-call/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.status === 200) {
          const script = document.createElement("script");
          callFrame = window.DailyIframe.createFrame({
            iframeStyle: {
              position: "relative",
              width: "82%",
              height: "90%",
              marginLeft: "18.5%",
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

  return (
    <section className="content-tutor">
      <div className="middle">{id}</div>
    </section>
  );
};

export default Meeting;
