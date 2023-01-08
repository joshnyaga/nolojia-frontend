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

const AddLesson = ({ setOpen }) => {
  const [selectedFile, setSelectedFile] = useState();
  const [video, setVideo] = useState(undefined);
  const [preview, setPreview] = useState();
  const [imgPerc, setImgPerc] = useState(0);
  const [videoPerc, setVideoPerc] = useState(0);
  const [input, setInput] = useState({});
  const navigate = useNavigate();
  const courseId = useLocation().pathname.split("/")[4];

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
      const res = await axios.post(
        `https://nolojia-backend.onrender.com/api/nolojia/v1/lessons/${courseId}`,
        {
          ...input,
        },
        {
          withCredentials: true,
        }
      );
      setOpen(false);

      swal("Success", "Course added Successfully", "success");
    } catch (error) {
      console.log(error.response.data.message);
    }
  };
  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <div className="modal-title">Add Lesson</div>
          <FaWindowClose size={30} onClick={() => setOpen(false)} />
        </div>
        <div className="modal-body">
          <form action="" className="add-course">
            <input
              type="text"
              placeholder="Title"
              name="title"
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
            />
            {imgPerc > 0 ? (
              "Uploading:" + imgPerc + "%"
            ) : (
              <div className="form-group">
                {preview ? <img src={preview} /> : <FaRegImage size={40} />}
                <input type="file" accept="image/*" onChange={onSelectFile} />
              </div>
            )}
          </form>
        </div>
        <div className="modal-footer">
          <button onClick={handleUpload} className="btn">
            Add
          </button>
          <button onClick={() => setOpen(false)} className="btn">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddLesson;
