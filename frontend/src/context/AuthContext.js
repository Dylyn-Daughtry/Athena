import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import jwtDecode from "jwt-decode";
import useAuth from "../hooks/useAuth";

const AuthContext = createContext();

export default AuthContext;

function setUserObject(user) {
  if (!user) {
    return null;
  }
  return {
    username: user.username,
    id: user.user_id,
    first_name: user.first_name,
  };
}

export const AuthProvider = ({ children }) => {
  const BASE_URL = "http://127.0.0.1:8000/api/auth";
  const userToken = JSON.parse(localStorage.getItem("token"));
  const decodedUser = userToken ? jwtDecode(userToken) : null;
  const [token, setToken] = useState(userToken);
  const [user, setUser] = useState(setUserObject(decodedUser));
  const [isServerError, setIsServerError] = useState(false);
  const navigate = useNavigate();

  const registerUser = async (registerData) => {
    try {
      let finalData = {
        username: registerData.username,
        password: registerData.password,
        email: registerData.email,
        first_name: registerData.firstName,
        last_name: registerData.lastName
      };
      let student = {
        user : "",
        school: registerData.school,
        grade: registerData.grade,
        major: registerData.major,
        about_me: "Test"
      }
      let tutor = {
        user: "",
        rates: registerData.rates,
        availability: registerData.availability,
        subjects: registerData.subjects
      }

      let response = await axios.post(`${BASE_URL}/register/`, finalData);
      if (response.status === 201) {
        console.log("Successful registration! Log in to access token");
        let login_response = await axios.post(`${BASE_URL}/login/`, {username:finalData.username, password: finalData.password});
        if (login_response.status === 200) {
          localStorage.setItem("token", JSON.stringify(login_response.data.access));
          setToken(JSON.parse(localStorage.getItem("token")));
          let loggedInUser = jwtDecode(login_response.data.access);
          setUser(setUserObject(loggedInUser));
          if (registerData.is_student === 'true'){
            student.user = response.data.id;
            let student_response = await axios.post("http://127.0.0.1:8000/api/student/", student, 
            {
              headers: {
                Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
              },
            });
            setIsServerError(false);
            navigate("/student");
          }
          else {
            tutor.user = response.data.id;
            let tutor_response = await axios.post("http://127.0.0.1:8000/api/tutor/", tutor, 
            {
              headers: {
                Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
              },
            });
            setIsServerError(false);
            navigate("/tutor");
          }
        } 
      } else {
        navigate("/register");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const loginUser = async (loginData) => {
    try {
      let response = await axios.post(`${BASE_URL}/login/`, loginData);
      if (response.status === 200) {
        localStorage.setItem("token", JSON.stringify(response.data.access));
        setToken(JSON.parse(localStorage.getItem("token")));
        let loggedInUser = jwtDecode(response.data.access);
        setUser(setUserObject(loggedInUser));
        let uid = loggedInUser.user_id;
        let student_response = await axios.get("http://127.0.0.1:8000/api/student/user/" + uid, 
        {
          headers: {
            Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
          },
        });
        let tutor_response = await axios.get("http://127.0.0.1:8000/api/tutor/user/" + uid, 
        {
          headers: {
            Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
          },
        });
        if (student_response.data.length !== 0){
          setIsServerError(false);
          navigate("/student");
        }
        else {
          setIsServerError(false);
          navigate("/tutor");
        }
        
      } else {
        navigate("/register");
      }
    } catch (error) {
      console.log(error.toJSON());
      setIsServerError(true);
      navigate("/register");
    }
  };

  const logoutUser = () => {
    if (user) {
      localStorage.removeItem("token");
      setUser(null);
      setToken(null);
      navigate("/");
    }
  };

  const contextData = {
    user,
    token,
    loginUser,
    logoutUser,
    registerUser,
    isServerError,
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
