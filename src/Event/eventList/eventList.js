import React, { Component } from 'react';
import './eventList.css';


export default class EventList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            close: false,
            isModalActive: false
        }
    }

    render() {

        const {eventToday='У вас нет запланированных событий', time='--:--', onClose, isOpen} = this.props
        return (
            <div className='eventListItem'>
                <div className='event_label'>
                    <p className='eventText'>{eventToday}</p>
                    <p className='eventTime'>{time}</p>
                </div>
                <div className='navItem'>
                    <button className='btn_navItem'
                        onClick={isOpen}>
                        <i class="fa fa-pencil fa-3" aria-hidden="true"></i>
                    </button>
                    <button 
                        className='btn_navItem btn_close'
                        onClick = {onClose}>
                            <i class="fa fa-times fa-3" aria-hidden="true"></i></button>
                </div>

            </div>
        )
    }
}
