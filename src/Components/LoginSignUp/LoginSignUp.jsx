import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { userLogin } from "../../Redux/Login/action";

export const LoginSignUp = () => {
  const initState = {
    name: "",
    password: "",
    location: "",
    interests: [],
    image: "",
    subscribed: [], //these have to be ids of the subscribed meetups
  };
  const [signup, setSignup] = useState(initState);
  const [signin, setSignin] = useState({ name: "", password: "" });
  const dispatch = useDispatch();
  const {
    name,
    password,
    location,
    interests,
    image,
    subscribed, //these have to be ids of the subscribed meetups
  } = signup;
  const handlechange = (e) => {
    const { className, value } = e.target;
    setSignup({ ...signup, [className]: value });
  };
  const handleCheckbox = (e) => {
    let interests = signup.interests;
    if (e.target.checked) {
      interests.push(e.target.className);
    } else {
      interests = interests.filter((el) => el != e.target.className);
    }
    setSignup({ ...signup, interests: [...interests] });
  };

  const sendUser = (e) => {
    e.preventDefault();
    axios.post("http://localhost:8080/users", signup).then(({ data }) => {});
  };
  const loginDb = (e) => {
    e.preventDefault();
    axios.get("http://localhost:8080/users").then(({ data }) => {
      data.map((el) => {
        if (el.name === name && el.password === password) {
          localStorage.setItem("userLoginDetails", JSON.stringify({ ...el }));

          dispatch(userLogin(el));
        }
      });
    });
  };
  return (
    <div className="loginSignUp">
      <form className="signUp" onSubmit={sendUser}>
        <h1>SignUp</h1>
        <label>name</label>
        <input
          type="text"
          className="name"
          onChange={(event) => {
            handlechange(event);
          }}
          required
        />
        <br />
        <label>password</label>
        <input
          type="text"
          className="password"
          onChange={(event) => {
            handlechange(event);
          }}
          required
        />
        <br />
        <label>Location</label>
        <select
          value={location}
          className="location"
          onChange={(event) => {
            handlechange(event);
          }}
        >
          <option value=""></option>
          <option value="bangalore">Bangalore</option>
          <option value="kolkata">Kolkata</option>
          <option value="delhi">Delhi</option>
          <option value="mumbai">Mumbai</option>
        </select>
        <br />
        <label>Interests</label>
        <br />
        <label>technology</label>
        <input
          type="checkbox"
          className="technology"
          onChange={(event) => {
            handleCheckbox(event);
          }}
        />
        <br />
        <label>food</label>
        <input
          type="checkbox"
          className="food"
          onChange={(event) => {
            handleCheckbox(event);
          }}
        />
        <br />
        <label>movies</label>
        <input
          type="checkbox"
          className="movies"
          onChange={(event) => {
            handleCheckbox(event);
          }}
        />
        <br />
        <label>culture</label>
        <input
          type="checkbox"
          className="culture"
          onChange={(event) => {
            handleCheckbox(event);
          }}
        />
        <br />
        <label>art</label>
        <input
          type="checkbox"
          className="art"
          onChange={(event) => {
            handleCheckbox(event);
          }}
        />
        <br />
        <label>drama</label>
        <input
          type="checkbox"
          className="drama"
          onChange={(event) => {
            handleCheckbox(event);
          }}
        />
        <br />
        <label>image</label>
        <input
          type="text"
          className="image"
          onChange={(event) => {
            handlechange(event);
          }}
          required
        />
        <br />
        <input type="submit" className="submitSignUpForm" />
      </form>
      {/* for logint ------- */}
      <form className="login" onSubmit={loginDb}>
        <h1>Login</h1>
        <label>name</label>
        <input
          type="text"
          className="name"
          onChange={(event) => {
            handlechange(event);
          }}
          required
        />
        <br />
        <label>password</label>
        <input
          type="text"
          className="password"
          onChange={(event) => {
            handlechange(event);
          }}
          required
        />
        <br />
        <input type="submit" className="submitLoginForm" />
      </form>
    </div>
  );
};
