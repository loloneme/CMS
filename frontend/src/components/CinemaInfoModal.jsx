import { useState, useEffect, useRef } from "react";
import React from "react";
import style from "../styles/AddCinemaModal.module.css";
import CategoryDropdown from "./CategoryDropdown";
import axios from "axios";


const CinemaInfoModal = ({ setCinemaInfoModalIsOpen, cinemaInfo }) => {
    const fileInputRef = useRef(null)

    const [cinemaName, setCinemaName] = useState(cinemaInfo.cinema_name || '');
    const [city, setCity] = useState(cinemaInfo.city || '');
    const [address, setAddress] = useState(cinemaInfo.address || '');
    const [phone, setPhone] = useState(cinemaInfo.cinema_phone || '');
    const [image, setImage] = useState('');

    const [selectedCategory, setSelectedCategory] = useState(cinemaInfo.category_id || 1);
    const [selectedStatus, setSelectedStatus] = useState(cinemaInfo.status_id || 1);

    useEffect(() => {
        setCinemaName(cinemaInfo.cinema_name);
        setCity(cinemaInfo.city);
        setAddress(cinemaInfo.address);
        setPhone(cinemaInfo.cinema_phone);
        setSelectedCategory(cinemaInfo.category_id);
        setSelectedStatus(cinemaInfo.status_id);
        setImage(cinemaInfo.cinema_image);

        setSelectedCategory(cinemaInfo.category_id);
        setSelectedStatus(cinemaInfo.status_id);
    }, [cinemaInfo]);

    const convertToBase64 = (file) => {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setImage(reader.result.split(',')[1])
        };
        reader.onerror = error => {
            console.log("Error: ", error);
        };
    }

    const handleFileInput = () => {
        fileInputRef.current.click();
    }


    const submitChangeCinema = async (e) => {
        e.preventDefault();
        await axios.put(`http://localhost:8080/handler/cinema/${cinemaInfo.cinema_id}`, {
            cinema_name: cinemaName,
            address: address,
            cinema_image: image,
            category_id: parseInt(selectedCategory),
            status_id: parseInt(selectedStatus),
            cinema_phone: phone,
            city: city
        })
            .then((response) => {
                console.log(response.data.message)
            }
            )
            .catch(error => {
                console.error("ПИЗДЕЦ")
            })
        setCinemaInfoModalIsOpen(false)
        window.location.reload()
    }

    const deleteCinema = async () => {
        await axios.delete(`http://localhost:8080/handler/cinema/${cinemaInfo.cinema_id}`)
            .then((response) => {
                console.log(response.data.message)
            }
            )
            .catch(error => {
                console.error("ПИЗДЕЦ")
            })
        setCinemaInfoModalIsOpen(false)
        window.location.reload()
    }


    return (
        <div className={style.container}>
            <p>Изменение кинотеатра</p>

            <form className={style.form_container} onSubmit={submitChangeCinema}>
                <div className={style.form}>
                    <div className={style.image_uploading}>
                        <input
                            type="file"
                            accept="image/*"
                            ref={fileInputRef}
                            style={{ display: 'none' }}
                            onChange={(e) => convertToBase64(e.target.files[0])}
                        />
                        <label htmlFor="fileInput">Выберите фото:</label>
                        {image == "" || image == null ?
                            <img className={style.image} src="film.png" onClick={handleFileInput} />
                            : <img className={style.image} src={`data:image/png;base64,${image}`} onClick={handleFileInput} />}
                    </div>
                    <div className={style.cinema_info}>
                        <input
                            type="text"
                            value={cinemaName}
                            placeholder='Название кинотеатра'
                            onChange={(ev) => setCinemaName(ev.target.value)}
                            required></input>


                        <input type="text"
                            value={address}
                            placeholder='Адрес'
                            onChange={(ev) => setAddress(ev.target.value)}
                            required></input>

                        <input type="text"
                            value={city}
                            placeholder='Город'
                            onChange={(ev) => setCity(ev.target.value)}
                            required></input>

                        <input type="text"
                            value={phone}
                            placeholder='Номер телефона'
                            onChange={(ev) => setPhone(ev.target.value)}
                            required></input>

                        <label htmlFor="category">Выберите категорию:</label>
                        <CategoryDropdown setSelectedCategory={setSelectedCategory} selectedCategory={selectedCategory} />
                    </div>
                </div>
                {/* <div className={style.buttons}> */}
                    <button className={style.button} onClick={deleteCinema} 
                    style={{backgroundColor: `rgba(0, 0, 0)`, color: `white`}}>Удалить</button>
                    <button type="submit" className={style.button} 
                    style={{backgroundColor: `rgba(255, 255, 255, 0.8)`}}>Сохранить</button>
                {/* </div> */}

            </form>
        </div>
    )
}

export default CinemaInfoModal;