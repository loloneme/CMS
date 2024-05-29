import React from 'react';
import style from '../styles/AddButton.module.css'

const AddButton = ({onClick}) => {
    return (
        <button className={style.add_button} onClick={onClick}>
            +
        </button>
    );
}

export default AddButton;
