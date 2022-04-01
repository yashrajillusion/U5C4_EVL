// This is an event details page which has its own route

import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { userLogin } from "../../Redux/Login/action";

export const Event = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const { id } = useParams();

  const [meeting, setmeeting] = useState(null);
  useEffect(() => {
    axios.get(`http://localhost:8080/meetups/${id}`).then(({ data }) => {
      setmeeting(data);
    });
  }, []);
  if (meeting === null) {
    return <h2>..loading</h2>;
  }
  const { title, theme, description, date, time, location } = meeting;
  return (
    <div className="eventContainer">
      <div className="title">{title}</div>
      <div className="theme">{theme}</div>
      <div className="description">{description}</div>
      <div className="date">{date}</div>
      <div className="time">{time}</div>
      <div className="location">{location}</div>
      <br />
      {/* add your children here (divs)
      ex : title, theme, description, date, time, location, image(optional)
      the classNames should be also : title, theme, description, date, time, location, image(optional)
      */}

      {/* only one of the buttons should be visible depending on the status of subcription
      Hint : use conditional rendering user.subscribed.includes(id) */}
      {user.subscribed.includes(+id) ? (
        <button
          onClick={() => {
            let subs = user.subscribed.filter((el) => el != id);

            axios
              .patch(`http://localhost:8080/users/${user.id}`, {
                subscribed: subs,
              })
              .then(({ data }) => {
                localStorage.setItem("userLoginDetails", JSON.stringify(data));
                dispatch(userLogin(data));
              });
          }}
          className="unsubscribe"
        >
          Unsubscribe
        </button>
      ) : (
        <button
          className="subscribe"
          onClick={() => {
            axios
              .patch(`http://localhost:8080/users/${user.id}`, {
                subscribed: [...user.subscribed, +id],
              })
              .then(({ data }) => {
                console.log(data);
                localStorage.setItem("userLoginDetails", JSON.stringify(data));
                dispatch(userLogin(data));
              });
          }}
        >
          Subscribe
        </button>
      )}
    </div>
  );
};
