import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateUser } from "../../redux/userSlice";
import "./dashboard.css";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";

const Dashboard = () => {
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();
  const [user, setUser] = useState({});
  const currentUser = useSelector((state) => state.currentUser);
  const navigate = useNavigate();
  const [imgPerc, setImgPerc] = useState(0);
  const dispatch = useDispatch();
  const [input, setInput] = useState({});
  const [noOfCourses, setNoOfCourses] = useState(null);

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

    // I've kept this example simple by using the first image instead of multiple
    setSelectedFile(e.target.files[0]);
  };
  useEffect(() => {
    if (currentUser != null) {
      setUser(currentUser);
    } else {
      navigate("/login");
    }
  }, []);
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
  };
  useEffect(() => {
    selectedFile && uploadFile(selectedFile);
  }, [selectedFile]);
  const handleChange = (e) => {
    setInput((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const updateProfile = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `https://nolojia-backend.onrender.com/api/nolojia/v1/users/${currentUser._id}`,
        {
          ...input,
        },
        { withCredentials: true }
      );
      dispatch(updateUser(res.data));
    } catch (error) {}
  };
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get(
          "https://nolojia-backend.onrender.com/api/nolojia/v1/courses/tutor",
          {
            withCredentials: true,
          }
        );
        setNoOfCourses(res.data.length);
      } catch (error) {
        console.log(error.response.data.message);
      }
    };
    fetchCourses();
  }, []);
  return (
    <section className="tutor content-tutor">
      <h1 className="heading">Dashboard-Your Contribution to Nolojia</h1>
      <div className="box-container">
        <div className="box">
          <i className="fa fa-money"></i>
          <h3>Courses</h3>
          <p>
            <span>{noOfCourses}</span>
          </p>
        </div>

        <div className="box">
          <i className="fa fa-user"></i>
          <h3>LiveStream sessions</h3>
          <p>
            <span>3 </span>
          </p>
        </div>
      </div>
      <h1 className="heading">Your Profile</h1>
      <div className="form-profile">
        <div className="form-row">
          {imgPerc > 0 ? (
            "Uploading:" + imgPerc + "%"
          ) : (
            <div className="form-group">
              {preview ? <img src={preview} /> : <img src={user.img} />}
              <input type="file" accept="image/*" onChange={onSelectFile} />
            </div>
          )}
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              onChange={handleChange}
              defaultValue={user.name}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="name">Email</label>
            <input
              type="text"
              onChange={handleChange}
              defaultValue={user.email}
            />
          </div>
          <div className="form-group">
            <label htmlFor="name">Password</label>
            <input onChange={handleChange} type="password" />
          </div>
        </div>
        <button onClick={updateProfile} className="btn">
          Update
        </button>
      </div>
    </section>
  );
};

export default Dashboard;
