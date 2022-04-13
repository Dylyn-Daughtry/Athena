import React, { useContext, useState } from "react";
import AuthContext from "../../context/AuthContext";
import useCustomForm from "../../hooks/useCustomForm";
import './RegisterPage.css'

const RegisterPage = () => {
  const { registerUser } = useContext(AuthContext);
  const defaultValues = {
    username: "",
    password: "",
    email: "",
    firstName: "",
    lastName: "",
    school: "",
    grade: 0,
    major: "",
    is_student: 'true',
    rates: 0,
    availability: "",
    subjects: ""

  };
  const [formData, handleInputChange, handleSubmit] = useCustomForm(
    defaultValues,
    registerUser
  );

  const [isStudent, setisStudent] = useState('true');


  const handleStudentChange=(e) => {
    setisStudent(e.target.value);
    
    handleInputChange(e);
  };

  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit}>
        <label>
          Username:{" "}
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
          />
        </label>
        <label>
          First Name:{" "}
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Last Name:{" "}
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Email:{" "}
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Password:{" "}
          <input
            type="text"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </label>
        <p style={{ fontSize: "12px" }}>
          NOTE: Make this an uncommon password with characters, numbers, and
          special characters!
        </p>
        <label htmlFor="fav_language">
          <p>Please select if you are a student or a tutor</p>
          <input type="radio" id="Student" name="is_student" value={true} checked={isStudent==='true'} onChange={handleStudentChange}></input>
          <label for="Student">Student</label>
          <input type="radio" id="Tutor" name="is_student" value={false} checked={isStudent==='false'} onChange={handleStudentChange}></input>
          <label for="Tutor">Tutor</label>
        </label>
        <label>
          School:{" "}
          <input
            type="text"
            name="school"
            value={formData.school}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Grade:{' '}
          <input
            type="text"
            name="grade"
            value={formData.grade}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Major:{" "}
          <input
            type="text"
            name="major"
            value={formData.major}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Rates:{' '}
          <input
            type="text"
            name="rates"
            value={formData.rates}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Availability:{" "}
          <input
            type="text"
            name="availability"
            value={formData.availability}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Subjects:{" "}
          <input
            type="text"
            name="subjects"
            value={formData.subjects}
            onChange={handleInputChange}
          />
        </label>
        <button>Register!</button>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
      </form>
    </div>
  );
};
export default RegisterPage;
