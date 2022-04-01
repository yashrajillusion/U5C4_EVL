import axios from "axios";
import { nanoid } from "nanoid";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { userLogin } from "../../Redux/Login/action";

export const Home = () => {
  const [subdata, setsubdata] = useState([]);
  const [allmeetup, setallmeetup] = useState([]);
  const dispatch = useDispatch();
  const [status, setStatus] = useState(true);
  useEffect(() => {
    data();
  }, []);

  if (status) {
    const current_user =
      JSON.parse(localStorage.getItem("userLoginDetails")) || null;

    if (current_user != null) {
      setStatus(false);
      dispatch(userLogin(current_user));
    }
  }

  const user = useSelector((store) => store.user);

  // if (status.current) {
  //   return <h2>please login</h2>;
  // }

  let data = async () => {
    let res = await axios.get("http://localhost:8080/meetups");

    var alldb = await res.data;

    if (status) {
      setallmeetup(alldb);
    } else {
      let newdb = [...alldb];
      newdb = newdb.map((el) => {
        if (
          user.interests.includes(el.theme) &&
          el.location === user.location
        ) {
          return el;
        }
        setallmeetup(newdb);
      });
      // newdb = newdb.filter(
      //   (el) =>
      //     user.interests.includes(el.theme) && el.location === user.location
      // );
      alldb = alldb.filter((el) => user.subscribed.includes(el.id));

      alldb.sort((a, b) => {
        return new Date(a.date) - new Date(b.date);
      });

      setsubdata(alldb);
    }
  };

  if (allmeetup.length === 0) {
    return <h2>..Loading</h2>;
  }
  console.log(allmeetup);
  // Filter on the basis of Users interests and location (both true)
  return (
    <div className="homeContainer">
      {allmeetup.length == 0 ? (
        <></>
      ) : (
        <>
          {allmeetup.map(
            ({ title, location, date, time, theme, id, description }) => {
              return (
                <Link to={`/meetup/${id}`} className="events">
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
                </Link>
              );
            }
          )}
        </>
      )}

      {status === false ? (
        <div className="subscribedData">
          <div>
            <select
              value={"add your value here"} // add value here
              onChange={(e) => {}}
            >
              <option value="">------</option>
              <option value="bangalore">Bangalore</option>
              <option value="kolkata">Kolkata</option>
              <option value="delhi">Delhi</option>
              <option value="mumbai">Mumbai</option>
            </select>
          </div>
          <Link to={"/addmeetup"}> Add Meetup</Link>
          <h1>Subscribed Events</h1>
          <div className="subscribedEvents">
            {/* All user subcribed events should be displayed here in an ascending order of date */}

            {subdata.map(
              ({ title, location, date, time, theme, id, description }) => {
                return (
                  <Link key={nanoid()} to={`/meetup/${id}`} className="events">
                    <div className="title">{title}</div>
                    <div className="theme">{theme}</div>
                    <div className="description">{description}</div>
                    <div className="date">{date}</div>
                    <div className="time">{time}</div>
                    <div className="location">{location}</div>
                    <br />
                    {/* <img src={image} className="image" alt="" /> */}

                    {/* Each event should have these elements/children (divs):
                    ex : title, theme, description, date, time, location, image(optional)
                    the classNames should be also : title, theme, description, date, time, location, image(optional) */}
                  </Link>
                );
              }
            )}
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};
