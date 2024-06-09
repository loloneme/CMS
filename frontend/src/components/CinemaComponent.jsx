import React from "react";
import style from "../styles/CinemaComponent.module.css"

const CinemaComponent = ({onClick, props}) => {
    const backStyles = {};
    var overlayClass = '';

    if (props.cinema_image) {
        backStyles.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(data:image/png;base64,${props.cinema_image})`
        backStyles.backgroundSize = `cover`
        backStyles.position = 'relative'
        overlayClass = 'overlay'
    } else {
        backStyles.backgroundColor = `rgba(54, 40, 54, 0.8)`;
    }
    return (
        <div className={style.container} style={backStyles} onClick={onClick}>
            <div className={style.info}>
                <div className={style.name}>{props.cinema_name}</div>
                <div className={style.addres}>{props.address}</div>
                <div className={style.phone}>{props.cinema_phone}</div>
            </div>
        </div>
    )
}

export default CinemaComponent