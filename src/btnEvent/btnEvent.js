import React, { useState } from 'react';
import '../style/btn.css';

const EventBtn = () => {
/*     const opacity = document.querySelector('#semi_opacity')
    const modal = document.querySelector('#modalWindow');
    this.addModal = this.addModal(this);

    function addModal (e) {
        e.addEventListener('click', () => {
            opacity.classList.toggle('semi-opacity_active')
            modal.classList.toggle('modal_active')
        })
    } */

    
    const btn = document.querySelector('button');
    const opacity = document.querySelector('#semi_opacity')
    const modal = document.querySelector('#modalWindow');

/*     btn.addEventListener('click', () => {
        modal.classList.toggle('modal_active')
        opacity.classList.toggle('semi-opacity_active')
    }) */

    const {statics, active} = useState(opacity, modal)
    
    const onClickBtnAdd = (statics) => {
        statics = active(() => {
                modal.classList.toggle('modal_active')
                opacity.classList.toggle('semi-opacity_active')
            }
        )
    }

    return(
        <div className='btnMain'>
            <button 
                type = 'button' 
                onClick = {this.onClickBtnAdd()}
                className='btnEvent'>Добавить событие</button>
        </div>
    )
}

export default EventBtn;