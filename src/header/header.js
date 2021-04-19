import React from 'react';
import './header.css';
import moment from 'moment';
import 'moment/locale/ru';


function Header ({name}) { 
    
    let data = moment().format('DD MMMM YYYY')
    moment.locale('ru')
    
    

    return (
        <div className='header'>
            <h1 className='header__title'>Приветствую вас, {name}</h1>
            <h2 className='header__subtitle'>Вы являетесь - Junior-разработчик</h2>
            <p className='header__data'>Сегодня - {data}</p>
        </div>
    )
}
export default Header;