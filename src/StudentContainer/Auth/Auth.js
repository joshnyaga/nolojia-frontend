import { useState } from "react";
import "./auth.css";
import login from "../../images/study2.svg";
import swal from "sweetalert";
import register from "../../images/study7.svg";
import axios from "axios";
import { AiFillGoogleCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginFailure, loginStart, loginSuccess } from "../../redux/userSlice";
import { auth, provider } from "../../firebase";
import { signInWithPopup } from "firebase/auth";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Auth = () => {
  const [menu, setMenu] = useState(false);
  const [inputLogin, setInputLogin] = useState({});
  const [inputRegister, setInputRegister] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [focusName, setFocusName] = useState(false);
  const [focusEmail, setFocusEmail] = useState(false);
  const [focusPassword, setFocusPassword] = useState(false);
  const [focusConfirmPassword, setFocusConfirmPassword] = useState(false);
  const [focusLoginName, setFocusLoginName] = useState(false);

  const [focusLoginPassword, setFocusLoginPassword] = useState(false);

  // handle the change of 
  const handleChangeLogin = (e) => {
    // set the inputlogin state
    setInputLogin((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const handleChangeRegister = (e) => {
    setInputRegister((prev) => {
      return { ...prev, [e.target.name]: e.target.value, img: "" };
    });
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    const login = async () => {
      try {
        dispatch(loginStart());
        const res = await axios.post(
          "https://nolojia-backend.onrender.com/api/nolojia/v1/auth/signin",
          {
            ...inputLogin,
          },
          {
            withCredentials: true,
          }
        );

        dispatch(loginSuccess(res.data));
        toast("Logged in successfully");
        navigate("/");
      } catch (error) {
        toast(error.response.data.message);
        dispatch(loginFailure());
      }
    };
    toast.promise(login, {
      pending: "Checking our database...",
      success: "Done",
      error: "An error occurred",
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const register = async () => {
      try {
        const res = await axios.post(
          "https://nolojia-backend.onrender.com/api/nolojia/v1/auth/signup",
          {
            ...inputRegister,
          },
          {
            withCredentials: true,
          }
        );

        toast(res.data.message);
      } catch (error) {
        toast(error.response.data.message);
      }
    };
    toast.promise(register, {
      pending: "Registering...",
      success: "Confirmation email sent",
      error: "An error occurred",
    });
  };

  const signInWithGoogle = () => {
    const signin = () => {
      dispatch(loginStart());
      signInWithPopup(auth, provider)
        .then((result) => {
          axios
            .post(
              "https://nolojia-backend.onrender.com/api/nolojia/v1/auth/google",
              {
                name: result.user.displayName,
                email: result.user.email,
                img: result.user.photoURL,
              },
              { withCredentials: true }
            )
            .then((res) => {
              dispatch(loginSuccess(res.data));
              toast("Logged in successfully");
              navigate("/");
            });
        })
        .catch((error) => {
          swal("Failed!", error.response.data.message, "error");
          dispatch(loginFailure());
        });
    };
    toast.promise(signin, {
      pending: "Signing in...",
      success: "Signed in successfully",
      error: "An error occurred",
    });
  };
  return (
    <div className={menu ? "container-auth sign-up-mode" : "container-auth"}>
      <div className="forms-container">
        <div className="signin-signup">
          <form onSubmit={handleLogin} className="sign-in-form">
            <h2 className="title">Sign in</h2>
            <div className="input-field">
              <i className="fa fa-user"></i>
              <input
                type="text"
                name="email"
                required
                onChange={handleChangeLogin}
                autoComplete="off"
                placeholder="Email"
                onBlur={(e) => {
                  setFocusLoginName(true);
                }}
                focussed={focusLoginName.toString()}
              />
              <span>Username is required</span>
            </div>

            <div className="input-field">
              <i className="fa fa-lock"></i>
              <input
                type="password"
                onChange={handleChangeLogin}
                name="password"
                placeholder="Password"
                required
                onBlur={(e) => {
                  setFocusLoginPassword(true);
                }}
                focussed={focusLoginPassword.toString()}
              />
              <span>Password is required</span>
            </div>
            <button type="submit" className="btn">
              Login
            </button>
            <Link to="/forgot-password" className="link-text">
              Forgot Password?
            </Link>
            <Link  onClick={() => {
              setMenu(!menu);
            }}  className="link-text">
              Create account
            </Link>
            <p className="social-text">Or sign in with social platform</p>
            <div className="social-media">
              <button onClick={signInWithGoogle} className="social-icon">
                <AiFillGoogleCircle />
              </button>
            </div>
          </form>
        </div>
        <div className="signup-signup">
          <form onSubmit={handleRegister} className="sign-up-form">
            <h2 className="title">Sign up</h2>
            <div className="input-field">
              <i className="fa fa-user"></i>
              <input
                type="text"
                onChange={handleChangeRegister}
                name="name"
                pattern="^[A-Za-z0-9]+(?:[ _.-][A-Za-z0-9]+)*$"
                placeholder="Username"
                autoComplete="off"
                required
                onBlur={(e) => {
                  setFocusName(true);
                }}
                focussed={focusName.toString()}
              />
              <span>
                No special characters allowed and should be not end in space
                symbol{" "}
              </span>
            </div>
            <div className="input-field">
              <i className="fa fa-envelope"></i>
              <input
                type="email"
                onChange={handleChangeRegister}
                name="email"
                autoComplete="off"
                placeholder="Email"
                onBlur={(e) => {
                  setFocusEmail(true);
                }}
                focussed={focusEmail.toString()}
                required
              />
              <span>Email is not valid</span>
            </div>
            <div className="input-field">
              <i className="fa fa-lock"></i>
              <input
                type="password"
                onChange={handleChangeRegister}
                name="password"
                pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"
                placeholder="Password"
                required
                onBlur={(e) => {
                  setFocusPassword(true);
                }}
                focussed={focusPassword.toString()}
              />
              <span>
                Minimum eight characters, at least one letter and one number:
              </span>
            </div>
            <div className="input-field">
              <i className="fa fa-lock"></i>
              <input
                type="password"
                pattern={inputRegister.password}
                placeholder="Password Confirmation"
                required
                onBlur={(e) => {
                  setFocusConfirmPassword(true);
                }}
                focussed={focusConfirmPassword.toString()}
              />
              <span>Passwords do not match</span>
            </div>
            <button type="submit" className="btn">
              Sign up
            </button>
            <Link to="/login" className="link-text">
              Already have an account
            </Link>
            <p className="social-text">Or sign up with social platform</p>
            <div className="social-media">
              <button onClick={signInWithGoogle} className="social-icon">
                <AiFillGoogleCircle />
              </button>
            </div>
            <button
              onClick={() => {
                setMenu(!menu);
              }}
              className="btn-xs transparent"
            >
              Sign in
            </button>
          </form>
        </div>
      </div>
      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <p>Welcome back to Nolojia. Sign in to continue</p>
            <h3>New Here?</h3>
          </div>
          <button
            onClick={() => {
              setMenu(!menu);
            }}
            className="btn transparent"
          >
            Sign up
          </button>
          <img src={login} alt="" className="image" />
        </div>
        <div className="panel right-panel">
          <div className="content">
            <p>
              Welcome to Nolojia. Nolojia is an e-learning web application that
              aims to empower young people on Technology, programming and
              coding. Feel at home.
            </p>
            <h3>One of us?</h3>
          </div>
          <button
            onClick={() => {
              setMenu(!menu);
            }}
            className="btn transparent"
          >
            Sign in
          </button>
          <img src={register} alt="" className="image" />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Auth;
