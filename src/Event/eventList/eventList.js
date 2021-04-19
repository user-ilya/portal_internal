import React from 'react';
import './eventList.css';

const EventList = ({eventToday = 'У вас еще нет запланированных событий', time = ''}) => {
    

    return (
        <div className='eventListItem'>
            <p className='eventText'>{eventToday}</p>
            <p className='eventTime'>{time}</p>
        </div>
    )
}
export default EventList;
