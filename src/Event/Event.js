import React from 'react';
import EventList from './eventList';
import './Event.css';


const Event = (props) => {
    return (
        <div className='eventBlock'>
            <h3 className='eventHeader'>События этого дня</h3>
            <EventList  eventToday = 'Покушать' time = '13:40' />
            <EventList/>
            <EventList/>
        </div>
    )
}
export default Event;