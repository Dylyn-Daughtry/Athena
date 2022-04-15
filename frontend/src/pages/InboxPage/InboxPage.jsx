import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import owl2 from './../../Images/owl2.png';
import './InboxPage.css'
import { useParams } from 'react-router-dom';
import Student_HomePage from "../HomePage/Student-HomePage";


const InboxPage = (props) => {

    const [user, token] = useAuth();
    const [sessions, setSessions] = useState([])

    async function returnSessionTutor(){
        try{
            let retrieveSession = await axios.get("http://127.0.0.1:8000/api/session/tutor/"+ user.id, {
                headers: {
                    Authorization: "Bearer " + token,
                },
            });
            setSessions(retrieveSession.data)
        }
        catch(error){
            console.log(error)
        }
    }
    useEffect(()=>{
        returnSessionTutor()
    },[])

    async function acceptSession(id, status){
        try{
            let request = await axios.put("http://127.0.0.1:8000/api/session/"+ id, {status: status}, {
                headers: {
                    Authorization: "Bearer " + token,
                },
            });
            
        }
        catch(error){
            console.log(error)
        }
        try{
            let retrieveSession = await axios.get("http://127.0.0.1:8000/api/session/tutor/"+user.id, {
                headers: {
                    Authorization: "Bearer " + token,
                },
            });
            setSessions(retrieveSession.data)
        }
        catch(error){
            console.log(error)
        }
    }
    
    return ( 
        <div className='sessiontable'>
            <h2>Sessions</h2>
            <table className='table'>
                <tbody className='SessionBody'>
                    {sessions && sessions.map((session)=>
                    (
                        <React.Fragment key = {session.id}>
                    <tr>
                        <td></td>
                        <td className="td">{session.student.user.first_name} {session.student.user.last_name}</td>
                        <td>{session.date.substring(0,10)}  {session.date.substring(11,16)}</td> 
                        <td>{session.subject}</td>   
                        <td>{session.status ? <span>{session.status}</span>: <span>pending</span>}</td>
                        <td>
                            <button onClick={e=>acceptSession(session.id, 'Accepted')}>Accept</button>
                        </td>
                        <td>
                            <button onClick={e=>acceptSession(session.id, 'Denied')}>Deny</button>
                        </td>
                    </tr>
                    </React.Fragment>
                    )
                    )}
                </tbody>
            </table>
        </div>
    )
}
export default InboxPage;
