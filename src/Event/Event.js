import React from 'react';
import EventList from './eventList';
import './Event.css';


const Event = () => {
    return (
        <div className='eventBlock'>
            <h3 className='eventHeader'>События этого дня</h3>
            <EventList/>
            <EventList/>
            <EventList/>
        </div>
    )
}
export default Event;