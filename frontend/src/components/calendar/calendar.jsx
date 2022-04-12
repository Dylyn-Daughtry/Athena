import React, { useState, useEffect } from 'react'
import FullCalendar, { formatDate } from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import axios from 'axios'
import { Link } from "react-router-dom";

const Calendar = (props) => {

  const [events, setEvents] = useState([]);

  useEffect(()=>{
    const fetchEvents = async () => {
      try {
        let response = await axios.get();
        setEvents(response.data);
      }
      catch(error){
        console.log(error.message)
      }
    }
    fetchEvents();
  }, []);

  return (
  <div>
    <div>
      <FullCalendar
      plugins = {[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      headerToolbar={{
        left: 'prev, next today',
        center: 'title',
        right: 'dayGridMonth, timeGridWeek, timeGridDay'
      }}
      initialView='dayGridMonth'
      editable={true}
      selectable={true}
      selectMirror={true}
      events={events}
      />

    </div>

  </div>);
}

export default Calendar;