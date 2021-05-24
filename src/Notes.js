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
  constructor(props) {
    super(props)
    this.state = {
        text: '',
        time: '',
        notice: '',
        email: ''
    }
    this.onValueTime = this.onValueTime.bind(this)
    this.onValueText = this.onValueText.bind(this)
    this.onValueNotice = this.onValueNotice.bind(this)
    this.onValueEmail = this.onValueEmail.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onValueText (event) {
    this.setState({
      text: event.target.value
    })
  }
  onValueTime (event) {
    this.setState({
      time: event.target.value
    })
  } 
  onValueNotice (event) {
    this.setState({
      notice: event.target.value
    })
  }
  onValueEmail (event) {
    this.setState({
      email: event.target.value
    })
  } 

  close (e) {
    e.preventDefault()

    if (this.props.isClose) {
      this.props.isClose()
    }
  } 

  onSubmit(event) {
    event.preventDefault()
    this.props.onAdd(this.state.text, this.state.time, this.state.email, this.state.time, this.state.notice)
    this.setState({
      text: '', 
      time: '',
      notice: '',
      email: ''
    })
  }
  
  render() {

    if (this.props.isOpen === false) {return null}; 


     if (this.props.isOpen) {return (
          <>
              <form action='#' id='modalWindow' onSubmit = {this.onSubmit}  className='modal_active'>
                  {/* <div className='close' >
                    <span className='spanTop'></span>
                    <span className='spanBottom'></span>
                  </div> */}
                  <h3 className='modalHeader'>Создание события</h3>
                  <div className='modalText'>
                    <input 
                      type='text' 
                      required 
                      placeholder='Введите название события' 
                      id='modalEventName'  
                      className='modalEventText'
                      onChange = {this.onValueText}
                      value={this.state.text}
                    />
                  </div>
                  <div className='modalDate'>
                      <p>Время события:</p>
                      <input 
                        type='time' 
                        required 
                        className='modalTime'
                        onChange = {this.onValueTime}
                        value = {this.state.time}
                      />
                  </div>
                  <div className='modalNotice'>
                      <p>Уведомление: </p>
                      <input 
                        type='time' 
                        required 
                        className='modalTime modalTime_w'
                        onChange = {this.onValueNotice}
                        value= {this.state.notice}
                      />
                      <input 
                        type='email' 
                        required 
                        autoComplete='true' 
                        className='modalEmail'
                        placeholder='Введите e-mail'
                        onChange = {this.onValueEmail}
                        value={this.state.email}
                      />
                  </div>
                  <div className='navBtn'>
                    <button 
                        className='btnEvent eventBtn_m' 
                        type='submit'
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
      time: time,
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

    if (this.state.data.length === 0) {
      this.setState({
        data: [{eventToday: undefined , time: undefined, id: 'dfgdg'}]
      })
    } 
    return (
      <div className='wrapper'>
        <Header name='Ilya Kuzmin'/>
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
              isOpen={() => {this.openModal()}} 
              />
          </div>
        </div>
        <Modal onAdd = {this.onAdd} isOpen={this.state.isModalActive} isClose={() => {this.closeModal()}}/>
    </div>
    );
  }
}

export default Notes;
