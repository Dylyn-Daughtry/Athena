import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import './Student-Homepage.css';
import owl2 from './../../Images/owl2.png';
import calendar from './../../Images/Calendar.png'
import Calendar from "../../components/calendar/calendar";

const Student_HomePage = () => {
  // The "user" value from this Hook contains the decoded logged in user information (username, first name, id)
  // The "token" value is the JWT token that you will send in the header of any request requiring authentication
  const [user, token] = useAuth();
  const [student, setStudent] = useState([]);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        let response = await axios.get("http://127.0.0.1:8000/api/student/user/"+user.id, {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        setStudent(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchStudent();
  }, [token]);
  return (
    <div className="homePage">
        {student &&
        <>
      <div>
        <div className="avatar_Display">
          <img className="profile_pic" src={owl2}/>
        </div>
        <div className="info_Display">
          <h1 className="Name_Display">{user.username}</h1>
          <h2>School: {student[0]?.school}</h2>
          <h2>Grade: {student[0]?.grade}</h2>
          <h2>Major: {student[0]?.major}</h2>
        </div>
      </div>
      <div className="calendar_Display">
        <Calendar user_id={student[0]?.id} status={'student'}/>
      </div>
      </>
      }
    </div>
  );
};

export default Student_HomePage;