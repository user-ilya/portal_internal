import React from 'react';
import './modal.css';

const Modal = () => {

/*     const btn = document.querySelector('button');
    const opacity = document.querySelector('#semi_opacity')
    const modal = document.querySelector('#modalWindow');

    const addModal = () => {  
        btn.addEventListener('click', () => {
            modal.classList.add('modal_active')
            opacity.classList.add('opacity_active')
        })
    } */

    
    return (
        <>
            <form action='#' id='modalWindow'  className='modal'>
                <h3 className='modalHeader'>Создание события</h3>
                <div className='modalText'><input type='text' required placeholder='Введите событие' id='modalEventName'  className='modalEventText'/></div>
                <div className='modalDate'>
                    <p>Время события:</p>
                    <input type='time' required className='modalTime'/>
                </div>
                <div className='modalNotice'>
                    <p>Уведомление: </p>
                    <input type='time' required className='modalTime modalTime_w'/>
                    <input type='email' required autoComplete='true' className='modalEmail' placeholder='Введите e-mail'/>
                </div>
                <button className='btnEvent eventBtn_m' type='submit'>Добавить событие</button>
            </form>
        <div id='semi_opacity'></div>
        </>
        
        
    )
}
export default Modal;
