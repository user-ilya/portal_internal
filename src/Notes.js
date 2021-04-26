import React, {Component} from 'react';
import Header from './header';
import moment from 'moment';
import Calendar from './calendar/Calendar';

import Event from './Event';
import './Notes.css';
import './style/btn.css';
import './Modal/modal.css';


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


class Modal extends Component {

   close (e) {
    e.preventDefault()

    if (this.props.isClose) {
      this.props.isClose()
    }
  } 
  
  render() {

    const {onAdd} = this.props

    if (this.props.isOpen === false) {return null}; 


     if (this.props.isOpen) {return (
          <>
              <form action='#' id='modalWindow'  className='modal_active'>
                  <div className='close' >
                    <span className='spanTop'></span>
                    <span className='spanBottom'></span>
                  </div>
                  <h3 className='modalHeader'>Создание события</h3>
                  <div className='modalText'><input type='text' required placeholder='Введите навзвание события' id='modalEventName'  className='modalEventText'/></div>
                  <div className='modalDate'>
                      <p>Время события:</p>
                      <input type='time' required className='modalTime'/>
                  </div>
                  <div className='modalNotice'>
                      <p>Уведомление: </p>
                      <input type='time' required className='modalTime modalTime_w'/>
                      <input type='email' required autoComplete='true' className='modalEmail' placeholder='Введите e-mail'/>
                  </div>
                  <div className='navBtn'>
                    <button 
                        className='btnEvent eventBtn_m' 
                        type='submit'
                        onClick= {() => onAdd('Hello')}
                        >Добавить событие</button>
                      <button 
                        className='btnEvent eventBtn_m' 
                        type='button'
                        onClick={e => this.close(e)}
                      >Закрыть</button>
                  </div>
              </form>
          <div id='semi-opacity_active'></div>
          </>
          
          
      )
    }
  }
} 
export {Modal}


class Notes extends Component {
  constructor(props) {
    super(props)
        this.state = {
            isModalActive: false,
            data: [
              {eventToday: 'Покушать', time: '13:40', id: 1},
              {eventToday: 'Убраться', time: '09:40', id: 2},
              {eventToday: undefined , time: undefined, id: 3}
            ]
        }
        this.onDeleted = this.onDeleted.bind(this)
        this.onAdd = this.onAdd.bind(this)
        this.maxId = 4
  }

  openModal() {
      this.setState({
          isModalActive: true
      })
  }
   closeModal() {
      this.setState({
          isModalActive: false
      })
  } 

  onDeleted(id) {
    this.setState(({data}) => {
      const index = data.findIndex((elem) => elem.id === id)

      const newData = [...data.slice(0, index), ...data.slice(index + 1)]
      return {
        data: newData
      }
    })
  }

  onAdd(body, time) {
    const newItem = {
      eventToday: body,
      time: undefined,
      id: this.maxId++
    }
    this.setState(({data}) => {
      const newData = [...data, newItem]
      return {
        data: newData
      }
    })
  }

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
        <Header name='ILya Kuzmin'/>
        <div className='wrapper_for_blocks'>
          <div className='left_blocks'>
          <div className='btnMain'>
              <button 
                type = 'button'
                onClick= {()=> this.openModal()} 
                className='btnEvent'>Добавить событие
              </button>
            </div>
            <Calendar onSelect={this.onSelect} dayRenderer={customDayRenderer} dayClasses={dayClasses}/>
          </div>
          <div className='right_blocks'>
            <Event 
              eventData={this.state.data} 
              onClose = {this.onDeleted} 
              isOpen={this.state.isModalActive} 
               />
          </div>
        </div>
        <Modal onAdd = {this.onAdd} isOpen={this.state.isModalActive} isClose={() => {this.closeModal()}}/>
    </div>
    );
  }
}

export default Notes;
