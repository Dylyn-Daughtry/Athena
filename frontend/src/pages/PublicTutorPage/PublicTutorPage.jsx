import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import "./PublicTutorPage.css";
import owl2 from './../../Images/owl2.png';
import calendar from './../../Images/Calendar.png';
import Calendar from "../../components/calendar/calendar";
import { useParams } from "react-router-dom";
import Modal from "../../components/modal/modal";
import CreateSession from "../../components/CreateSession/CreateSession";

const Public_Tutor_HomePage = (props) => {
  // The "user" value from this Hook contains the decoded logged in user information (username, first name, id)
  // The "token" value is the JWT token that you will send in the header of any request requiring authentication
  const params = useParams();
  const [user, token] = useAuth();
  const [Tutor, setTutor] = useState([]);
  const[hideShow,setHideShow]=useState(false)
  const handleHideShow = () =>{
    setHideShow(!hideShow)
}
  useEffect(() => {
    const fetchTutor = async () => {
      try {
        let response = await axios.get("http://127.0.0.1:8000/api/tutor/"+params.id, {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        console.log(response)
        setTutor(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchTutor();
  }, [token]);
  console.log(params.id)
  return (
    <div className="homePage">
        {Tutor &&
        <>
      <div>
        <div className="avatar_Display">
          <img className="profile_pic" src={owl2}/>
        </div>
        <div className="info_Display">
          <h1 className="Name_Display">{Tutor.id}!</h1>
          <h2>rates: ${Tutor[0]?.rates}</h2>
          <h2>availability: {Tutor[0]?.availability}</h2>
          <h2>subjects: {Tutor[0]?.subjects}</h2>
          <a className="schedule_session_button">
            <button onClick={handleHideShow}>Schedule Session</button>
          </a>
        </div>
      </div>
      <div className="calendar_Display">
        <Calendar user_id={Tutor[0]?.user} status={'tutor'}/>
        <Modal onClick={handleHideShow}hideShow={hideShow}><CreateSession tutorid={params.id} handleHideShow={handleHideShow}/></Modal>
      </div>
  </>
  }
    </div>
  );
};

export default Public_Tutor_HomePage;