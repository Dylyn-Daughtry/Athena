import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import "./Tutor-HomePage.css";
import owl2 from './../../Images/owl2.png';
import calendar from './../../Images/Calendar.png';
import Calendar from "../../components/calendar/calendar";


const Tutor_HomePage = () => {
  // The "user" value from this Hook contains the decoded logged in user information (username, first name, id)
  // The "token" value is the JWT token that you will send in the header of any request requiring authentication
  const [user, token] = useAuth();
  const [Tutor, setTutor] = useState([{rates: 35, availability: "", subjects: ""}]);

  useEffect(() => {
    const fetchTutor = async () => {
      try {
        let response = await axios.get("http://127.0.0.1:8000/api/tutor/user/"+user.id, {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        setTutor(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchTutor();
  }, [token]);
  return (
    <div className="homePage">
      <div>
        <div className="avatar_Display">
          <img className="profile_pic" src={owl2}/>
        </div>
        <div className="info_Display">
          <h1 className="Name_Display">{user.username}!</h1>
          <h2>rates: {Tutor[0].rates}</h2>
          <h2>availability: {Tutor[0].availability}</h2>
          <h2>subjects: {Tutor[0].subjects}</h2>
        </div>
      </div>
      <div className="calendar_Display">
        <Calendar/>
      </div>
    </div>
  );
};

export default Tutor_HomePage;