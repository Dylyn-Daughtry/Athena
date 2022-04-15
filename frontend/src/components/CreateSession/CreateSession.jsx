import React, { useState, useEffect } from 'react';
import './CreateSession.css'
import axios from 'axios';
import useAuth from '../../hooks/useAuth';
import { useParams } from 'react-router-dom';

const CreateSession = (props) => {


        const [subject, setSubject] = useState ('')
        const [date, setDate] = useState ('')
        const [user, token] = useAuth();
        const params = useParams();
        const [student, setStudent] = useState('')
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

        async function submitSession(prop){
            let response = await axios.post('http://127.0.0.1:8000/api/session/', prop, {headers: {
                Authorization: "Bearer " + token,
              }})
            if (response){
              props.handleHideShow()
          }}

        function handleSubmit(submissionForm){
            submissionForm.preventDefault();
            let newEntry = {
                subject: subject,
                date: date,
                student: student[0].id,
                tutor: parseInt(props.tutorid)
        
            };
            submitSession(newEntry)
            console.log(newEntry)
        }
        
        
  
    return (
        <div className='SessionForm'>
            <form className='newSession' onSubmit={handleSubmit}>
                <label>Subject</label>
                <input type='Subject' value={subject} onChange={(e) => setSubject(e.target.value)}/>
                <label>Date</label>
                <input type='Date' value={date} onChange={(e) => setDate(e.target.value)}/>
                <button className='submit' type='submit'>Request</button>
            </form>
        </div>
    )
        
}
export default CreateSession;