import React, { useState, useEffect } from "react";
import { FaWindowClose } from "react-icons/fa";
import { GrGallery } from "react-icons/gr";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
const AddCourse = ({ setOpen }) => {
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();
  const [imgPerc, setImgPerc] = useState(0);
  const [input, setInput] = useState({});
  const navigate = useNavigate();

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
  const uploadFile = (file) => {
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
        setImgPerc(Math.round(progress));
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
            return { ...prev, img: downloadURL, imgName: fileName };
          });
        });
      }
    );
  }; // I've kept this example simple by using the first image instead of multiple
  useEffect(() => {
    selectedFile && uploadFile(selectedFile);
  }, [selectedFile]);
  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "/api/nolojia/v1/courses/",
        {
          ...input,
        },
        {
          withCredentials: true,
        }
      );
      setOpen(false);
      res.status === 200 && navigate(`/admin/courses/`);
      swal("Success", "Course added Successfully", "success");
    } catch (error) {
      console.log(error.response.data.message);
    }
  };
  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <div className="modal-title">Add Course</div>
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
                {preview ? <img src={preview} /> : <GrGallery size={40} />}
                <input type="file" accept="image/*" onChange={onSelectFile} />
              </div>
            )}
            <input
              type="text"
              placeholder="Price"
              name="price"
              onChange={handleChange}
            />
            <select onChange={handleChange} name="level" id="level">
              <option onChange={handleChange} value="Beginner">
                Beginner
              </option>
              <option onChange={handleChange} value="Intermediate">
                Intermediate
              </option>
              <option onChange={handleChange} value="Advanced">
                Advanced
              </option>
            </select>
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

export default AddCourse;
