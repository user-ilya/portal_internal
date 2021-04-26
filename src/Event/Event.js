import React from 'react';
import EventList from './eventList';
import './Event.css';


const Event = ({eventData, onClose, isOpen}) => {
    const dataElements = eventData.map((item) => {
        const {id, ...itemProps} = item
        return (
            <li key={id}><EventList 
                onClose = {() => onClose(id)}
                isOpen = {() => isOpen()}
            {...itemProps}/></li>
        ) 
    })

    return (
        <div className='eventBlock'>
            <h3 className='eventHeader'>События этого дня</h3>
            <ul className= 'styleForList'>
                {dataElements}
            </ul>

        </div>
    )
}
export default Event;