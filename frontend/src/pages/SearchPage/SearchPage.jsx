import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router";
import { useNavigate, Link } from "react-router-dom";
import Public_Tutor_HomePage from "../PublicTutorPage/PublicTutorPage";

const SearchPage = (props) => {
    const navigate = useNavigate();
  const {state} = useLocation();
  const [displayTutors, setdisplayTutors] = useState([]);

useEffect(() => {
  get_all_tutors();
},[])

  async function get_all_tutors() {
      let response = await axios.get(
        `http://127.0.0.1:8000/api/tutor/all`
      );
      setdisplayTutors(response.data);
      
  }


  return (
      <div>
        {displayTutors &&
        displayTutors.map((tutor) => (
          <div key={tutor.id} onClick={()=>navigate(`/tutor/${tutor.id}`)}>
            <h1 className="Name_Display">{tutor.id}!</h1>
            <h2>rates: {tutor.rates}</h2>
            <h2>availability: {tutor.availability}</h2>
            <h2>subjects: {tutor.subjects}</h2>
          </div>
        )
        
        )}
      </div>
  );
  };
export default SearchPage;
