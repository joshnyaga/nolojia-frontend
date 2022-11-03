import React, { useState, useEffect } from "react";
import { FaWindowClose } from "react-icons/fa";
import { FaRegImage } from "react-icons/fa";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../../firebase";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import swal from "sweetalert";

const EditLesson = ({ setOpen, lessonId }) => {
  const [selectedFile, setSelectedFile] = useState();
  const [video, setVideo] = useState(undefined);
  const [preview, setPreview] = useState();
  const [imgPerc, setImgPerc] = useState(0);
  const [videoPerc, setVideoPerc] = useState(0);
  const [input, setInput] = useState({});
  const navigate = useNavigate();
  const courseId = useLocation().pathname.split("/")[4];
  const [lesson, setLesson] = useState({});

  // create a preview as a side effect, whenever selected file is changed
  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }
    setSelectedFile(e.target.files[0]);
  };
  const handleChange = (e) => {
    setInput((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const uploadFile = (file, urlType, filenametype) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        urlType == "imgThumbnail"
          ? setImgPerc(Math.round(progress))
          : setVideoPerc(Math.round(progress));
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            break;
        }
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setInput((prev) => {
            return {
              ...prev,
              [urlType]: downloadURL,
              [filenametype]: fileName,
            };
          });
        });
      }
    );
  }; // I've kept this example simple by using the first image instead of multiple
  useEffect(() => {
    selectedFile && uploadFile(selectedFile, "imgThumbnail", "imgName");
  }, [selectedFile]);
  useEffect(() => {
    video && uploadFile(video, "videoUrl", "videoName");
  }, [video]);
  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `https://nolojia.herokuapp.com/api/nolojia/v1/lessons/${lesson._id}`,
        {
          ...input,
        },
        {
          withCredentials: true,
        }
      );
      setOpen(false);
      res.status === 200 &&
        navigate(`/admin/courses/lessons/${res.data.courseId}`);
      window.location.reload();
      swal("Success", "Lesson updated Successfully", "success");
    } catch (error) {
      console.log(error.response.data.message);
    }
  };
  useEffect(() => {
    const fetchLesson = async () => {
      try {
        const res = await axios.get(
          `https://nolojia.herokuapp.com/api/nolojia/v1/lessons/one/${lessonId}`,
          { withCredentials: true }
        );
        setLesson(res.data);
      } catch (error) {
        console.log(error.response.data.response);
      }
    };
    fetchLesson();
  }, [setOpen]);
  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <div className="modal-title">Update Lesson</div>
          <FaWindowClose size={30} onClick={() => setOpen(false)} />
        </div>
        <div className="modal-body">
          <h3>Modify the field you need to update only</h3>
          <form action="" className="add-course">
            <input
              type="text"
              placeholder="Title"
              name="title"
              defaultValue={lesson.title}
              onChange={handleChange}
            />
            {videoPerc > 0 ? (
              "Uploading:" + videoPerc + "%"
            ) : (
              <div className="form-group">
                <label htmlFor="">Select video</label>
                <input
                  type="file"
                  accept="video/*"
                  onChange={(e) => setVideo(e.target.files[0])}
                />
              </div>
            )}
            <input
              type="text"
              onChange={handleChange}
              placeholder="Description"
              name="desc"
              defaultValue={lesson.desc}
            />
            {imgPerc > 0 ? (
              "Uploading:" + imgPerc + "%"
            ) : (
              <div className="form-group">
                {lesson.imgThumbnail ? (
                  <img src={lesson.imgThumbnail} />
                ) : (
                  <FaRegImage size={40} />
                )}
                <input type="file" accept="image/*" onChange={onSelectFile} />
              </div>
            )}
          </form>
        </div>
        <div className="modal-footer">
          <button onClick={handleUpload} className="btn">
            Update
          </button>
          <button onClick={() => setOpen(false)} className="btn">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditLesson;
