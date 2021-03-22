import React, {Component} from 'react';
import Header from './header';
import moment from 'moment';
import Calendar from './calendar/Calendar';
import EventBtn from './btnEvent';
import Event from './Event';
import './Notes.css';
import Modal from './Modal';

const customDayRenderer = ({ handleClick, date }) => {
  return (
    <a
      className="Day-inner"
      href={'#' + date.format('YYYY-MM-DD')}
      onClick={() => handleClick(date)}
    >
      {date.format('D')}
    </a>
  );
};


class Notes extends Component {
  onSelect(date, previousDate, currentMonth) {
    if (moment(date).isSame(previousDate)) {
      console.info('onSelect: false', date);
      return false;
    } else if (currentMonth.isSame(date, 'month')) {
      console.info('onSelect: true', date);
      return true;
    } else {
      console.info('onSelect: none', date);
    }
  }

  render() {
   let dayClasses = function(date) {
      let day = date.isoWeekday();
      if (day === 6 || day === 7) {
        return ['weekend'];
      }
      return [];
    };  

    return (
      <div className='wrapper'>
        <Header/>
        <div className='wrapper_for_blocks'>
          <div className='left_blocks'>
            <EventBtn/>
            <Calendar onSelect={this.onSelect} dayRenderer={customDayRenderer} dayClasses={dayClasses}/>
          </div>
          <div className='right_blocks'>
            <Event/>
          </div>
        </div>
        <Modal/>
    </div>
    );
  }
}

export default Notes;
